import io
P = "src/data/p3/english/papers/eoy/eoy_acsp_bookletB_2025.ts"
s = io.open(P, encoding="utf-8", newline="").read()
bad = ('        "1 - Alan and his friends went to the library.\n'
       '2 - Alan saw Jack looking worried.\n'
       "3 - Alan remembered Miss Joy's advice.\n"
       '4 - Alan decided to help Jack.",')
bad_crlf = bad.replace("\n", "\r\n")
good = ('        "1 - Alan and his friends went to the library.\\n'
        '2 - Alan saw Jack looking worried.\\n'
        "3 - Alan remembered Miss Joy's advice.\\n"
        '4 - Alan decided to help Jack.",')
if bad in s: s = s.replace(bad, good, 1); print("fixed (LF)")
elif bad_crlf in s: s = s.replace(bad_crlf, good, 1); print("fixed (CRLF)")
else: print("ABORT: broken block not found"); raise SystemExit(1)
io.open(P, "w", encoding="utf-8", newline="").write(s)
