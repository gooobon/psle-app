// Server-only: the picture-code login decision, free of Next/Supabase imports so the self-test can drive it with mocks.
// Order: count the attempt atomically (guard.begin) -> sign in -> on failure record it (guard.fail) -> on success reset.
// Fails CLOSED: any lockout store error is 503, never 401. One generic 401 message for every wrong code / unknown user.
export const MSG = {
  unavailable: "sign-in temporarily unavailable",
  locked: "Ask a parent to help you sign in",
  invalid: "invalid credentials",
};

// deps: { guard, admin, username, ipHash, signIn(): Promise<{ user } | { error }>, loadProfile(id), signOut() }
// -> { status, error? , profile? }
export async function runPictureLogin({ guard, admin, username, ipHash, signIn, loadProfile, signOut }) {
  const g = await guard.begin(admin, username, ipHash);
  if (g.error) return { status: 503, error: MSG.unavailable };
  if (g.locked) return { status: 429, error: MSG.locked };
  const failed = async () => {
    const f = await guard.fail(admin, username, ipHash);
    return f.error ? { status: 503, error: MSG.unavailable } : { status: 401, error: MSG.invalid };
  };
  const s = await signIn();
  if (!s || s.error || !s.user) return failed();
  const profile = await loadProfile(s.user.id);
  if (!profile || profile.role !== "student") { await signOut(); return failed(); }
  await guard.reset(admin, username); // a failed reset only leaves the counter as is; the child is already signed in
  return { status: 200, profile };
}
