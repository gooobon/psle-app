# Learning dashboard role-play, 19 Nov 2026

Played Mrs Tan, Mr Tan, and Amir through the real UI on PR #43 (`claude/issue-42-20261119-0756`) against local Supabase only. `supabase db reset` applied `20261127000000_learning_trials.sql`. The runner refused any URL or key containing the production project `zehnulwvysvnsshunxzr`. `EMAIL_ALERTS_ENABLED` and `WHATSAPP_ENABLED` stayed unset. Flags on for this local process only: `NEXT_PUBLIC_SERVER_AUTH`, `NEXT_PUBLIC_LEARNING_DASHBOARD_ENABLED`, `NEXT_PUBLIC_WRONG_ANSWERS_SYNC_ENABLED`, `NEXT_PUBLIC_PARENT_HOMEWORK_ENABLED`.

`E2E_PLAYWRIGHT_GREP=@learning bash tools/e2e/run-roleplay.sh` exited 0. The recorded steps are **13 pass, 1 fail, 0 gap**. The fail is the forged-trial check below. It is a real product hole, so it is not counted as a pass. The Playwright process stays green only so the number checks can finish; the fail is still in this table.

Days are the same three-place shift as the 19 Nov role-play (Next `day-shift.cjs`, the browser `Date`, and the local-only `e2e_clock` table). The host clock was not changed. Day 0 is Thursday 19 Nov 2026. Day +1 is Friday 20 Nov. Day +8 is Friday 27 Nov, so the first set is more than 7 days behind the Learning tab.

## What Amir actually did

| When | What was submitted | Stored |
|---|---|---|
| 19 Nov | English S01, 37 graded answers | 17 first-try correct, 20 not. `17/37 = 45.95%` rounds to **46**. All 37 rows are mode `exam`, weight 1. |
| 19 Nov | Three wrong cards tagged in English | `concept_unknown`, `misread`, `trap`, one each |
| 19 Nov | Homework is the same missed question `S01_B_S01_B2` | 0 `homework` rows for that item |
| 20 Nov | Homework is the unseen same-skill question `S02_B_S02_B1` | 1 `homework` row, weight **0.5**, `first_try` false, skill `en.grammar.subject_verb_agreement` |
| 27 Nov | English S02, 37 graded answers | 20 first-try correct, 17 not. `20/37 = 54.05%` rounds to **54**. Mode `exam`, weight 1. |

The score driver aimed at 60–75 and then 85–100. Cloze and comprehension misses pulled both sets below those bands. The dashboard was checked against these submitted answers, not against the unused target band.

Session 2 has 17 trials that are not first-try correct, and 6 `wrong_answers` rows (`set-2`, 27 Nov). The other 11 are hinted-correct or guessed, so they stay in the mastery rate and stay out of the cause bars. The notebook cards for 27 Nov match those 6.

## Hand check

Weekly first-attempt uses exam and mock only, Monday in Asia/Singapore. Homework is left out.

- Week of 16 Nov: the 19 Nov set, **46%**
- Week of 23 Nov: the 27 Nov set, **54%**

Trend with two sessions compares the newer half with the older half. 54 − 46 = 8, and the threshold is 5, so the word is **improving**. The screen says "First-try score: 54% in the latest sessions vs 46% before."

All 26 skills: `now`, `weekAgo`, and `delta` on the parent API matched a hand count of the stored `learning_trials` rows (weight summed, first-try only, half-weight kept). Skills that already had a trial on 19 Nov show "vs 7 days ago". Skills that start on 27 Nov say "new this week". Subject-verb agreement is 44%, up 4 points, and that skill's rows include the 0.5 homework answer.

Cause bars, last 14 days, from `wrong_answers.attempted_at`:

- No cause picked yet: **17** (11 from 19 Nov, 6 from 27 Nov)
- Fell for a trap: **1** (the week before)
- Misread the question: **1** (the week before)
- Didn't know the concept: **1** (the week before)

Mrs Tan and Mr Tan received the same JSON for skills, causes, trend, and weekly scores. Both screens show Improving, 54% vs 46%, the two week bars, and those four cause rows.

Amir's `/api/student/learning` skills JSON equals the parents' JSON. His notebook shows each of those percents, "Your error patterns", and the three English labels. The Today filter still leaves "Mastery by skill" on screen.

## Steps

