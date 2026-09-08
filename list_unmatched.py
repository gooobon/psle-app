import io, json
ok = json.load(io.open("rewrite_pp_ok.json", encoding="utf-8"))
srcs = [io.open(f, encoding="utf-8").read() for f in ["20260622_WA1_complete.json", "comp60_FINAL_8type_backup.json"]]
for orig in ok:
    if not any(json.dumps(orig, ensure_ascii=False)[1:-1] in s for s in srcs):
        print("UNMATCHED:", orig[:110].replace("\n", " "))
