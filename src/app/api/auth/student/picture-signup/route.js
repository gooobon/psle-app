// Removed: the parent creates the child (POST /api/parent/children/picture) and the child is linked automatically. Always 404.
import { jerr } from "@/lib/supabase/server";
export const runtime = "nodejs";
const gone = () => jerr("not found", 404);
export const GET = gone; export const POST = gone; export const PUT = gone; export const DELETE = gone;
