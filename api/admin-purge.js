// TEMPORARY — one-off cleanup of the rows left on the leaderboards while the
// games were being tested. It removes ONLY entries whose name is a test
// marker, so it cannot reach a pupil's score however it is called. Delete
// this file once the cleanup has run; it is not meant to stay in the project.
import { Redis } from '@upstash/redis';

const TARGETS = [
  { game: 'verb-express', boards: [5, 6, 7, 8] },
  { game: 'which-word-first', boards: [1, 2, 3] },
];

const isTestName = (n) => /^(test|tests|testing|اختبار|تجربة)$/i.test(String(n || '').trim());

const getRedis = () => {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
};

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  const redis = getRedis();
  if (!redis) {
    res.status(503).json({ error: 'scores-unconfigured' });
    return;
  }

  const dryRun = String(req.query.apply || '') !== '1';
  const removed = [];

  try {
    for (const { game, boards } of TARGETS) {
      for (const board of boards) {
        const boardKey = `palbook:scores:${game}:g${board}`;
        const metaKey = `palbook:scoremeta:${game}:g${board}`;

        const members = (await redis.zrange(boardKey, 0, -1)).map(String);
        const hits = members.filter(isTestName);
        if (!hits.length) continue;

        for (const name of hits) {
          const score = await redis.zscore(boardKey, name);
          removed.push({ game, board, name, score: Number(score) });
        }
        if (!dryRun) {
          await redis.zrem(boardKey, ...hits);
          await redis.hdel(metaKey, ...hits);
        }
      }
    }
    res.status(200).json({ ok: true, applied: !dryRun, removed });
  } catch (e) {
    res.status(500).json({ error: 'purge-failed', detail: String(e && e.message) });
  }
}
