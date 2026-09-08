#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""tools/vocab/gen_vocab_defs.py - build the English learner dictionary from the
extraction queue. Run from repo root:
    python tools/vocab/gen_vocab_defs.py            # process vocab_out/en_missing.json
    python tools/vocab/gen_vocab_defs.py --limit 80 # pilot: first 80 words only
    python tools/vocab/gen_vocab_defs.py --dry      # show batches, no API calls

Reads ANTHROPIC_API_KEY from .env.local (never printed). Uses the same model the
app already uses. Each batch of 40 words -> strict JSON -> validator -> only
PASSING entries are written to src/data/p3/english/en_vocab.json (merged,
resume-safe). Failures are retried once, then listed in vocab_out/en_gen_fail.json
for manual handling. A random sample lands in vocab_out/en_gen_review.txt for
human spot-check BEFORE the dictionary is wired into the app.

Entry shape (mirrors zh_vocab.json roles):
  word : { base, pos, def, ex, syn[], src }
Definition rules (validated, not just prompted):
  - def: 3..14 words, plain P3-level English, no comma-chained lists
  - def must not contain the word, its base, or any 5+ letter prefix of it
  - pos in {noun, verb, adjective, adverb, phrase, idiom, phrasal verb}
  - ex: one sentence 6..18 words, contains the word (or base), simple past or present,
        NO Past Perfect (had + participle), NOT copied from the exam item
  - ASCII only (curly quotes are normalised)