| Role | Step | Expected | Actual | Result | Screenshot |
|---|---|---|---|---|---|
| Parents | Both linked to Amir | 2 `parent_child` rows | 2 rows | PASS | [01](e2e-2026-11-19/learn-01-parents.png) |
| Amir | 19 Nov set reaches the server | Exam trials stored for the signed-in student | 37 exam trials | PASS | [02](e2e-2026-11-19/learn-02-after-set.png) |
| Amir | English cause labels | The three picked causes are stored | concept 1, misread 1, trap 1 | PASS | [03](e2e-2026-11-19/learn-03-causes.png) |
| Amir | Same question again | That item adds no homework trial | Assigned 1; homework rows 0 | PASS | [04](e2e-2026-11-19/learn-04-same-question.png) |
| Amir | Unseen similar question one day later | One homework trial at weight 0.5 | weight 0.5, first-try false, subject-verb agreement | PASS | [05](e2e-2026-11-19/learn-05-half.png) |
| Both parents | Same Learning tab | Skills, causes, trend, weekly scores match | JSON identical | PASS | [07](e2e-2026-11-19/learn-07-parent-b.png) |
| Mrs Tan | Mastery now vs 7 days ago | Hand count of the stored trials, and a 7-day comparison on screen | 26 skills match; "vs 7 days ago" shown | PASS | [06](e2e-2026-11-19/learn-06-parent-a.png) |
| Mrs Tan | Weekly first-attempt | Exam and mock only, hand-counted, on screen | 16 Nov 46%, 23 Nov 54% | PASS | [06](e2e-2026-11-19/learn-06-parent-a.png) |
| Mrs Tan | Improving / flat / slipping | Word matches the last sessions vs the earlier ones | improving, 54 vs 46 | PASS | [06](e2e-2026-11-19/learn-06-parent-a.png) |
| Mrs Tan | 14-day cause bars | Counts match the causes Amir picked and the untagged wrongs | 17 untagged, and the three labels at 1 | PASS | [06](e2e-2026-11-19/learn-06-parent-a.png) |
| Amir | Notebook mastery and error patterns | Same skill percents as the parents, and his cause labels | Skills JSON equal; labels on screen | PASS | [08](e2e-2026-11-19/learn-08-student.png) |
| Amir | Filter the mistake list | The mastery card stays | "Mastery by skill" still shown on Today | PASS | [09](e2e-2026-11-19/learn-09-filtered.png) |
| Amir | Forged learning trial | A signed-in student cannot store a trial he never sat, or choose its first-try flag or weight | API 200 stored `first_try: true`, weight 1. Direct insert of weight 0.5 returned 201 | FAIL | |

## Fixes in this branch

`setProgress` was sending the student's username into `syncLearningTrials`, which only accepts a profile UUID. Every real student was skipped, so the Learning tab would have stayed empty. It now sends `serverId`. Local progress stays keyed by the username. The 37 exam trials above are the check that the copy lands.

The student mastery card was rendered only inside the non-empty mistake list, so an empty filter hid the server-backed card. It now sits above that list. The Today filter in this run still shows it.

No `genius_*` key was renamed, cleared, or reset. Nothing was deleted.

## Forged trials (the fail)

A signed-in student can write `learning_trials` rows for answers he never sat.

- `POST /api/learning/trials` returned 200 for item `forged-perfect`, skill `en.grammar.forged_skill`, `firstTry: true`, `correct: true`, weight 9. The stored row is first-try true and weight **1**. The route replaces a weight outside `(0, 1]` with 1.
- A second post of the same item, mode, and timestamp with `firstTry: false` left the row first-try true. The unique key is `(student, subject, item, mode, attempted_at)` and the upsert ignores conflicts. There is no update or delete policy, so an existing row cannot be flipped or removed.
- A different timestamp is a new row, so the student can add as many extra answers as he wants. The API allows 60 posts a minute, 300 items each.
- Calling PostgREST with the student's own access token (the anon key is in the client) bypasses that route. Weight 9 was rejected by the table check (`weight > 0 and weight <= 1`, HTTP 400). Weight 0.5 with `first_try: true` on a made-up exam item was inserted (HTTP 201). Another student's id was rejected (HTTP 403).

What that changes: the parent Learning tab and Amir's own mastery card. An invented exam row adds a skill, and enough of them move the weekly first-attempt score and the improving / flat / slipping word. Rewards, homework completion, and local `genius_*` progress are separate and were not changed. Closing the hole means the server grades the answer. Clamping the weight does not, because correctness, skill, item, and time still come from the client.
