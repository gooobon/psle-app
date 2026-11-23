// Shared route guard: ClewQuest routes 404 unless the flag AND server auth are on.
import { serverAuthEnabled, jerr } from "@/lib/supabase/server";
import { clewquestEnabled } from "./config.js";

export const clewquestRoutesOn = () => clewquestEnabled() && serverAuthEnabled();
export const notFound = () => jerr("not found", 404);
