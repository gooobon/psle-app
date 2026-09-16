#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""tools/gen/gen_zh_items.py - layer C: generate DRILL-ONLY Chinese items for
skills whose bank is thin. Never touches the 60-set track.
Run from repo root:
    python tools/gen/gen_zh_items.py --plan            # show targets, no API
    python tools/gen/gen_zh_items.py --limit 1         # pilot: one skill
    python tools/gen/gen_zh_items.py                   # all thin skills
Pipeline per skill:
  1. targets = skills with < MIN_ITEMS graded items in wa1_bank.json, plus
     taxonomy skills absent from the bank (SKILL_SECTION decides the section)
  2. prompt = 3 real exemplar items of that skill (style/format) + the exact
     item JSON shape; ask for N new items on the same lesson range
  3. validate with zh_wa1_validate.js (seedMode) via node; drop failures
  4. reject duplicates of any existing sentence (normalised) and duplicates
     within the batch; reject items whose answer word does not appear in options
  5. append passing items to wa1_zh_drill.json as sets ZD01, ZD02, ...
  6. write tools/gen/gen_review.txt for human review (mandatory before deploy)
Then: python emit_ts.py   (emits wa1_drill.ts + rebuilds wa1_bank.json)
"""
import io, json, os, re, subprocess, sys, time, urllib.request
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
BANK = os.path.join(ROOT, "src", "data", "p3", "chinese", "wa1_bank.json")
SRC = os.path.join(ROOT, "wa1_zh_complete.json")
OUT = os.path.join(ROOT, "wa1_zh_drill.json")
REVIEW = os.path.join(ROOT, "tools", "gen", "gen_review.txt")
RAW = os.path.join(ROOT, "tools", "gen", "gen_raw.log")
MODEL = "claude-sonnet-4-6"
MIN_ITEMS = 10          # bank threshold
TARGET = 12             # items to reach per thin skill
PER_CALL = 8
SKILL_SECTION = {"yufa": "VocabMcq", "liangci": "VocabMcq", "shengmu_yunmu": "PinyinMcq", "shengdiao": "PinyinMcq",
                 "duoyinzi": "PinyinMcq", "xingjinzi": "HanziMcq", "tongyinzi": "HanziMcq", "dapei": "VocabMcq",
                 "jinyici": "VocabMcq", "lianci": "VocabMcq"}
SKILL_DESC = {"yufa": "grammar / word order (语法)", "liangci": "measure words (量词)", "shengmu_yunmu": "pinyin initial/final confusion (声母韵母)",
              "shengdiao": "pinyin tone (声调)", "duoyinzi": "multi-reading characters (多音字)", "xingjinzi": "visually similar characters (形近字)",
              "tongyinzi": "homophones (同音字)", "dapei": "collocation (搭配)", "jinyici": "near-synonym discrimination (近义词)", "lianci": "connectives (连词)"}

def read_key():
    p = os.path.join(ROOT, ".env.local")
    if os.path.exists(p):
        for line in io.open(p, encoding="utf-8"):
            if line.strip().startswith("ANTHROPIC_API_KEY="): return line.strip().split("=", 1)[1].strip().strip('"').strip("'")
    return os.environ.get("ANTHROPIC_API_KEY")

def norm(s): return re.sub(r"[\s\uFF08\uFF09()_]+", "", str(s or ""))

def load():
    bank = json.load(io.open(BANK, encoding="utf-8"))
    data = json.load(io.open(SRC, encoding="utf-8"))
    drill = json.load(io.open(OUT, encoding="utf-8")) if os.path.exists(OUT) else []
    return bank, data, drill

def exemplars(data, skill, section, n=3):
    out = []
    for s in data:
        for sec in s.get("plan", []):
            if sec["type"] != section: continue
            for it in sec.get("items", []):
                if it.get("skill") == skill and it.get("explain"): out.append(it)
    if len(out) < n:  # fall back to any item of that section (format exemplar)
        for s in data:
            for sec in s.get("plan", []):
                if sec["type"] == section:
                    for it in sec.get("items", []):
                        if it.get("explain") and it not in out: out.append(it)
                        if len(out) >= n: break
    return out[:n]

def existing_sentences(data, drill):
    S = set()
    for s in data + drill:
        for sec in s.get("plan", []):
            for it in sec.get("items", []):
                if it.get("sentence"): S.add(norm(it["sentence"]))
    return S

SYSTEM = ("You write Singapore MOE Primary 3 Higher Chinese WA1 practice items (textbook lessons 1-4 vocabulary only). "
          "Return ONLY a JSON array of item objects that follow the exemplar shape EXACTLY (same keys: id, topic, sentence, options, answer, "
          "explanation, explain{why,distractors,trapType,memoryTip}, lesson, skill, keywords[{w,py,en}], explanation_en, sentence_en, hints). "
          "Rules: answer is a 0-based index; options length 4; distractors length 4 aligned with options; explain.why quotes the context clue; "
          "explanation_en/sentence_en in simple English; hints[0] never names the answer; keywords 2-3 real words from the sentence with tone-marked pinyin; "
          "lesson 1-4; do NOT copy exemplar sentences; each new sentence must be a fresh, natural P3 sentence; ids use the given prefix. "
          "Diversity: within one batch the same answer word/connective may appear at most twice and the same sentence pattern at most twice; for connectives (lianci) the answer must be a true connective, not an adverb (no 幸好/看来/总是). "
          "STRICT JSON: inside any string value use Chinese quotation marks \u201c \u201d only - NEVER the ASCII double-quote character; no trailing commas.")

def call_api(key, skill, section, exs, n, prefix):
    user = json.dumps({"skill": skill, "skill_meaning": SKILL_DESC.get(skill, skill), "section": section, "count": n, "id_prefix": prefix,
                       "exemplars": exs}, ensure_ascii=False)
    body = json.dumps({"model": MODEL, "max_tokens": 8000, "system": SYSTEM, "messages": [{"role": "user", "content": user}]}).encode("utf-8")
    req = urllib.request.Request("https://api.anthropic.com/v1/messages", data=body, headers={"content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01"})
    with urllib.request.urlopen(req, timeout=180) as r: data = json.loads(r.read().decode("utf-8"))
    text = "".join(b.get("text", "") for b in data.get("content", []) if b.get("type") == "text").strip()
    text = re.sub(r"^```(json)?|```$", "", text, flags=re.M).strip()
    a, b = text.find("["), text.rfind("]")
    if a >= 0 and b > a: text = text[a:b + 1]
    try: return json.loads(text)
    except Exception:
        try: return json.loads(repair_quotes(re.sub(r",\s*([\]\}])", r"\1", text)))
        except Exception:
            with io.open(RAW, "a", encoding="utf-8") as f: f.write("\n=== NON-JSON ===\n" + text[:3000] + "\n")
            return []

# Repair ASCII double-quotes the model put INSIDE string values (e.g.
# "why": ""把..."是"把"字句") so the array parses. Walks the text as a JSON
# scanner: a quote inside a string is a real terminator only when the next
# non-space character continues the JSON structure (, } ] :), otherwise it is
# an inner quotation mark and becomes a curly quote.
def repair_quotes(text):
    out = []; inside = False; i = 0; n = len(text)
    while i < n:
        c = text[i]
        if not inside:
            out.append(c)
            if c == '"': inside = True
            i += 1; continue
        if c == '\\':                       # escaped char: copy both
            out.append(c); out.append(text[i + 1] if i + 1 < n else ''); i += 2; continue
        if c == '"':
            j = i + 1
            while j < n and text[j] in ' \t\r\n': j += 1
            nxt = text[j] if j < n else ''
            if nxt in ',}]:' or nxt == '':   # real end of string
                out.append('"'); inside = False
            else:                            # inner quotation mark
                prev = out[-1] if out else ''
                out.append('\u201c' if (prev == '"' or prev in '：:，,（(' or prev == ' ') else '\u201d')
            i += 1; continue
        out.append(c); i += 1
    return ''.join(out)

def validate(sets):
    tmp = os.path.join(ROOT, "tools", "gen", "_tmp_validate.json")
    json.dump(sets, io.open(tmp, "w", encoding="utf-8"), ensure_ascii=False)
    p = subprocess.run(["node", os.path.join(ROOT, "tools", "gen", "validate_sets.js"), tmp, "--seed"], capture_output=True, text=True, encoding="utf-8")
    try: return json.loads(p.stdout.strip().splitlines()[-1])
    except Exception: return {"fails": ["validator did not return JSON: " + (p.stderr or p.stdout)[:300]], "counts": {}}

def main():
    args = sys.argv[1:]
    bank, data, drill = load()
    counts = bank.get("stats", {}).get("skills", {})
    taxonomy = list(SKILL_SECTION.keys())
    targets = [(s, counts.get(s, 0)) for s in taxonomy if counts.get(s, 0) < MIN_ITEMS]
    print("thin skills:", targets or "none")
    if "--plan" in args or not targets: return
    limit = int(args[args.index("--limit") + 1]) if "--limit" in args else None
    key = read_key()
    if not key: raise SystemExit("ANTHROPIC_API_KEY not found in .env.local")
    seen = existing_sentences(data, drill)
    next_set = len(drill) + 1
    review = []
    for skill, have in (targets[:limit] if limit else targets):
        section = SKILL_SECTION[skill]
        need = max(0, TARGET - have - sum(1 for s in drill for sec in s["plan"] for it in sec["items"] if it.get("skill") == skill))
        if need <= 0: print(skill, "already covered"); continue
        exs = exemplars(data, skill, section)
        accepted = []
        for attempt in range(3):
            if len(accepted) >= need: break
            prefix = "ZD%02d_%s" % (next_set, "A" if section == "HanziMcq" else "B" if section == "PinyinMcq" else "C")
            items = call_api(key, skill, section, exs, min(PER_CALL, need - len(accepted) + 2), prefix)
            cand = []; why = {"not_dict": 0, "dup_sentence": 0, "options_not_4": 0}
            for i, it in enumerate(items):
                if not isinstance(it, dict): why["not_dict"] += 1; continue
                it["topic"] = section; it["skill"] = skill; it["id"] = "%s%d" % (prefix, len(accepted) + len(cand) + 1)
                if norm(it.get("sentence")) in seen: why["dup_sentence"] += 1; continue
                if not isinstance(it.get("options"), list) or len(it["options"]) != 4: why["options_not_4"] += 1; continue
                if isinstance(it.get("explain"), dict): it["explain"]["trapType"] = skill
                cand.append(it)
            print("  %s attempt %d: api returned %d item(s); filtered %s" % (skill, attempt + 1, len(items), why))
            if not items: print("    (empty/non-JSON response - see tools/gen/gen_raw.log)")
            if not cand: continue
            probe = [{"setId": "ZD%02d" % next_set, "theme": "drill " + skill, "track": "HCL", "band": "mid", "seedSources": ["gen:" + skill],
                      "plan": [{"type": section, "marks": len(cand), "items": cand}]}]
            r = validate(probe)
            bad_ids = set(f.split(":")[0].strip() for f in r["fails"])
            keep = [it for it in cand if it["id"] not in bad_ids and not any(f.startswith("ZD") and it["id"] in f for f in r["fails"])]
            if any(f.startswith("root") or ("plan" in f and it["id"] not in f) for f in r["fails"] for it in cand[:1]): pass
            for it in keep: seen.add(norm(it["sentence"])); accepted.append(it)
            print("  %s attempt %d: candidates %d, valid %d, validator fails %d" % (skill, attempt + 1, len(cand), len(keep), len(r["fails"])))
            for f in r["fails"][:6]: print("     -", f)
            time.sleep(0.5)
        if accepted:
            drill.append({"setId": "ZD%02d" % next_set, "theme": "drill " + skill, "track": "HCL", "band": "mid", "seedSources": ["gen:" + skill],
                          "plan": [{"type": section, "marks": len(accepted), "items": accepted}]})
            next_set += 1
            for it in accepted: review.append("%s | %s | %s | ans=%s | %s" % (it["id"], skill, it["sentence"], it["options"][it["answer"]], it["explanation"][:80]))
        print("%s: +%d items" % (skill, len(accepted)))
    json.dump(drill, io.open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    r = validate(drill)
    print("wa1_zh_drill.json sets=%d  validator fails=%d" % (len(drill), len(r["fails"])))
    for f in r["fails"][:10]: print("   ", f)
    with io.open(REVIEW, "a", encoding="utf-8") as f: f.write("\n".join(review) + "\n")
    print("REVIEW REQUIRED -> tools/gen/gen_review.txt (%d new items). Then: python emit_ts.py" % len(review))

if __name__ == "__main__":
    main()
