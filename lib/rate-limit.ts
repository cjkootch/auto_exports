/**
 * Simple in-memory sliding-window rate limit by key (IP).
 * Good enough for a low-volume lead form on Vercel: each warm serverless
 * instance keeps its own window, so the real-world cap is a small multiple
 * of LIMIT — fine for stopping naive spam without adding infrastructure.
 */
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const LIMIT = 5;

const hits = new Map<string, number[]>();

export function rateLimited(key: string): boolean {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;
  const recent = (hits.get(key) ?? []).filter((t) => t > windowStart);
  if (recent.length >= LIMIT) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);

  // Bounded cleanup so the map can't grow without limit
  if (hits.size > 1000) {
    Array.from(hits.entries()).forEach(([k, v]) => {
      if (!v.some((t) => t > windowStart)) hits.delete(k);
    });
  }
  return false;
}
