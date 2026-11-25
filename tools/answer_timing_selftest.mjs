// Pure checks for answer timing (issue #128). No network, no Supabase. Run: node tools/answer_timing_selftest.mjs
import { splitInterval, createActiveTimer, isTimeGuess, combineGuess, answerText, cleanTimingFields, attemptFields, summarizeSessionRow, stripTiming, isMissingColumnError, summarizeSession, IDLE_CAP_MS } from "../src/lib/answerTiming.js";
import { recordTrials, MODE } from "../src/lib/trialLedger.js";

let failed = 0;
function eq(name, a, e) { const x = JSON.stringify(a), y = JSON.stringify(e); if (x !== y) { failed++; console.error("FAIL", name, "\n  got ", x, "\n  want", y); } else console.log("ok", name); }
const clock = () => { let t = 1000000; const f = () => t; f.adv = (ms) => { t += ms; }; return f; };

// helpers
eq("interval under cap is all active", splitInterval(5000), { activeMs: 5000, idleMs: 0 });
eq("interval over 60 s: excess is idle", splitInterval(100000), { activeMs: IDLE_CAP_MS, idleMs: 40000 });
eq("negative / junk input is 0", splitInterval(-5), { activeMs: 0, idleMs: 0 });
eq("MCQ under 3 s is a guess", isTimeGuess(2999, "mcq"), true);
eq("MCQ at 3 s is not", isTimeGuess(3000, "mcq"), false);
eq("non-MCQ never flagged by time", isTimeGuess(500, "cloze"), false);
eq("existing antiGuess flag is kept", combineGuess(true, 20000, "mcq"), true);
eq("answer text caps at 500", answerText("x".repeat(900)).length, 500);
eq("answer text joins arrays", answerText(["a", "b"]), "a | b");

// ROLE-PLAY: student
const c = clock(); const t = createActiveTimer(c);
c.adv(1200); const q1 = t.lap();                       // answers very quickly
eq("student: quick answer 1.2 s", q1, { activeMs: 1200, idleMs: 0 });
c.adv(8000); const q2 = t.lap();                       // normal
eq("student: normal answer 8 s", q2.activeMs, 8000);
c.adv(5000); t.setHidden(true); c.adv(300000); t.setHidden(false); c.adv(4000); const q3 = t.lap(); // switches tab for 5 min
eq("student: hidden tab time excluded", q3, { activeMs: 9000, idleMs: 0 });
c.adv(150000); const q4 = t.lap();                     // walks away 150 s, tab visible
eq("student: long visible pause counted idle", q4, { activeMs: 60000, idleMs: 90000 });
eq("student: set totals", t.totals(), { activeMs: 1200 + 8000 + 9000 + 60000, idleMs: 90000 });
const g = combineGuess(false, q1.activeMs, "mcq"), s = combineGuess(false, q2.activeMs, "mcq");
eq("student: quick answer flagged guessed, normal not", [g, s], [true, false]);
// trial ledger carries the timing (additive) and stays correct when absent
const withT = recordTrials({}, [{ id: "Q1", topic: "VocabMCQ", sectionType: "VocabMCQ", correct: true, guessed: g, elapsedMs: q1.activeMs, sessionId: "s1", userAnswer: 2 }], { mode: MODE.EXAM, sessionNum: 1, setId: "S01" });
eq("trial keeps elapsedMs + sessionId", [withT.trials[0].elapsedMs, withT.trials[0].sessionId, withT.trials[0].guessed, withT.trials[0].firstTry], [1200, "s1", true, false]);
const noT = recordTrials({}, [{ id: "Q2", sectionType: "VocabMCQ", correct: true, userAnswer: 1 }], { mode: MODE.EXAM, sessionNum: 1, setId: "S01" });
eq("trial without timing is unchanged", "elapsedMs" in noT.trials[0], false);

