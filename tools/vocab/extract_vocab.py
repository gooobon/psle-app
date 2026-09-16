#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""tools/vocab/extract_vocab.py - vocabulary candidate extractor (all languages,
grades, exam stages). Run from repo root:
    python tools/vocab/extract_vocab.py            # all sources
    python tools/vocab/extract_vocab.py en_p3_wa1  # one source id

Reads tools/vocab/sources.json. For every source it walks the sets and picks
words from VOCABULARY sections only, by field name:
  MCQ-family : options[] (answer option -> role "answer", others -> "option")
  Cloze      : blanks[].answer ("answer"), wordBank[] ("bank")
  Match      : pool[] ("bank"), items[].answer index -> pool word ("answer")
  Editing    : items[].answer ("spelling")
  Reading    : questions[] with format in comp_formats -> answer/acceptableAnswers ("answer")
  Any leaf   : keywords[].w ("keyword", gloss = keywords[].en / .py kept)
Outputs (repo root, gitignore-able):
  vocab_out/<source id>.json         per-source candidates with provenance
  vocab_out/<lang>_master.json       merged per language, with sources[] and items[]
  vocab_out/<lang>_missing.json      master words NOT in the language dictionary
                                     (= generation queue for the definition step)
  vocab_out/<source id>_audit.txt    optional audits (e.g. past_perfect for English)
