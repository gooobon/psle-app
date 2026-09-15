#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Re-emit src/data/p3/chinese/wa1_practice.ts from wa1_zh_complete.json (Part B).
Preserves exact header/import/marker/footer format. Real UTF-8 Chinese, no BOM."""
import json, os
HERE = os.path.dirname(__file__)
data = json.load(open(os.path.join(HERE, "wa1_zh_complete.json"), encoding="utf-8"))
# which sets are enriched (have any explanation_en)
def enriched(z):
    found = [False]
    def walk(o):
        if isinstance(o, list):
            for x in o: walk(x)
        elif isinstance(o, dict):
            if "explanation_en" in o: found[0] = True
            for v in o.values(): walk(v)
    walk(z["plan"])
    return found[0]
done = [z["setId"] for z in data if enriched(z)]
rng = f"{done[0]}-{done[-1]}" if done else "none"
header = (f"// wa1_practice.ts (GENERATED) - enriched sets: {len(done)}/60 ({','.join(done)}); "
          f"remaining pending full expansion\n"
          'import type { ZhPracticeSet } from "./schema";\n\n'
          "export const WA1_ZH_PRACTICE: ZhPracticeSet[] =\n"
          "/* WA1_ZH_JSON_BEGIN */\n")
body = json.dumps(data, ensure_ascii=False, indent=1)
footer = "\n/* WA1_ZH_JSON_END */\n;\n\nexport default WA1_ZH_PRACTICE;\n"
out = header + body + footer
with open(os.path.join(HERE, "src", "data", "p3", "chinese", "wa1_practice.ts"), "w", encoding="utf-8") as f:
    f.write(out)
# round-trip check
begin = out.index("/* WA1_ZH_JSON_BEGIN */") + len("/* WA1_ZH_JSON_BEGIN */\n")
end = out.index("\n/* WA1_ZH_JSON_END */")
parsed = json.loads(out[begin:end])
assert len(parsed) == 60, f"round-trip set count {len(parsed)}"
print(f"emitted wa1_practice.ts  sets=60  enriched={len(done)} ({rng})  round-trip OK")
# STEP5_BANK: rebuild the skill item bank whenever the data is re-emitted
import importlib.util as _ilu
_spec = _ilu.spec_from_file_location("build_zh_bank", os.path.join(HERE, "tools", "bank", "build_zh_bank.py"))
_m = _ilu.module_from_spec(_spec); _spec.loader.exec_module(_m); _m.main()
