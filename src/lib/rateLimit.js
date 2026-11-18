// Basic fixed-window rate limiter. In-memory, so it is per serverless instance (best effort: it slows
// down guessing but is not a hard global limit). TODO(owner): swap for a shared store (Upstash/Redis or a
// Supabase table) if abuse appears.
const buckets = new Map();

export function clientIp(request) {
  const xf = request.headers.get("x-forwarded-for") || "";
  return xf.split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown";
}

// Returns true if allowed, false if the limit is exceeded.
export function allow(key, limit, windowMs) {
  const now = Date.now();
  if (buckets.size > 5000) for (const [k, v] of buckets) if (v.reset <= now) buckets.delete(k);
  const b = buckets.get(key);
  if (!b || b.reset <= now) { buckets.set(key, { n: 1, reset: now + windowMs }); return true; }
  b.n += 1;
  return b.n <= limit;
}

// Convenience: per-IP and per-username limits together.
export function allowAuthAttempt(scope, request, username) {
  const W = 15 * 60 * 1000;
  const okIp = allow(`${scope}:ip:${clientIp(request)}`, 20, W);
  const okUser = allow(`${scope}:user:${String(username || "").toLowerCase()}`, 8, W);
  return okIp && okUser;
}
