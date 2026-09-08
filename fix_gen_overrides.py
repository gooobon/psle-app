import io, json
p = "tools/vocab/gen_vocab_defs.py"
s = io.open(p, encoding="utf-8").read()
old = "        for w, e in ov.items():\n            if e is None:"
new = "        for w, e in ov.items():\n            if w.startswith(\"_\"): continue\n            if e is None:"
if "startswith(\"_\")" in s: print("script: already fixed")
elif old in s: io.open(p, "w", encoding="utf-8").write(s.replace(old, new, 1)); print("script: fixed")
else: print("script: ANCHOR MISS")
op = "tools/vocab/en_vocab_overrides.json"
ov = json.load(io.open(op, encoding="utf-8"))
if "board" in ov: del ov["board"]; print("overrides: board removed (exam sense is the verb)")
json.dump(ov, io.open(op, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
