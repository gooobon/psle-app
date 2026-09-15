import io
p = "src/app/ClaudeApp.js"
s = io.open(p, encoding="utf-8", newline="").read(); crlf = "\r\n" in s; s = s.replace("\r\n", "\n")
line = "const EN_BANK = bankFromIndex(EN_ROUND_INDEX);\n"
anchor = "const EN_ROUND_INDEX = indexSets(WA1_PRACTICE_SETS);\n"
if s.count(line) != 1 or s.count(anchor) != 1: print("ABORT: anchors", s.count(line), s.count(anchor)); raise SystemExit(1)
if s.index(line) > s.index(anchor): print("already ordered"); raise SystemExit(0)
s = s.replace(line, "", 1).replace(anchor, anchor + line, 1)
io.open(p, "w", encoding="utf-8", newline="").write(s.replace("\n", "\r\n") if crlf else s); print("fixed: EN_BANK now declared after EN_ROUND_INDEX")