// server validation + fail-soft
const ok = cleanTimingFields({ elapsedMs: 1234.6, guessed: true, confidence: "sure", answerText: "go", attemptNo: 1, sessionId: "123e4567-e89b-12d3-a456-426614174000" });
eq("server accepts valid fields", ok, { elapsed_ms: 1235, guessed: true, confidence: "sure", answer_text: "go", attempt_no: 1, session_id: "123e4567-e89b-12d3-a456-426614174000" });
eq("server nulls junk", cleanTimingFields({ elapsedMs: -1, guessed: "yes", confidence: "maybe", answerText: 5, attemptNo: 99, sessionId: "x" }), { elapsed_ms: null, guessed: null, confidence: null, answer_text: null, attempt_no: null, session_id: null });
eq("server clamps huge elapsed", cleanTimingFields({ elapsedMs: 9e12 }).elapsed_ms, 3600000);
eq("strip removes new columns only", stripTiming([{ item_id: "a", correct: true, ...ok }]), [{ item_id: "a", correct: true }]);
eq("missing column error detected", [isMissingColumnError({ code: "42703", message: "column elapsed_ms does not exist" }), isMissingColumnError({ message: "Could not find the 'guessed' column in the schema cache" }), isMissingColumnError({ message: "connection reset" })], [true, true, false]);

// ROLE-PLAY: parent sees logged times
const rows = [{ elapsed_ms: 1200, guessed: true }, { elapsed_ms: 8000, guessed: false }, { elapsed_ms: 45000, guessed: false }];
eq("parent: session summary", summarizeSession(rows), { items: 3, avgMs: 18067, fastCount: 1, slowCount: 1 });
eq("parent: old rows without timing do not break", summarizeSession([{ correct: true }]), { items: 1, avgMs: null, fastCount: 0, slowCount: 0 });

// ROLE-PLAY: student answers wrong, gets the hint, retries and is right (answerText / attemptNo reach the trial and the server fields)
const opts = ["went", "go", "goes", "going"];
const wrongFirst = attemptFields(1, 2, false, opts);           // first attempt: picked "go", wrong, no retry yet
eq("student: first attempt is attempt 1 with option text", wrongFirst, { answerText: "go", attemptNo: 1 });
const retried = attemptFields(1, 0, true, opts);               // then retried and chose "went" (correct)
eq("student: correct retry is attempt 2 with the retry text", retried, { answerText: "went", attemptNo: 2 });
eq("student: typed answer capped at 500 chars", attemptFields("y".repeat(900), undefined, false).answerText.length, 500);
eq("student: no answer => no answerText, still attemptNo", attemptFields(undefined, undefined, false), { attemptNo: 1 });
const retryTrial = recordTrials({}, [{ id: "Q9", topic: "GrammarMCQ", sectionType: "GrammarMCQ", correct: false, solvedAfterHint: true, attempts: 2, userAnswer: 1, retryAnswer: 0, elapsedMs: 7000, sessionId: "s2", ...retried }], { mode: MODE.EXAM, sessionNum: 2, setId: "S02" });
const rt = retryTrial.trials[0];
eq("student: trial keeps answerText + attemptNo, first answer still graded", [rt.answerText, rt.attemptNo, rt.userAnswer, rt.firstTry, rt.solvedAfterHint], ["went", 2, 1, false, true]);
const srv = cleanTimingFields({ elapsedMs: rt.elapsedMs, answerText: rt.answerText, attemptNo: rt.attemptNo, sessionId: "123e4567-e89b-12d3-a456-426614174000" });
eq("student: server stores answer_text + attempt_no for the retry", [srv.answer_text, srv.attempt_no, srv.elapsed_ms], ["went", 2, 7000]);
const noOld = recordTrials({}, [{ id: "Q10", sectionType: "GrammarMCQ", correct: true, userAnswer: 0 }], { mode: MODE.EXAM, sessionNum: 2, setId: "S02" }).trials[0];
eq("student: flag off => no new fields on the trial", ["answerText" in noOld, "attemptNo" in noOld], [false, false]);

// ROLE-PLAY: parent reads one practice_sessions row
eq("parent: session summary row", summarizeSessionRow({ item_count: 10, first_try_correct: 7, guessed_count: 2, active_ms: 540000 }), { items: 10, firstTryCorrect: 7, guessedCount: 2, firstTryRate: 70, activeMin: 9 });
eq("parent: row with nulls does not break", summarizeSessionRow({ item_count: null, first_try_correct: null, guessed_count: null, active_ms: null }), { items: 0, firstTryCorrect: 0, guessedCount: 0, firstTryRate: null, activeMin: null });

if (failed) { console.error(failed + " FAILED"); process.exit(1); }
console.log("answer_timing_selftest: all passed");
