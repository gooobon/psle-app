import { isAdminRequest } from "@/lib/adminSession";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request) {
  return Response.json({ admin: isAdminRequest(request) }, { headers: { "Cache-Control": "no-store" } });
}
