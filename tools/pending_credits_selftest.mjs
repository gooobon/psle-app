// Pure checks for pending -> confirmed/forfeited credits (issue #32). No network. Run: node tools/pending_credits_selftest.mjs
import { creditStatusFor, finalizeCreditRows, creditTotals, homeworkGate } from "../src/lib/rewards.js";

let failed = 0;
function eq(name, actual, expected) {
  const a = JSON.stringify(actual), e = JSON.stringify(expected);
  if (a !== e) { failed++; console.error("FAIL", name, "\n  got ", a, "\n  want", e); } else console.log("ok", name);
}
const D = "2026-11-20", NEXT = "2026-11-21";
const hw = (n, solved) => Array.from({ length: n }, (_, i) => ({ solved_at: i < solved ? "t" : null }));
const g = (rows) => homeworkGate(rows);
const credit = (o = {}) => ({ status: "pending", credits: 3, gate_day: D, period: D, ...o });

// Pending -> confirmed when homework is done (same day, before the day ends)
eq("homework all solved same day: confirmed now", creditStatusFor(g(hw(3, 3)), D, D), "confirmed");
// Pending -> forfeited at day end when unfinished
eq("homework unfinished, day still open: pending", creditStatusFor(g(hw(3, 1)), D, D), "pending");
eq("homework unfinished, day over: forfeited", creditStatusFor(g(hw(3, 1)), D, NEXT), "forfeited");
eq("homework assigned, none solved, day over: forfeited", creditStatusFor(g(hw(2, 0)), D, NEXT), "forfeited");
// No homework -> confirmed (at the end of the day, so a late assignment can still gate)
eq("no homework, day still open: pending", creditStatusFor(g([]), D, D), "pending");
eq("no homework, day over: confirmed", creditStatusFor(g([]), D, NEXT), "confirmed");
// Homework assigned AFTER the claim still gates: claim made with no homework (pending), parent assigns later, child does not finish.
const claimed = [credit()];
eq("claim before assignment stays pending while the day is open", finalizeCreditRows(claimed, { [D]: [] }, D)[0].status, "pending");
eq("assigned after the claim and unfinished -> forfeited at day end", finalizeCreditRows(claimed, { [D]: hw(2, 1) }, NEXT)[0].status, "forfeited");
eq("assigned after the claim and finished later -> confirmed at once", finalizeCreditRows(claimed, { [D]: hw(2, 2) }, D)[0].status, "confirmed");

// Idempotent + records are never deleted
const once = finalizeCreditRows([credit(), credit({ credits: 2, kind: "weekly" })], { [D]: hw(1, 0) }, NEXT);
const twice = finalizeCreditRows(once, { [D]: hw(1, 1) }, NEXT); // even if homework is "solved" afterwards, a decided row never changes
eq("finalize twice is stable", twice, once);
eq("forfeited rows are kept (count unchanged)", once.length, 2);
eq("decided rows are not reopened", twice.map((r) => r.status), ["forfeited", "forfeited"]);
// Legacy row (no gate_day) falls back to its period
eq("legacy pending row uses period", finalizeCreditRows([{ status: "pending", credits: 1, period: D }], {}, NEXT)[0].status, "confirmed");

// Only confirmed credits count toward the balance
const rows = [{ status: "confirmed", credits: 5 }, { status: "pending", credits: 3 }, { status: "forfeited", credits: 4 }, { credits: 2 /* legacy = confirmed */ }];
eq("balance counts confirmed only", creditTotals(rows, 2), { confirmed: 7, pending: 3, forfeited: 4, paid: 2, balance: 5 });

if (failed) { console.error(failed + " FAILED"); process.exit(1); }
console.log("ALL PASS");
