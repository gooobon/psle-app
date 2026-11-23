// Minimal in-memory fixed-window rate limiter. Per server instance only (serverless instances do not
// share memory), so this is a speed bump against casual abuse, not a hard guarantee.
// TODO(owner): for a hard limit use a shared store (Upstash/Vercel KV or a Supabase table).
const buckets = new Map();

export function clientIp(request) {
  const xf = request.headers.get("x-forwarded-for") || "";
  return xf.split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown";
}

// Returns true if the call is allowed; false if the limit is exceeded.
export function rateLimit(key, { max, windowMs }) {
  const now = Date.now();
  if (buckets.size > 5000) for (const [k, v] of buckets) if (v.reset <= now) buckets.delete(k);
  const b = buckets.get(key);
  if (!b || b.reset <= now) { buckets.set(key, { n: 1, reset: now + windowMs }); return true; }
  if (b.n >= max) return false;
  b.n += 1; return true;
}

// Additive: forget a key (successful login, parent reset).
export function rateLimitClear(key) { buckets.delete(key); }
