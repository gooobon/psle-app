// Server-only: does this auth user sign in with a picture code? Read ONLY from app_metadata, which only the service role can
// set. user_metadata is writable by the student (supabase.auth.updateUser), so user_metadata.picture_code is never trusted:
// on its own it does not allow a parent reset. (The old user_metadata key is left in place, never deleted.)
export function usesPictureCode(user) {
  const a = user && user.app_metadata;
  return !!(a && a.picture_code === true);
}
export const PICTURE_APP_METADATA = Object.freeze({ picture_code: true });
