import { createSessionToken, cookieHeader, safeEqual, SESSION_TTL_SEC } from "@/lib/adminSession";

export const runtime = "nodejs";

export async function POST(request) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !process.env.ADMIN_SESSION_SECRET) {
    return Response.json({ error: "admin login not configured" }, { status: 500 });
  }
  let password = "";
  try { password = (await request.json())?.password; } catch {}
  if (typeof password !== "string" || !safeEqual(password, expected)) {
    return Response.json({ error: "invalid credentials" }, { status: 401 });
  }
  const token = createSessionToken();
  return Response.json({ ok: true }, { headers: { "Set-Cookie": cookieHeader(token, SESSION_TTL_SEC), "Cache-Control": "no-store" } });
}
