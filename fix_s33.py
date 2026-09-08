import io, json
n = 0
for fn in ["20260622_WA1_complete.json", "comp60_FINAL_8type_backup.json"]:
    raw = io.open(fn, encoding="utf-8").read()
    old, new = "speech had won the class competition", "speech won the class competition"
    if old in raw:
        raw = raw.replace(old, new); io.open(fn, "w", encoding="utf-8").write(raw); n += 1; print("fixed in", fn)
print("done" if n else "not found (already fixed?)")