Data files are never modified. ASCII-only source.
"""
import io, json, os, re, sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
CFG = os.path.join(os.path.dirname(os.path.abspath(__file__)), "sources.json")
OUT_DIR = os.path.join(ROOT, "vocab_out")

# ---------------------------------------------------------------- loading
def load_sets(src):
    p = os.path.join(ROOT, src["file"])
    t = io.open(p, encoding="utf-8").read()
    if src["format"] == "ts_marked":
        a = t.index(src["begin"]) + len(src["begin"]); b = t.index(src["end"])
        return json.loads(t[a:b])
    if src["format"] == "ts_const":
        i = t.index(src["const"]); i = t.index("=", i); i = t.index("[", i)
        j = t.rindex("];") + 1
        return json.loads(t[i:j])
    if src["format"] == "json":
        return json.loads(t)
    raise SystemExit("unknown format " + src["format"])

# ---------------------------------------------------------------- normalisation
PUNCT = "\"'.,!?;:()\u3002\uFF0C\uFF01\uFF1F\uFF08\uFF09\u201C\u201D\u2018\u2019"
def norm(word, lang):
    w = str(word)
    for ch in PUNCT: w = w.replace(ch, "")
    w = re.sub(r"\s+", " ", w).strip()
    if lang == "en": w = w.lower()
    if not w or w.startswith("_") or re.fullmatch(r"[\d\W_]+", w): return ""
    if lang == "zh" and not re.search(r"[\u4e00-\u9fff]", w): return ""
    return w

# ---------------------------------------------------------------- audits
IRREG_PP = ("been done gone seen given taken eaten written spoken broken known grown thrown flown drawn shown "
            "worn torn chosen frozen stolen forgotten gotten hidden ridden fallen driven risen woken beaten bitten "
            "become come run begun sung rung drunk swum won built bought brought caught taught thought fought sought "
            "felt kept left lost met sent spent slept swept wept meant dealt read said paid laid made heard held told "
            "sold found stood understood sat put cut hit hurt let set shut split spread lit led fed fled slid struck "
            "stuck hung dug spun swung wound bound ground lent bent burnt learnt dreamt smelt spelt spoilt").split()
PP_RE = re.compile(r"\b(had|hadn't|had not)\s+(been\s+|not\s+|just\s+|already\s+|never\s+|ever\s+)?(\w+ed|" + "|".join(IRREG_PP) + r")\b", re.I)
def audit_past_perfect(text, where, hits):
    if not isinstance(text, str): return
    for m in PP_RE.finditer(text):
        hits.append("%s: ...%s..." % (where, text[max(0, m.start()-30):m.end()+30].replace("\n", " ")))

# ---------------------------------------------------------------- extraction
class Collector:
    def __init__(self, src):
        self.src = src; self.lang = src["lang"]; self.cand = {}
    def add(self, word, role, item_id, example=None, gloss=None, py=None):
        n = norm(word, self.lang)
        if not n: return
        r = self.cand.get(n)
        if not r:
            r = self.cand[n] = {"word": n, "roles": set(), "items": [], "examples": [], "gloss": None, "py": None}
        r["roles"].add(role); r["items"].append(item_id)
        if example and len(r["examples"]) < 2 and example not in r["examples"]: r["examples"].append(example)
        if gloss and not r["gloss"]: r["gloss"] = gloss
        if py and not r["py"]: r["py"] = py

def walk_keywords(col, leaf, item_id):
    for k in (leaf.get("keywords") or []):
        if isinstance(k, dict): col.add(k.get("w"), "keyword", item_id, None, k.get("en"), k.get("py"))

def extract(src):
    col = Collector(src); hits = []
    sets = load_sets(src)
    vs = set(src.get("vocab_sections", [])); cf = set(src.get("comp_formats", []))
    do_pp = "past_perfect" in src.get("audits", [])
    for s in sets:
        sid = s.get("setId", "?")
        for sec in s.get("plan", []):
            st = sec.get("type")
            for it in sec.get("items", []) or []:
                iid = it.get("id", "?"); where = sid + "/" + str(iid)
                if do_pp:
                    for k in ("sentence", "passage", "sentenceA", "sentenceB", "starter"): audit_past_perfect(it.get(k), where + "." + k, hits)
                    for o in it.get("options") or []: audit_past_perfect(o, where + ".option", hits)
                    for q in it.get("questions") or []:
                        audit_past_perfect(q.get("stem"), sid + "/" + str(q.get("id")) + ".stem", hits)
                        # CLEANUP2: helper fields
                        qid = sid + "/" + str(q.get("id"))
                        audit_past_perfect(q.get("abSentence"), qid + ".abSentence", hits)
                        for k in ("sequenceItems", "statements", "acceptableAnswers"):
                            for x in q.get(k) or []: audit_past_perfect(x, qid + "." + k, hits)
                        for v in (q.get("abChoices") or {}).values(): audit_past_perfect(v, qid + ".abChoices", hits)
                        sol = q.get("solution") or {}
                        if isinstance(sol, dict):
                            for k, v in sol.items():
                                if isinstance(v, str): audit_past_perfect(v, qid + ".solution." + k, hits)
                                elif isinstance(v, list):
                                    for x in v: audit_past_perfect(x, qid + ".solution." + k, hits)
                        for o in q.get("options") or []: audit_past_perfect(o, sid + "/" + str(q.get("id")) + ".option", hits)
                    for sub in it.get("items") or []: audit_past_perfect(sub.get("sentence"), sid + "/" + str(sub.get("id")) + ".sentence", hits)
                if st not in vs: continue
                # --- MCQ family: sentence + options + answer(index)
                if isinstance(it.get("options"), list) and isinstance(it.get("answer"), int):
                    for i, o in enumerate(it["options"]):
                        col.add(o, "answer" if i == it["answer"] else "option", iid, it.get("sentence"))
                    walk_keywords(col, it, iid)
                # --- Cloze container
                if isinstance(it.get("blanks"), list):
                    for b in it["blanks"]:
                        bid = str(iid) + "_" + str(b.get("num")); col.add(b.get("answer"), "answer", bid); walk_keywords(col, b, bid)
                    for w in it.get("wordBank") or []: col.add(w, "bank", iid)
                # --- Match container (pool + items[].answer index)
                if isinstance(it.get("pool"), list) and isinstance(it.get("items"), list):
                    pool = it["pool"]
                    for w in pool: col.add(w, "bank", iid)
                    for sub in it["items"]:
                        sidx = str(iid) + "_" + str(sub.get("num"))
                        a = sub.get("answer")
                        if isinstance(a, int) and 0 <= a < len(pool): col.add(pool[a], "answer", sidx, sub.get("stem"))
                        walk_keywords(col, sub, sidx)
                # --- Editing container (items[].answer = correct spelling)
                elif isinstance(it.get("items"), list) and not it.get("pool"):
                    for sub in it["items"]:
                        if isinstance(sub.get("answer"), str): col.add(sub["answer"], "spelling", sub.get("id"), sub.get("sentence"))
                        walk_keywords(col, sub, sub.get("id"))
                # --- Reading container
                if isinstance(it.get("questions"), list):
                    for q in it["questions"]:
                        qid = q.get("id"); walk_keywords(col, q, qid)
                        if str(q.get("format", "")) in cf:
                            ans = q.get("answer")
                            if isinstance(ans, str): col.add(ans, "answer", qid, q.get("stem"))
                            elif isinstance(ans, list):
                                for a in ans:
                                    if isinstance(a, str): col.add(a, "answer", qid, q.get("stem"))
                            for a in q.get("acceptableAnswers") or []: col.add(a, "answer", qid, q.get("stem"))
                        elif isinstance(q.get("options"), list) and isinstance(q.get("answer"), int) and st in ("VocabMcq",):
                            for i, o in enumerate(q["options"]): col.add(o, "answer" if i == q["answer"] else "option", qid, q.get("stem"))
                # --- Craft item (SentenceCraft): keywords only
                if "sentenceA" in it: walk_keywords(col, it, iid)
    return col, hits

# ---------------------------------------------------------------- output
def to_records(col, src):
    out = []
    for n in sorted(col.cand):
        r = col.cand[n]
        out.append({"word": r["word"], "roles": sorted(r["roles"]), "count": len(r["items"]),
                    "items": r["items"][:8], "examples": r["examples"], "gloss": r["gloss"], "py": r["py"],
                    "source": src["id"], "lang": src["lang"], "grade": src["grade"], "stage": src["stage"]})
    return out

def load_dict(path):
    p = os.path.join(ROOT, path)
    if not os.path.exists(p): return None
    try: return json.load(io.open(p, encoding="utf-8"))
    except Exception: return None

def main():
    cfg = json.load(io.open(CFG, encoding="utf-8"))
    want = set(sys.argv[1:])
    os.makedirs(OUT_DIR, exist_ok=True)
    per_lang = {}
    for src in cfg["sources"]:
        if want and src["id"] not in want: continue
        if not os.path.exists(os.path.join(ROOT, src["file"])):
            print("skip %s (file missing: %s)" % (src["id"], src["file"])); continue
        col, hits = extract(src)
        recs = to_records(col, src)
        json.dump(recs, io.open(os.path.join(OUT_DIR, src["id"] + ".json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        roles = {}
        for r in recs:
            for ro in r["roles"]: roles[ro] = roles.get(ro, 0) + 1
        print("%-12s words=%4d roles=%s multi-word=%d" % (src["id"], len(recs), roles, sum(1 for r in recs if " " in r["word"])))
        if hits:
            io.open(os.path.join(OUT_DIR, src["id"] + "_audit.txt"), "w", encoding="utf-8").write("\n".join(hits))
            print("             audit hits=%d -> vocab_out/%s_audit.txt" % (len(hits), src["id"]))
        m = per_lang.setdefault(src["lang"], {})
        for r in recs:
            e = m.get(r["word"])
            if not e:
                e = m[r["word"]] = {"word": r["word"], "roles": set(), "sources": [], "items": [], "examples": [], "gloss": r["gloss"], "py": r["py"], "count": 0}
            e["roles"].update(r["roles"]); e["sources"].append(src["id"]); e["items"] += r["items"][:4]
            for x in r["examples"]:
                if x not in e["examples"] and len(e["examples"]) < 3: e["examples"].append(x)
            e["count"] += r["count"]
            if not e["gloss"]: e["gloss"] = r["gloss"]
            if not e["py"]: e["py"] = r["py"]
    for lang, m in per_lang.items():
        master = []
        for n in sorted(m):
            e = m[n]; e = dict(e); e["roles"] = sorted(e["roles"]); master.append(e)
        json.dump(master, io.open(os.path.join(OUT_DIR, lang + "_master.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        d = load_dict(cfg["dictionaries"].get(lang, "")) or {}
        have = set(d.keys()) if isinstance(d, dict) else set()
        missing = [e for e in master if e["word"] not in have]
        json.dump(missing, io.open(os.path.join(OUT_DIR, lang + "_missing.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        print("%s master=%d  in-dictionary=%d  MISSING(generation queue)=%d -> vocab_out/%s_missing.json"
              % (lang, len(master), len(master) - len(missing), len(missing), lang))

if __name__ == "__main__":
    main()
