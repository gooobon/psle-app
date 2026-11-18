import { cookieHeader } from "@/lib/adminSession";

export const runtime = "nodejs";

export async function POST() {
  return Response.json({ ok: true }, { headers: { "Set-Cookie": cookieHeader("", 0), "Cache-Control": "no-store" } });
}