"""
import io, json, os, random, re, sys, time, urllib.request

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
QUEUE = os.path.join(ROOT, "vocab_out", "en_missing.json")
DICT = os.path.join(ROOT, "src", "data", "p3", "english", "en_vocab.json")
FAIL = os.path.join(ROOT, "vocab_out", "en_gen_fail.json")
REVIEW = os.path.join(ROOT, "vocab_out", "en_gen_review.txt")
MODEL = "claude-sonnet-4-6"
BATCH = 25
POS = {"noun", "verb", "adjective", "adverb", "phrase", "idiom", "phrasal verb"}
IRREG_PP = ("been done gone seen given taken eaten written spoken broken known grown thrown flown drawn shown "
            "worn torn chosen frozen stolen forgotten gotten hidden ridden fallen driven risen woken beaten bitten "
            "become come run begun sung rung drunk swum won built bought brought caught taught thought fought sought "
            "felt kept left lost met sent spent slept swept wept meant dealt read said paid laid made heard held told "
            "sold found stood understood sat put cut hit hurt let set shut split spread lit led fed fled slid struck "
            "stuck hung dug spun swung wound bound ground lent bent burnt learnt dreamt smelt spelt spoilt").split()
PP_RE = re.compile(r"\b(had|hadn't|had not)\s+(been\s+|not\s+|just\s+|already\s+|never\s+|ever\s+)?(\w+ed|" + "|".join(IRREG_PP) + r")\b", re.I)

def read_key():
    p = os.path.join(ROOT, ".env.local")
    if not os.path.exists(p): return os.environ.get("ANTHROPIC_API_KEY")
    for line in io.open(p, encoding="utf-8"):
        line = line.strip()
        if line.startswith("ANTHROPIC_API_KEY="):
            return line.split("=", 1)[1].strip().strip('"').strip("'")
    return os.environ.get("ANTHROPIC_API_KEY")

def ascii_norm(s):
    if not isinstance(s, str): return s
    return (s.replace("\u2019", "'").replace("\u2018", "'").replace("\u201c", '"').replace("\u201d", '"')
             .replace("\u2014", "-").replace("\u2013", "-").replace("\u2026", "..."))

SYSTEM = (
"You write a learner dictionary for Singapore Primary 3 students (age 9). "
"Return ONLY a JSON array, no prose, no markdown. One object per input word: "
'{"word":..., "base":..., "pos":..., "def":..., "ex":..., "syn":[...]}. '
"Rules: def = one plain phrase of 3-14 simple words a 9-year-old knows. In the DEF ONLY, never use the word itself, "
"its base form, or any word sharing its first 5 letters; no lists joined by commas. "
"pos = one of noun, verb, adjective, adverb, phrase, idiom, phrasal verb. "
"ex = ONE new sentence of 6-18 words that MUST CONTAIN the exact word (an inflected form such as -s/-ed/-ing "
"or an irregular past form is fine) in a school/family/animal context; "
"simple past or simple present only; NEVER use had + past participle; do not reuse the given exam sentence. "
"syn = 0-2 simpler words with the same meaning (may be empty). Keep everything ASCII."
)

def call_api(key, words, notes=None):
    payload = [{"word": w["word"], "exam_sentence": (w.get("examples") or [None])[0],
                **({"fix": notes[w["word"]]} if notes and w["word"] in notes else {})} for w in words]
    body = json.dumps({"model": MODEL, "max_tokens": 8000, "system": SYSTEM,
                       "messages": [{"role": "user", "content": json.dumps(payload, ensure_ascii=False)}]}).encode("utf-8")
    req = urllib.request.Request("https://api.anthropic.com/v1/messages", data=body, headers={
        "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01"})
    with urllib.request.urlopen(req, timeout=120) as r:
        data = json.loads(r.read().decode("utf-8"))
    text = "".join(b.get("text", "") for b in data.get("content", []) if b.get("type") == "text")
    text = re.sub(r"^```(json)?|```$", "", text.strip(), flags=re.M).strip()
    try:
        return json.loads(text)
    except Exception:
        # recover from truncated / trailing-comma output: keep complete objects only
        fixed = re.sub(r",\s*([\]\}])", r"\1", text)
        try:
            return json.loads(fixed)
        except Exception:
            objs = re.findall(r"\{[^{}]*\}", text)
            out = []
            for o in objs:
                try: out.append(json.loads(o))
                except Exception: pass
            with io.open(os.path.join(ROOT, "vocab_out", "en_gen_raw_fail.log"), "a", encoding="utf-8") as f:
                f.write("\n=== RAW (recovered %d objects) ===\n%s\n" % (len(out), text))
            if not out: raise
            return out

ALIAS = {"example": "ex", "sentence": "ex", "example_sentence": "ex", "definition": "def", "meaning": "def",
         "synonyms": "syn", "part_of_speech": "pos", "lemma": "base"}
IRREG = {"run":["ran","running"],"fall":["fell","fallen"],"give":["gave","given"],"get":["got","gotten"],
         "find":["found"],"take":["took","taken"],"break":["broke","broken"],"come":["came"],"go":["went","gone"],
         "make":["made"],"keep":["kept"],"leave":["left"],"lose":["lost"],"meet":["met"],"send":["sent"],"spend":["spent"],
         "sleep":["slept"],"feel":["felt"],"tell":["told"],"sell":["sold"],"stand":["stood"],"sit":["sat"],"hold":["held"],
         "hear":["heard"],"say":["said"],"pay":["paid"],"lay":["laid"],"buy":["bought"],"bring":["brought"],"catch":["caught"],
         "teach":["taught"],"think":["thought"],"fight":["fought"],"see":["saw","seen"],"eat":["ate","eaten"],"write":["wrote","written"],
         "speak":["spoke","spoken"],"know":["knew","known"],"grow":["grew","grown"],"throw":["threw","thrown"],"fly":["flew","flown"],
         "draw":["drew","drawn"],"show":["showed","shown"],"wear":["wore","worn"],"tear":["tore","torn"],"choose":["chose","chosen"],
         "freeze":["froze","frozen"],"steal":["stole","stolen"],"forget":["forgot","forgotten"],"hide":["hid","hidden"],"ride":["rode","ridden"],
         "drive":["drove","driven"],"rise":["rose","risen"],"wake":["woke","woken"],"beat":["beat","beaten"],"bite":["bit","bitten"],
         "begin":["began","begun"],"sing":["sang","sung"],"ring":["rang","rung"],"drink":["drank","drunk"],"swim":["swam","swum"],
         "win":["won"],"build":["built"],"cut":["cut"],"put":["put"],"hit":["hit"],"hurt":["hurt"],"let":["let"],"set":["set"],
         "shut":["shut"],"light":["lit"],"lead":["led"],"feed":["fed"],"dig":["dug"],"hang":["hung"],"stick":["stuck"],"strike":["struck"],
         "swing":["swung"],"do":["did","done","does"],"have":["had","has"],"be":["was","were","been","is","are"],"shake":["shook","shaken"],"wag":["wagged","wagging"]}
PARTICLES = {"up","down","out","off","on","in","into","over","away","back","through","with","of","for","to","at","about","after","by","a","an","the"}
def forms(x):
    f = {x, x + "s", x + "es", x + "ed", x + "d", x + "ing", x[:-1] + "ing" if x.endswith("e") else x + "ing", x + "er", x + "est"}
    if len(x) > 2 and x[-1] not in "aeiou" and x[-2] in "aeiou": f |= {x + x[-1] + "ed", x + x[-1] + "ing"}
    if x.endswith("y"): f |= {x[:-1] + "ies", x[:-1] + "ied", x[:-1] + "ier", x[:-1] + "iest"}
    f |= set(IRREG.get(x, []))
    return f
def ex_has_word(ex, w, base):
    toks = re.findall(r"[a-z']+", ex.lower())
    tokset = set(toks)
    for cand in {w, base}:
        parts = cand.split()
        content = [p for p in parts if p not in PARTICLES] or parts
        if all(any(fm in tokset for fm in forms(p)) for p in content):
            # multi-word: particles must also be present in order-agnostic form
            if all(p in tokset for p in parts if p in PARTICLES): return True
    return False
def validate(entry, src):
    e = {ALIAS.get(k, k): (ascii_norm(v) if isinstance(v, str) else v) for k, v in (entry or {}).items()}
    w = src["word"]; problems = []
    if str(e.get("word", "")).lower() != w: problems.append("word mismatch")
    base = str(e.get("base", w)).lower().strip() or w
    pos = str(e.get("pos", "")).lower().strip()
    if pos not in POS: problems.append("pos")
    d = str(e.get("def", "")).strip()
    dw = d.split()
    if not (3 <= len(dw) <= 14): problems.append("def length %d" % len(dw))
    if d.count(",") >= 2: problems.append("def list")
    stems = {w, base} | {x[:5] for x in (w.split() + base.split()) if len(x) >= 5}
    dl = d.lower()
    if any((s in dl) for s in stems if len(s) >= 4): problems.append("def contains word")
    ex = str(e.get("ex", "")).strip(); xw = ex.split()
    if not (6 <= len(xw) <= 18): problems.append("ex length %d" % len(xw))
    if not ex_has_word(ex, w, base): problems.append("ex lacks word")
    if PP_RE.search(ex): problems.append("ex past perfect")
    exam = ((src.get("examples") or [None])[0] or "").strip().lower()
    if exam and ex.lower() == exam: problems.append("ex copied")
    if any(ord(ch) > 127 for ch in d + ex): problems.append("non-ascii")
    syn = e.get("syn") or []
    if not isinstance(syn, list): syn = []
    syn = [ascii_norm(str(x)).lower().strip() for x in syn][:2]
    if problems: return None, problems
    return {"base": base, "pos": pos, "def": d, "ex": ex, "syn": syn, "src": src.get("sources") or [src.get("source")]}, []

def main():
    args = sys.argv[1:]
    dry = "--dry" in args
    limit = int(args[args.index("--limit") + 1]) if "--limit" in args else None
    queue = json.load(io.open(QUEUE, encoding="utf-8"))
    have = json.load(io.open(DICT, encoding="utf-8")) if os.path.exists(DICT) else {}
    todo = [w for w in queue if w["word"] not in have]
    if limit: todo = todo[:limit]
    print("queue=%d already=%d todo=%d batches=%d" % (len(queue), len(have), len(todo), (len(todo) + BATCH - 1) // BATCH))
    if dry: return
    key = read_key()
    if todo and not key: raise SystemExit("ANTHROPIC_API_KEY not found in .env.local")
    fails = {}
    notes = {}
    def process(batch, attempt):
        try: out = call_api(key, batch, notes if attempt else None)
        except Exception as ex:
            print("  API/JSON error:", str(ex)[:120]); return batch
        by = {str(o.get("word", "")).lower(): o for o in out if isinstance(o, dict)}
        retry = []
        for src in batch:
            entry, probs = validate(by.get(src["word"]), src)
            if entry: have[src["word"]] = entry
            else:
                if attempt == 0:
                    retry.append(src)
                    notes[src["word"]] = "previous attempt failed: " + "; ".join(probs) + ". The example sentence MUST contain the word itself."
                else:
                    fails[src["word"]] = probs
                    with io.open(os.path.join(ROOT, "vocab_out", "en_gen_raw_fail.log"), "a", encoding="utf-8") as f:
                        f.write("FAIL %s %s :: %s\n" % (src["word"], probs, json.dumps(by.get(src["word"]), ensure_ascii=False)))
        return retry
    for i in range(0, len(todo), BATCH):
        batch = todo[i:i + BATCH]
        print("batch %d/%d (%d words)" % (i // BATCH + 1, (len(todo) + BATCH - 1) // BATCH, len(batch)))
        retry = process(batch, 0)
        if retry:
            print("  retry %d" % len(retry)); time.sleep(1); process(retry, 1)
        os.makedirs(os.path.dirname(DICT), exist_ok=True)
        json.dump(have, io.open(DICT, "w", encoding="utf-8"), ensure_ascii=False, indent=1, sort_keys=True)
        time.sleep(0.5)
    ovp = os.path.join(os.path.dirname(os.path.abspath(__file__)), "en_vocab_overrides.json")
    if os.path.exists(ovp):
        ov = json.load(io.open(ovp, encoding="utf-8")); n = 0
        for w, e in ov.items():
            if w.startswith("_"): continue
            if e is None: have.pop(w, None); fails.pop(w, None); continue   # null = drop this word
            if PP_RE.search(e.get("ex", "")): print("override %s has past perfect - skipped" % w); continue
            have[w] = {"base": e.get("base", w), "pos": e.get("pos", "noun"), "def": e["def"], "ex": e["ex"], "syn": e.get("syn", []), "src": ["override"]}
            fails.pop(w, None); n += 1
        json.dump(have, io.open(DICT, "w", encoding="utf-8"), ensure_ascii=False, indent=1, sort_keys=True)
        print("applied %d overrides" % n)
    json.dump(fails, io.open(FAIL, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    sample = random.sample(sorted(have.keys()), min(40, len(have)))
    lines = ["HUMAN REVIEW SAMPLE (%d of %d). Mark BAD lines and send back.\n" % (len(sample), len(have))]
    for w in sample:
        e = have[w]; lines.append("%s (%s, base=%s)\n  def: %s\n  ex : %s\n  syn: %s\n" % (w, e["pos"], e["base"], e["def"], e["ex"], ", ".join(e["syn"])))
    io.open(REVIEW, "w", encoding="utf-8").write("\n".join(lines))
    print("dictionary entries=%d  failures=%d -> vocab_out/en_gen_fail.json  review -> vocab_out/en_gen_review.txt" % (len(have), len(fails)))

if __name__ == "__main__":
    main()
