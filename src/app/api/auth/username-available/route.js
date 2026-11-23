// Live login-username check for the Add child form. Parent session only, rate-limited. Never says who owns a name:
// the answer is {state: "available" | "taken" | "bad_format" | "reserved"} plus up to 3 free suggestions when taken.
import { adminClient, currentUser, serverAuthEnabled, jerr, jok } from "@/lib/supabase/server";
import { normUsername, usernameIlike, USERNAME_RE, isReservedUsername, USERNAME_MSG } from "@/lib/supabase/config";
import { rateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";
const RUDE = ["fuck", "shit", "bitch", "cunt", "dick", "porn", "sex", "nazi", "rape"]; // small deny list; "Please choose a different username."

export async function GET(request) {
  if (!serverAuthEnabled()) return jerr("server auth disabled", 404);
  const me = await currentUser();
  if (!me || me.profile.role !== "parent") return jerr("parent login required", 401);
  if (!rateLimit("uavail:" + me.profile.id, { max: 120, windowMs: 600_000 })) return jerr("too many requests", 429);
  const u = normUsername(new URL(request.url).searchParams.get("u"));
  if (!USERNAME_RE.test(u)) return jok({ state: "bad_format", message: USERNAME_MSG });
  const low = u.toLowerCase();
  if (isReservedUsername(u) || RUDE.some((w) => low.includes(w))) return jok({ state: "reserved", message: "Please choose a different username." });
  try {
    const admin = adminClient();
    const free = async (name) => { const { data, error } = await admin.from("profiles").select("id").ilike("username", usernameIlike(name)).limit(1); if (error) throw new Error("check failed"); return !(data && data.length); };
    if (await free(u)) return jok({ state: "available" });
    const base = u.slice(0, 26), picks = [];
    for (const c of [base + Math.floor(10 + Math.random() * 90), base + "_" + Math.floor(1 + Math.random() * 9), base + Math.floor(100 + Math.random() * 900), base + "Quest", base + Math.floor(1000 + Math.random() * 9000)]) {
      if (picks.length >= 3) break;
      if (USERNAME_RE.test(c) && !picks.includes(c) && (await free(c))) picks.push(c);
    }
    return jok({ state: "taken", suggestions: picks });
  } catch { return jerr("could not check", 500); }
}
