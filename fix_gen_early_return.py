import io
p = "tools/vocab/gen_vocab_defs.py"
s = io.open(p, encoding="utf-8").read()
a = "    if dry or not todo: return\n    key = read_key()\n    if not key: raise SystemExit(\"ANTHROPIC_API_KEY not found in .env.local\")\n"
b = "    if dry: return\n    key = read_key()\n    if todo and not key: raise SystemExit(\"ANTHROPIC_API_KEY not found in .env.local\")\n"
if b in s: print("already fixed")
elif a in s: io.open(p, "w", encoding="utf-8").write(s.replace(a, b, 1)); print("fixed")
else: print("ANCHOR MISS")
