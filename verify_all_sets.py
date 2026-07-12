#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""전 60세트 최종 전수 검증 (merge/build 와 독립된 기준으로 다시 본다)."""
import json, os, re, sys, collections

SRC = os.environ.get("EN_SRC") or os.path.join(os.path.dirname(os.path.abspath(__file__)),
                                               "20260622_WA1_complete.json")
data = json.load(open(SRC, encoding="utf-8"))
FUNC = {"a","an","the","to","of","in","on","at","is","are","was","were","be","not","and","or","as","it","for"}
bad = collections.defaultdict(list)
hint_seen = {}
n_hint = 0

def box_pool(sec):
    wb = sec.get("word_box")
    if isinstance(wb, dict): return wb
    if isinstance(wb, list): return {w: w for w in wb}
    return {}

def ans_word(q, sec):
    wb = sec.get("word_box")
    a = q.get("answer")
    if q.get("options") and a is not None: return str(q["options"].get(str(a), ""))
    if isinstance(wb, dict) and a is not None: return str(wb.get(str(a), a))
    return str(a) if a is not None else ""

for s in data["sets"]:
    sid = s["set_id"]
    for k, sec in (s.get("sections") or {}).items():
        if not isinstance(sec, dict) or k == "G":
            if not isinstance(sec, dict): bad[sid].append(f"{k}: sections 에 문자열 잡키")
            continue
        items = (sec.get("questions") or []) + (sec.get("errors") or [])
        # --- 힌트 ---
        for q in items:
            h = q.get("retry_hint"); qid = q.get("question_id")
            if not h:
                bad[sid].append(f"{qid}: 힌트 없음"); continue
            n_hint += 1
            if len(h) > 260: bad[sid].append(f"{qid}: {len(h)}자")
            if h in hint_seen and hint_seen[h] != qid: bad[sid].append(f"{qid}: 힌트 중복({hint_seen[h]})")
            hint_seen[h] = qid
            ans = q.get("correction") or ans_word(q, sec)
            words = [w for w in re.findall(r"[A-Za-z']+", ans.lower()) if w not in FUNC] or \
                    ([ans.lower()] if ans else [])
            # 정답구 전체는 무조건 금지. 구성 낱말은 '그 낱말이 정답을 식별시킬 때'만 금지한다
            # (보기 4개가 전부 'modern' 을 품고 있으면 modern 을 말해도 정답을 알려주는 게 아니다).
            checks = [ans.lower()] if " " in ans else []
            opts = list((q.get("options") or {}).values())
            for w in words:
                if opts:
                    n_in = sum(1 for o in opts if re.search(r"\b" + re.escape(w) + r"\b", str(o).lower()))
                    if n_in > 1:
                        continue          # 여러 보기에 공통 -> 식별력 없음
                checks.append(w)
            for w in checks:
                if w and re.search(r"\b" + re.escape(w) + r"\b", h.lower()):
                    bad[sid].append(f"{qid}: 힌트가 정답'{ans}'의 '{w}' 노출")
            hay = " ".join([str(q.get("stem","")), str(sec.get("passage","")), str(q.get("instruction","")),
                            str(q.get("sentence1","")), str(q.get("sentence2","")), str(q.get("sentence_a","")),
                            str(q.get("sentence_b","")), str(q.get("starter","")),
                            str(q.get("wrong_word","")), str(q.get("error_word",""))]).lower()
            toks = re.findall(r"[A-Z]{2,}", h) + re.findall(r"'([^']+)'", h)
            if not any(len(t) >= 2 and t.strip().lower() in hay for t in toks):
                bad[sid].append(f"{qid}: 문항 속 단서 인용 없음")
        # --- Cloze 구조 ---
        if k in ("C", "D") and sec.get("word_box"):
            pool = box_pool(sec)
            nb = len(re.findall(r"\(\d+\)_+", sec.get("passage","")))
            qs = sec.get("questions") or []
            if nb != len(qs): bad[sid].append(f"{k}: 빈칸 {nb} != 문항 {len(qs)}")
            used = [q.get("answer") for q in qs]
            if len(set(used)) != len(used): bad[sid].append(f"{k}: 같은 보기를 두 번 사용 {used}")
            for a in used:
                if a not in pool: bad[sid].append(f"{k}: 정답 '{a}' 가 word_box 에 없음")
            uw = {pool[a] for a in used if a in pool}
            if k == "D":
                if len(pool) - len(uw) < 3: bad[sid].append(f"D: 오답 보기 {len(pool)-len(uw)}개 (3개 미만)")
                for w in pool.values():
                    if w not in uw and re.search(r"\b" + re.escape(w.lower()) + r"\b", sec["passage"].lower()):
                        bad[sid].append(f"D: 미사용 오답 '{w}' 가 지문에 노출")
        # --- Editing 밑줄 위치 ---
        if k == "E":
            p = sec.get("passage","")
            for it in items:
                w = it.get("wrong_word") or it.get("error_word") or ""
                marked = f"{w} ({it.get('blank_number')})"
                if marked not in p: bad[sid].append(f"E{it.get('blank_number')}: '{marked}' 마커 없음")
                elif p.index(w) != p.index(marked):
                    bad[sid].append(f"E{it.get('blank_number')}: '{w}' 첫 등장이 밑줄 자리가 아님")
                if w == it.get("correction"): bad[sid].append(f"E{it.get('blank_number')}: 오류=수정")
                # rangers's 류(복수+'s)만 비실재형. it's / boy's 는 실재 오류 유형이라 제외.
                if "s's" in w.lower(): bad[sid].append(f"E{it.get('blank_number')}: 비실재형 '{w}'")
        # --- MCQ 정답이 stem 에 노출 ---
        if k in ("A", "B"):
            for q in items:
                a = ans_word(q, sec)
                stem = str(q.get("stem",""))
                # 부가의문문(", ______ they?")은 설계상 본문 조동사를 되풀이한다 -> 노출이 아니다.
                if re.search(r"_+\s*(they|it|he|she|we|you|i)\s*\?", stem, re.I):
                    continue
                if a and len(a.split()) == 1 and a.lower() not in FUNC and \
                   re.search(r"\b" + re.escape(a.lower()) + r"\b", stem.lower()):
                    bad[sid].append(f"{q['question_id']}: 정답 '{a}' 가 stem 에 노출")
        # --- Synthesis ---
        if k == "F":
            for q in items:
                if not (q.get("sentence1") or q.get("sentence_a")):
                    bad[sid].append(f"{q['question_id']}: 원문 문장 없음")
                if not q.get("model_answer"):
                    bad[sid].append(f"{q['question_id']}: 모범답안 없음")

print(f"힌트 {n_hint}개 검사 · 위반 세트 {len(bad)}개")
for sid in sorted(bad):
    for e in bad[sid]:
        print(f"  {sid} {e}")
sys.exit(1 if bad else 0)
