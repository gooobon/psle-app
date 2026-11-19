// Test-only clock for the Next.js process. Shifts Date to 10:00 Asia/Singapore
// on the Saturday of the current week so the Saturday Weekly Review can be
// exercised without editing application code. GoTrue keeps the real clock.
const RealDate = Date;

function sgtYmd(ms) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Singapore", year: "numeric", month: "2-digit", day: "2-digit",
  }).format(ms);
}
function sgtDow(ms) {
  const w = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Singapore", weekday: "short" }).format(ms);
  return { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[w];
}

const now = RealDate.now();
const dow = sgtDow(now);
const addDays = (6 - dow + 7) % 7;
const ymd = sgtYmd(now + addDays * 86400000);
const target = RealDate.parse(ymd + "T02:00:00.000Z"); // 10:00 SGT
const shift = target - now;

class ShiftedDate extends RealDate {
  constructor(...args) {
    if (args.length === 0) super(RealDate.now() + shift);
    else super(...args);
  }
  static now() { return RealDate.now() + shift; }
  static parse(value) { return RealDate.parse(value); }
  static UTC(...args) { return RealDate.UTC(...args); }
}
global.Date = ShiftedDate;
process.env.E2E_SHIFTED_SGT_DATE = ymd;
console.error("[e2e] Next.js clock shifted to Saturday " + ymd + " 10:00 Asia/Singapore");
