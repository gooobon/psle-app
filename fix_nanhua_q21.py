import io
P = "src/data/p3/english/papers/eoy/eoy_nanhua_p2_2025.ts"
lines = io.open(P, encoding="utf-8", newline="").read().split("\n")
hits = [i for i, l in enumerate(lines) if "answer: 'L (she)" in l and "Wait" in l]
if len(hits) != 1: print("ABORT: found %d" % len(hits)); raise SystemExit(1)
i = hits[0]; indent = lines[i][:len(lines[i]) - len(lines[i].lstrip())]
lines[i] = indent + "answer: 'M',"
io.open(P, "w", encoding="utf-8", newline="").write("\n".join(lines))
print("fixed line %d -> answer: 'M'" % (i + 1))
