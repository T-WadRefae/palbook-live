// Real, site-wide visit counter (all sections share one number).
//
// Storage: an Upstash Redis database attached to the Vercel project. Redis
// holds only the NEW visits counted since launch (`delta`); the historical
// total the site already had (from Vercel Analytics) is added on top as a
// fixed base, so the displayed number is real from day one and keeps growing.
//
// The base is server-side (VISITS_BASE env var, or the constant below), so it
// can't be changed from the browser. Requests:
//   POST /api/views  -> increment and return the new total (one visit)
//   GET  /api/views  -> return the current total without incrementing
import { Redis } from '@upstash/redis';

const KEY = 'palbook:visits';

// Visits recorded before this counter existed, combining real signals:
// Vercel Analytics (~346 visits since 31 Aug 2026) plus direct GitHub Pages
// lesson views (~364 in a recent 14-day window) — rounded to 700. Set
// VISITS_BASE in the Vercel project to raise it later without a code change.
const BASE = Number(process.env.VISITS_BASE || 700) || 700;

const getRedis = () => {
  // Vercel's Upstash integration injects UPSTASH_REDIS_REST_URL/TOKEN; the
  // older Vercel KV injected KV_REST_API_URL/TOKEN. Support either.
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
};

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  const redis = getRedis();
  if (!redis) {
    // Database not attached yet — the footer hides the counter on this.
    res.status(503).json({ error: 'counter-unconfigured' });
    return;
  }

  try {
    const delta =
      req.method === 'POST'
        ? await redis.incr(KEY)
        : Number((await redis.get(KEY)) || 0);
    res.status(200).json({ count: BASE + delta });
  } catch {
    res.status(500).json({ error: 'counter-failed' });
  }
}
