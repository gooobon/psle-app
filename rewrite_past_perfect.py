#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""rewrite_past_perfect.py - remove Past Perfect (had + participle) from student-facing
English WA1 text. Policy: FULL rewrite (all fields), decided 2026-09-08.
Run from repo root:
    python rewrite_past_perfect.py --scan          # list hits, no API, no writes
    python rewrite_past_perfect.py --no-apply      # rewrite all -> rewrite_pp_review.txt (REVIEW FIRST)
    python rewrite_past_perfect.py --apply-only    # apply reviewed rewrite_pp_ok.json to source JSONs
    python rewrite_past_perfect.py --limit 10      # pilot
Then:  node build_wa1_practice.js ; python tools\\vocab\\extract_vocab.py en_p3_wa1  (audit hits -> 0)

How it works
  1. Scan src/data/p3/english/wa1_practice.ts (the built file) for hits in
     sentence / passage / stem / sentenceA / sentenceB / starter. Options are LISTED
     ONLY (an option that is itself had+pp needs a redesigned option set, not a rewrite).
  2. Each unique string goes to the model with a minimal-change instruction.
  3. Validation (hard): no Past Perfect left; blank markers identical (same count,
     same numbers, same underscores); sentence count unchanged for passages;
     length within +/-25%; ASCII normalised; options/word banks untouched.
  4. Passing rewrites are applied by EXACT STRING MATCH to
     20260622_WA1_complete.json and comp60_FINAL_8type_backup.json (backups written
     as *.pp_backup.json once). Unmatched strings are reported, never guessed.
  5. rewrite_pp_review.txt: before/after for every change (human review).
