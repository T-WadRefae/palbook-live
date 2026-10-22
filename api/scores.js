// Global leaderboard for the static games served from GitHub Pages.
//
// Storage: the same Upstash Redis database attached to this Vercel project
// as the visit counter. Each game+level keeps one sorted set of the best
// score per player name, plus a hash holding that run's details.
//
//   POST /api/scores  { game, level, name, score, correct, total }
//   GET  /api/scores?game=verb-express&level=1&limit=50
//
// The games are public pages with no sign-in, so a submission is only ever
// trusted as far as the checks below: an allow-listed game and level, a
// cleaned short name, and a score that cannot exceed what the answers
// claimed could have earned.
import { Redis } from '@upstash/redis';

const GAMES = {
  'verb-express': { levels: [1, 2, 3], maxTotal: 20, maxPerQuestion: 200 },
};

const KEEP = 200; // leaderboard rows kept per game+level
const NAME_MAX = 20;
const RATE_MAX = 120; // submissions per IP per window (a whole class shares one IP)
const RATE_WINDOW = 600; // seconds

const getRedis = () => {
  // Vercel's Upstash integration injects UPSTASH_REDIS_REST_URL/TOKEN; the
  // older Vercel KV injected KV_REST_API_URL/TOKEN. Support either.
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
};

// Letters of any script (so Arabic names work), digits, spaces and a few marks.
const cleanName = (raw) =>
  String(raw ?? '')
    .replace(/[^\p{L}\p{N} .'_-]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, NAME_MAX);

const asInt = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? Math.floor(n) : NaN;
};

const keys = (game, level) => ({
  board: `palbook:scores:${game}:${level}`,
  meta: `palbook:scoremeta:${game}:${level}`,
});

const readMeta = (raw) => {
  if (!raw) return {};
  if (typeof raw === 'object') return raw;
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
};

async function handleGet(redis, req, res) {
  const game = String(req.query.game || '');
  const spec = GAMES[game];
  if (!spec) {
    res.status(400).json({ error: 'unknown-game' });
    return;
  }
  const level = asInt(req.query.level);
  if (!spec.levels.includes(level)) {
    res.status(400).json({ error: 'bad-level' });
    return;
  }
  const limit = Math.min(Math.max(asInt(req.query.limit) || 50, 1), KEEP);

  const { board, meta } = keys(game, level);
  const [flat, metaAll] = await Promise.all([
    redis.zrange(board, 0, limit - 1, { rev: true, withScores: true }),
    redis.hgetall(meta),
  ]);

  const rows = [];
  for (let i = 0; i < flat.length; i += 2) {
    const name = String(flat[i]);
    const detail = readMeta(metaAll ? metaAll[name] : null);
    rows.push({
      rank: rows.length + 1,
      name,
      score: Number(flat[i + 1]) || 0,
      correct: Number(detail.correct) || 0,
      total: Number(detail.total) || 0,
      at: Number(detail.at) || 0,
    });
  }
  res.status(200).json({ game, level, rows });
}

async function handlePost(redis, req, res) {
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = null;
    }
  }
  if (!body || typeof body !== 'object') {
    res.status(400).json({ error: 'bad-body' });
    return;
  }

  const game = String(body.game || '');
  const spec = GAMES[game];
  if (!spec) {
    res.status(400).json({ error: 'unknown-game' });
    return;
  }
  const level = asInt(body.level);
  if (!spec.levels.includes(level)) {
    res.status(400).json({ error: 'bad-level' });
    return;
  }

  const name = cleanName(body.name);
  if (!name) {
    res.status(400).json({ error: 'bad-name' });
    return;
  }

  const total = asInt(body.total);
  const correct = asInt(body.correct);
  const score = asInt(body.score);
  if (!(total >= 1 && total <= spec.maxTotal)) {
    res.status(400).json({ error: 'bad-total' });
    return;
  }
  if (!(correct >= 0 && correct <= total)) {
    res.status(400).json({ error: 'bad-correct' });
    return;
  }
  // A run cannot be worth more than its correct answers could have earned.
  if (!(score >= 0 && score <= correct * spec.maxPerQuestion)) {
    res.status(400).json({ error: 'bad-score' });
    return;
  }

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  const rlKey = `palbook:scorerl:${ip}`;
  const hits = await redis.incr(rlKey);
  if (hits === 1) await redis.expire(rlKey, RATE_WINDOW);
  if (hits > RATE_MAX) {
    res.status(429).json({ error: 'too-many' });
    return;
  }

  const { board, meta } = keys(game, level);
  const prev = await redis.zscore(board, name);
  const best = prev === null || prev === undefined ? -1 : Number(prev);
  const improved = score > best;

  if (improved) {
    await redis.zadd(board, { score, member: name });
    await redis.hset(meta, { [name]: JSON.stringify({ correct, total, at: Date.now() }) });

    // Keep only the top KEEP rows, and drop the details of anyone trimmed off.
    const removed = await redis.zremrangebyrank(board, 0, -(KEEP + 1));
    if (removed > 0) {
      const [alive, stored] = await Promise.all([
        redis.zrange(board, 0, -1),
        redis.hkeys(meta),
      ]);
      const live = new Set(alive.map(String));
      const stale = stored.map(String).filter((k) => !live.has(k));
      if (stale.length) await redis.hdel(meta, ...stale);
    }
  }

  // The rank the player now holds (1 = best).
  const above = await redis.zcount(board, `(${Math.max(score, best)}`, '+inf');

  res.status(200).json({
    ok: true,
    improved,
    name,
    score,
    best: Math.max(score, best, 0),
    rank: Number(above) + 1,
  });
}

export default async function handler(req, res) {
  // Public read/write of a classroom leaderboard; no cookies or credentials.
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  const redis = getRedis();
  if (!redis) {
    res.status(503).json({ error: 'scores-unconfigured' });
    return;
  }

  try {
    if (req.method === 'GET') await handleGet(redis, req, res);
    else if (req.method === 'POST') await handlePost(redis, req, res);
    else res.status(405).json({ error: 'method-not-allowed' });
  } catch {
    res.status(500).json({ error: 'scores-failed' });
  }
}
