# First-screens screenshots (390x844, mocked API)
Made by `node tools/shots/first-screens.mjs <baseUrl> docs/design/first-screens-shots` against a build with `NEXT_PUBLIC_SERVER_AUTH=true NEXT_PUBLIC_CLEWQUEST_ENABLED=true`. All `/api/*` calls are Playwright route mocks; Supabase requests are aborted.

| Shot | Design says / screen shows |
|---|---|
| 01-landing | Art ~60% height; logo in white circle badge; white pills English / Math + muted Coming soon / Chinese / Science + muted Coming soon; white card overlapping art with gold top edge, heading, subtitle, gold dotted divider, crimson Log in, blue-outline Sign up; marble below with parent note. |
| 02, 03-login-student | ~170px art strip, logo badge overlapping, white sheet, Student/Parent segmented control, Username, "Tap your 4 pictures in order" + gold dots, 3x3 tiles (Owl..Clew), gold border + order badge on selected, crimson Log in, footer, "Use a password instead". |
| 04-login-parent | Email, Password, blue right-aligned "Forgot password?", crimson Log in, crimson "Create a family account" link, Student-tab note. Google button hidden (flag off). |
| 05-forgot-password / 06-set-new-password | Same style; reset email request and "Set a new password". |
| 07, 08-signup-step1 | White bar with logo only, "Step 1 of 2", 3 fields, Parent/Guardian chips, 3 checkboxes, crimson Continue, footnote, "I'm a student" message. |
| 09-check-your-email | Check-your-email card. |
| 10, 11-add-child | Step 2 of 2, first/last name, Level, Subjects, Mother Tongue, School, live username status, picture password twice, crimson Add child. |
| 12, 13-builder | White header (step label, logo, Shuffle), preview card with Boy/Girl and Today -> 300 -> 700 strip, tabs (only Hair enabled), 2x5 hair grid with crimson selection, 6 colour circles, crimson "This is my Clew". |
| 14-logged-in-landing | Same art and pills; invisible hotspots; Today / Log out in a white bar under the art. |
| 15-clewquest-home | Marble, white cards, gold progress bar. |
| 16, 17-parent | Marble dashboard, white header; Add child uses the same component as step 2. |