"""
import io, json, os, re, sys, time, urllib.request

ROOT = os.path.dirname(os.path.abspath(__file__))
TS = os.path.join(ROOT, "src", "data", "p3", "english", "wa1_practice.ts")
SRC_FILES = ["20260622_WA1_complete.json", "comp60_FINAL_8type_backup.json"]
REVIEW = os.path.join(ROOT, "rewrite_pp_review.txt")
MANUAL = os.path.join(ROOT, "rewrite_pp_manual.txt")
MODEL = "claude-sonnet-4-6"
BATCH = 5
FIELDS = ["sentence", "passage", "stem", "sentenceA", "sentenceB", "starter"]

IRREG_PP = ("been done gone seen given taken eaten written spoken broken known grown thrown flown drawn shown "
            "worn torn chosen frozen stolen forgotten gotten hidden ridden fallen driven risen woken beaten bitten "
            "become come run begun sung rung drunk swum won built bought brought caught taught thought fought sought "
            "felt kept left lost met sent spent slept swept wept meant dealt read said paid laid made heard held told "
            "sold found stood understood sat put cut hit hurt let set shut split spread lit led fed fled slid struck "
            "stuck hung dug spun swung wound bound ground lent bent burnt learnt dreamt smelt spelt spoilt").split()
PP_RE = re.compile(r"\b(had|hadn't|had not|hadn\u2019t)\s+(been\s+|not\s+|just\s+|already\s+|never\s+|ever\s+)?(\w+ed|" + "|".join(IRREG_PP) + r")\b", re.I)
BLANK_RE = re.compile(r"\(\d+\)\s*_{3,}|_{3,}")

def read_key():
    p = os.path.join(ROOT, ".env.local")
    if os.path.exists(p):
        for line in io.open(p, encoding="utf-8"):
            if line.strip().startswith("ANTHROPIC_API_KEY="): return line.strip().split("=", 1)[1].strip().strip('"').strip("'")
    return os.environ.get("ANTHROPIC_API_KEY")

def ascii_norm(s):
    return (s.replace("\u2019", "'").replace("\u2018", "'").replace("\u201c", '"').replace("\u201d", '"')
             .replace("\u2014", " - ").replace("\u2013", "-").replace("\u2026", "...").replace("  ", " "))

# ---------------------------------------------------------------- scan
def load_ts():
    t = io.open(TS, encoding="utf-8").read()
    i = t.index("=", t.index("WA1_PRACTICE_SETS: PracticeSet[]")); i = t.index("[", i); j = t.rindex("];") + 1
    return json.loads(t[i:j])

HAD_BLANK_RE = re.compile(r"\b(had|hadn't|had not)\b(\s+\w+){0,2}\s*(\(\d+\)\s*_{3,}|_{3,})", re.I)
def scan():
    sets = load_ts(); hits = {}; option_hits = []; answer_check = []
    def note(text, where, field):
        if isinstance(text, str) and PP_RE.search(text):
            if HAD_BLANK_RE.search(text):        # 'had (n)___' : the blank's answer form depends on it -> manual
                answer_check.append((where, field, text)); return
            h = hits.setdefault(text, {"field": field, "where": []}); h["where"].append(where)
    for s in sets:
        sid = s["setId"]
        for sec in s["plan"]:
            for it in sec["items"]:
                iid = it.get("id", "?")
                for f in FIELDS: note(it.get(f), sid + "/" + iid, f)
                for oi, o in enumerate(it.get("options") or []):   # grammar/vocab MCQ: option sets are designed -> manual
                    if isinstance(o, str) and PP_RE.search(o): option_hits.append((sid, iid, oi, o, it.get("answer")))
                for q in it.get("questions") or []:
                    note(q.get("stem"), sid + "/" + str(q.get("id")), "stem")
                    # CLEANUP2: helper fields shown to the student
                    qid = sid + "/" + str(q.get("id"))
                    for k in ("abSentence",): note(q.get(k), qid + "." + k, k)
                    for k in ("sequenceItems", "statements", "acceptableAnswers"):
                        for i2, x in enumerate(q.get(k) or []): note(x, qid + "." + k + "[" + str(i2) + "]", k)
                    for v in (q.get("abChoices") or {}).values(): note(v, qid + ".abChoices", "abChoices")
                    sol = q.get("solution") or {}
                    if isinstance(sol, dict):
                        for k, v in sol.items():
                            if isinstance(v, str): note(v, qid + ".solution." + k, "solution")
                            elif isinstance(v, list):
                                for i2, x in enumerate(v): note(x, qid + ".solution." + k + "[" + str(i2) + "]", "solution")
                    for oi, o in enumerate(q.get("options") or []):   # comprehension MCQ: tense change keeps truth value -> auto
                        note(o, sid + "/" + str(q.get("id")) + "[" + str(oi) + "]", "option")
                for sub in it.get("items") or []: note(sub.get("sentence"), sid + "/" + str(sub.get("id")), "sentence")
    scan.answer_check = answer_check
    by_where = {}
    for t, h in hits.items():
        for w in h["where"]: by_where[w] = t
    for w, f, t in answer_check: by_where[w] = t
    scan.by_where = by_where
    return hits, option_hits

# ---------------------------------------------------------------- rewrite
SYSTEM = (
"You edit sentences for a Singapore Primary 3 English exam. Task: remove every Past Perfect "
"(had / hadn't / had not + past participle) with the SMALLEST possible change. Use simple past instead; "
"if the order of events matters, keep it clear with words like 'before', 'after', 'earlier', 'already', 'first'. "
"Keep everything else IDENTICAL: same words, same names, same punctuation, same line breaks, and every blank marker "
"exactly as given (for example '(3) ___' or '________'). Never add or remove a blank. Never change words next to a blank "
"unless they are part of the had+participle clause. Do not shorten or expand the text. "
"Return ONLY a JSON array of objects {\"i\": <index>, \"text\": <rewritten>} in the same order, no markdown."
)

def call_api(key, batch):
    payload = [{"i": i, "text": t} for i, t in enumerate(batch)]
    body = json.dumps({"model": MODEL, "max_tokens": 8000, "system": SYSTEM,
                       "messages": [{"role": "user", "content": json.dumps(payload, ensure_ascii=False)}]}).encode("utf-8")
    req = urllib.request.Request("https://api.anthropic.com/v1/messages", data=body, headers={
        "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01"})
    with urllib.request.urlopen(req, timeout=180) as r: data = json.loads(r.read().decode("utf-8"))
    text = "".join(b.get("text", "") for b in data.get("content", []) if b.get("type") == "text")
    text = re.sub(r"^```(json)?|```$", "", text.strip(), flags=re.M).strip()
    a, b = text.find("["), text.rfind("]")
    if a >= 0 and b > a: text = text[a:b + 1]          # model sometimes prefixes reasoning
    try: out = json.loads(text)
    except Exception:
        try: out = json.loads(re.sub(r",\s*([\]\}])", r"\1", text))
        except Exception:
            with io.open(os.path.join(ROOT, "rewrite_pp_raw.log"), "a", encoding="utf-8") as f:
                f.write("\n=== NON-JSON RESPONSE (stop_reason=%s) ===\n%s\n" % (data.get("stop_reason"), text[:3000]))
            raise
    return {int(o["i"]): o["text"] for o in out if isinstance(o, dict) and "text" in o}

def validate(orig, new):
    if not isinstance(new, str) or not new.strip(): return ["empty"]
    p = []
    if PP_RE.search(new): p.append("past perfect remains")
    if BLANK_RE.findall(orig) != BLANK_RE.findall(new): p.append("blank markers changed")
    if orig.count("\n") != new.count("\n"): p.append("line breaks changed")
    so = len(re.findall(r"[.!?](\s|$)", orig)); sn = len(re.findall(r"[.!?](\s|$)", new))
    if abs(so - sn) > 1: p.append("sentence count changed")
    lo, ln = len(orig.split()), len(new.split())
    if ln < lo * 0.75 or ln > lo * 1.25: p.append("length %d->%d" % (lo, ln))
    return p

# ---------------------------------------------------------------- apply
def apply_to_sources(replacements):
    report = {}
    for fn in SRC_FILES:
        p = os.path.join(ROOT, fn)
        if not os.path.exists(p): print("missing source", fn); continue
        raw = io.open(p, encoding="utf-8").read()
        bak = p.replace(".json", ".pp_backup.json")
        if not os.path.exists(bak): io.open(bak, "w", encoding="utf-8").write(raw)
        data = json.loads(raw); n = 0
        def walk(o):
            nonlocal n
            if isinstance(o, dict):
                for k, v in o.items():
                    if isinstance(v, str) and v in replacements: o[k] = replacements[v]; n += 1; report[v] = report.get(v, 0) + 1
                    else: walk(v)
            elif isinstance(o, list):
                for i, v in enumerate(o):
                    if isinstance(v, str) and v in replacements: o[i] = replacements[v]; n += 1; report[v] = report.get(v, 0) + 1
                    else: walk(v)
        walk(data)
        g = 0
        for old_sub, new_sub in getattr(apply_to_sources, "global_subs", []):
            def gw(o):
                nonlocal g
                if isinstance(o, dict):
                    for k, v in o.items():
                        if isinstance(v, str) and old_sub in v: o[k] = v.replace(old_sub, new_sub); g += 1
                        else: gw(v)
                elif isinstance(o, list):
                    for i, v in enumerate(o):
                        if isinstance(v, str) and old_sub in v: o[i] = v.replace(old_sub, new_sub); g += 1
                        else: gw(v)
            gw(data)
        io.open(p, "w", encoding="utf-8").write(json.dumps(data, ensure_ascii=False, indent=2))
        print("applied %d replacements + %d hint/global substitutions in %s (backup: %s)" % (n, g, fn, os.path.basename(bak)))
    unmatched = [t for t in replacements if t not in report]
    # ---- fallback: the string is a SUBSTRING of a source string (Editing sentences
    #      are cut from the section passage at build time). Guard: every "word (n)"
    #      editing target must survive unchanged in the rewrite.
    TARGET_RE = re.compile(r"\S+\s*\(\d+\)")
    still = []
    for orig in unmatched:
        new = replacements[orig]
        if TARGET_RE.findall(orig) != TARGET_RE.findall(new):
            print("  guard: editing target changed, NOT applied: %s" % orig[:70].replace("\n", " ")); still.append(orig); continue
        applied = 0
        for fn in SRC_FILES:
            p = os.path.join(ROOT, fn)
            if not os.path.exists(p): continue
            data = json.loads(io.open(p, encoding="utf-8").read())
            holders = []
            def find(o):
                if isinstance(o, dict):
                    for k, v in o.items():
                        if isinstance(v, str) and orig in v: holders.append((o, k))
                        else: find(v)
                elif isinstance(o, list):
                    for i, v in enumerate(o):
                        if isinstance(v, str) and orig in v: holders.append((o, i))
                        else: find(v)
            find(data)
            if len(holders) >= 1:
                for o, k in holders: o[k] = o[k].replace(orig, new)
                io.open(p, "w", encoding="utf-8").write(json.dumps(data, ensure_ascii=False, indent=2))
                applied += len(holders)
        if applied: print("  substring-applied (%d) : %s" % (applied, orig[:70].replace("\n", " ")))
        else: still.append(orig)
    return still

def main():
    args = sys.argv[1:]
    hits, option_hits = scan()
    print("text hits (unique strings): %d | option hits: %d" % (len(hits), len(option_hits)))
    lines = ["OPTION HITS - need a redesigned option set, not a rewrite (answer index shown):"]
    for sid, iid, oi, o, ans in option_hits: lines.append("%s/%s option[%d]=%r  answer=%s%s" % (sid, iid, oi, o, ans, "  <-- THE ANSWER ITSELF" if ans == oi else ""))
    for where, field, text in getattr(scan, "answer_check", []):
        lines.append("\nHAD-BEFORE-BLANK (check the blank's answer word before rewriting): %s %s\n   %s" % (field, where, text.replace("\n", "\\n")))
    io.open(MANUAL, "w", encoding="utf-8").write("\n".join(lines))
    print("had-before-blank (manual): %d" % len(getattr(scan, "answer_check", [])))
    OK_JSON = os.path.join(ROOT, "rewrite_pp_ok.json")
    if "--apply-only" in args:
        ok = json.load(io.open(OK_JSON, encoding="utf-8"))
        ovp = os.path.join(ROOT, "rewrite_pp_overrides.json")
        if os.path.exists(ovp):
            ov = json.load(io.open(ovp, encoding="utf-8")); n_ok = 0
            for it in ov.get("items", []):
                orig = scan.by_where.get(it["where"])
                if orig is None: print("override %s: location not found in scan - skipped" % it["where"]); continue
                new = orig; bad = False
                for old_sub, new_sub in it["replace"]:
                    c = new.count(old_sub)
                    if c != 1: print("override %s: %r found %d times - skipped" % (it["where"], old_sub, c)); bad = True; break
                    new = new.replace(old_sub, new_sub, 1)
                if bad: continue
                probs = validate(orig, new)
                if PP_RE.search(new): print("override %s: past perfect still present: %s" % (it["where"], [m.group(0) for m in PP_RE.finditer(new)]))
                if [x for x in probs if x != "past perfect remains"]: print("override %s: validation %s - skipped" % (it["where"], probs)); continue
                ok[orig] = new; n_ok += 1
            print("overrides applied to %d items" % n_ok)
            apply_to_sources.global_subs = ov.get("global", [])
        unmatched = apply_to_sources(ok)
        if unmatched: print("UNMATCHED: %d" % len(unmatched))
        print("NEXT: node build_wa1_practice.js ; python tools\\vocab\\extract_vocab.py en_p3_wa1"); return
    if "--scan" in args:
        for t, h in list(hits.items())[:10]: print(" ", h["field"], h["where"][0], "::", t[:90].replace("\n", " "))
        print("option hits -> rewrite_pp_manual.txt"); return
    limit = int(args[args.index("--limit") + 1]) if "--limit" in args else None
    todo = list(hits.keys())[:limit] if limit else list(hits.keys())
    key = read_key()
    if not key: raise SystemExit("ANTHROPIC_API_KEY not found in .env.local")
    ok, manual = {}, []
    for i in range(0, len(todo), BATCH):
        batch = todo[i:i + BATCH]
        print("batch %d/%d" % (i // BATCH + 1, (len(todo) + BATCH - 1) // BATCH))
        try: out = call_api(key, batch)
        except Exception as ex:
            print("  API error:", str(ex)[:120], "-> retrying one by one")
            out = {}
            for j, orig in enumerate(batch):
                try: one = call_api(key, [orig]); out[j] = one.get(0)
                except Exception as ex2: print("   item %d failed: %s" % (j, str(ex2)[:80]))
                time.sleep(0.5)
        retry = []
        for j, orig in enumerate(batch):
            new = out.get(j); probs = validate(orig, new)
            if not probs: ok[orig] = ascii_norm(new)
            else: retry.append((j, orig, probs))
        if retry:
            time.sleep(1)
            try: out2 = call_api(key, [o for _, o, _ in retry])
            except Exception: out2 = {}
            for k, (j, orig, probs) in enumerate(retry):
                new = out2.get(k); probs2 = validate(orig, new)
                if not probs2: ok[orig] = ascii_norm(new)
                else: manual.append((orig, probs2, hits[orig]))
        time.sleep(0.5)
    # review file
    rl = ["PAST PERFECT REWRITE REVIEW - %d changes, %d manual\n" % (len(ok), len(manual))]
    for orig, new in ok.items():
        h = hits[orig]; rl.append("### %s %s\n- %s\n+ %s\n" % (h["field"], ", ".join(h["where"][:3]), orig.replace("\n", "\\n"), new.replace("\n", "\\n")))
    if manual:
        rl.append("\n### MANUAL (validation failed twice)")
        for orig, probs, h in manual: rl.append("%s %s :: %s\n   %s" % (h["field"], h["where"][0], probs, orig.replace("\n", "\\n")))
    io.open(REVIEW, "w", encoding="utf-8").write("\n".join(rl))
    json.dump(ok, io.open(OK_JSON, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("rewrites ok=%d manual=%d -> rewrite_pp_review.txt (+ rewrite_pp_ok.json for --apply-only)" % (len(ok), len(manual)))
    if "--no-apply" in args: return
    unmatched = apply_to_sources(ok)
    if unmatched:
        print("UNMATCHED in source JSON (not applied): %d -> appended to rewrite_pp_manual.txt" % len(unmatched))
        with io.open(MANUAL, "a", encoding="utf-8") as f:
            f.write("\n\nUNMATCHED (string not found in source JSONs):\n" + "\n".join(u.replace("\n", "\\n") for u in unmatched))
    print("NEXT: node build_wa1_practice.js ; python tools\\vocab\\extract_vocab.py en_p3_wa1")

if __name__ == "__main__":
    main()
