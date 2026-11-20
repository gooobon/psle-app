// Pure logic of the tap-to-order cards (components/OrderTap.js). No React, so it can be self-tested in Node.
export function nextOrderValue(value, i, n) {
  const v = Array.from({ length: n }, (_, j) => (Number.isInteger(value && value[j]) && value[j] >= 1 && value[j] <= n ? value[j] : 0));
  if (v[i]) { const gone = v[i]; return v.map((x, j) => (j === i ? 0 : x > gone ? x - 1 : x)); } // take a number back
  const next = Math.max(0, ...v) + 1;
  v[i] = next; return v;
}
export function undoOrderValue(value, n) {
  const v = Array.from({ length: n }, (_, j) => (Number.isInteger(value && value[j]) ? value[j] : 0));
  const top = Math.max(0, ...v);
  return v.map((x) => (x === top ? 0 : x));
}
