// Test-only clock for the Next.js process. Adds whole days from E2E_DAY_SHIFT_FILE
// (a single integer). Read on every Date.now() so a running server can change day
// without a restart. GoTrue is a different process and keeps the real clock.
// The host hypervisor resets `date -s` within seconds, so this file is the day control.
const fs = require("fs");
const RealDate = Date;
const file = process.env.E2E_DAY_SHIFT_FILE || "/tmp/e2e-day-shift.txt";
let cached = { mtime: -1, days: 0 };

function shiftDays() {
  try {
    const st = fs.statSync(file);
    if (st.mtimeMs !== cached.mtime) {
      cached = { mtime: st.mtimeMs, days: Number(fs.readFileSync(file, "utf8")) || 0 };
    }
  } catch { cached = { mtime: -1, days: 0 }; }
  return cached.days;
}

class ShiftedDate extends RealDate {
  constructor(...args) {
    if (args.length === 0) super(RealDate.now() + shiftDays() * 86400000);
    else super(...args);
  }
  static now() { return RealDate.now() + shiftDays() * 86400000; }
  static parse(value) { return RealDate.parse(value); }
  static UTC(...args) { return RealDate.UTC(...args); }
}

global.Date = ShiftedDate;
