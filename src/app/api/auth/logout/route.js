import { sessionClient, serverAuthEnabled, jerr, jok } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST() {
  if (!serverAuthEnabled()) return jerr("server auth disabled", 404);
  const sb = await sessionClient();
  await sb.auth.signOut();
  return jok();
}
