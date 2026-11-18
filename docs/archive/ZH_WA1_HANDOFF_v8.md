# P3 Chinese (华文) HCL WA1 — 작업 이관 문서 (Handoff v8)

작성: 2026-07-10 · Genius Project (psle-app) · **이 문서는 새 채팅창에서 중국어 WA1 "해설·학습층 확장(ZS13~60)"을 이어가기 위한 유일한 기준(single source of truth)입니다. 모든 보고·소통은 한국어로 합니다.**

> v7 → v8 변경 요약: (1) **확장 방식 확정 = 7-C 직접 저작.** 이 작업환경(Cowork)은 API 키 없이 Claude가 문항을 직접 저작할 수 있으므로, gen 스크립트 대신 세트별 patch를 직접 작성한다. (2) **병합·검증 파이프라인 신설**(merge_patch.py / dump_set.py / emit_ts.py) — 세트마다 기계검증 후 병합, 잔재 없이 균일 확장. (3) **ZS01(기준) + ZS02~ZS12 = 12/60 세트 강화 완료**(전량 검증 통과, 상투구 0). 다음 착수 = **ZS13**. (4) source of truth 파일이 `wa1_work.json`(= wa1_zh_complete.json, 하드링크 이슈로 개명). v6/v7의 대시보드·세션/섹션·렌더러·i18n·버그수정은 그대로 유효.

---

## 0. 새 창에서 가장 먼저 할 일

1. 아래 [1. 첨부 파일]이 있는지 확인. 없으면 중단하고 재첨부 요청.
2. 이 문서 [3 필드 명세][4 규칙][5 렌더러 계약][6 파이프라인]을 읽고, 커버리지 스크립트로 현재 상태(12/60)를 확인해 5줄로 요약·보고.
3. **첫 작업 = ZS13부터 순서대로 확장.** 세트마다 [6 파이프라인]대로 dump → patch 저작 → dry 검증 → 병합. 추측 금지, 반드시 실제 dump 출력의 필드/정답/지문을 보고 저작.

---

## 1. 첨부 파일 (0단계 검증)

### 데이터/파이프라인 (반드시):
1. `ZH_WA1_HANDOFF_v8.md` — 이 문서
2. `wa1_work.json` — **60세트 최종본. ZS01~ZS12 강화 완료, ZS13~60 미착수(잔재 없음).** (source of truth. 로컬 `wa1_zh_complete.json`과 동일 내용 — 업로드 원본이 읽기전용 하드링크라 개명 저장했을 뿐)
3. `merge_patch.py` — patch 병합 + 기계검증기 (BASE=`wa1_work.json`)
4. `dump_set.py` — 세트별 base 전량 덤프
5. `emit_ts.py` — wa1_practice.ts 재emit (Part B)

### repo 렌더러/앱 코드 (렌더 계약 확인용, 필요 시):
6. `ExamSession.js` (src/components/) — 학습층 렌더러 (v7과 동일, 무변경)
7. `ClaudeApp.js` (src/app/), `Dashboard.js` (src/components/) — v7과 동일

### (선택) v7 문서 — [3 명세]·[5 계약]의 원문 참조용.

### 절대 첨부 금지: 기출/문제집 PDF (이미지 한도, 이미 시드 추출됨).

---

## 2. 프로젝트 컨텍스트

- 앱: Genius Project — 싱가포르 초등 시험 대비 웹앱. Next.js 16(Turbopack)/React/TS/Tailwind, Vercel. repo: gooobon/psle-app, 로컬 `C:\Users\gooob\psle-app`.
- **최종 목적: 문제풀이를 통한 학생 실제 시험 성적 향상.** 모든 판단 기준은 "이게 성적을 올리는가".
- 화면 데이터 흐름: 중국어 일일연습 60세트 = `WA1_ZH_PRACTICE`(src/data/p3/chinese/wa1_practice.ts) → `ExamSessionScreen`(src/components/ExamSession.js). 섹션 8종.
- 파일 배치(로컬): 데이터/도구 = repo 루트, 앱 파일 = `src\...`. `wa1_practice.ts` → `src\data\p3\chinese\wa1_practice.ts`. source of truth JSON → repo 루트(`wa1_zh_complete.json`으로 개명하거나, 파이프라인을 계속 쓰려면 `wa1_work.json` 유지).

---

## 3. 확장 필드 명세 (ZS01 = 기준; 각 세트에 동일 적용) ★핵심★

**base 문항의 기존 필드는 보존하고 아래 필드를 "추가"한다.** 섹션 8종:

### 3-A. MCQ 3종 (HanziMcq / PinyinMcq / VocabMcq) — `sec.items[]`
- `sentence_en` (string): 문제 문장의 정확한 영어 번역. **빈칸 문항은 `___` 유지**(base sentence에 `______`가 있으면 반드시). PinyinMcq는 빈칸이 아니라 밑줄어({u}..{/u})를 괄호로 병기.
- `hints` (string[]): 의미 기반 힌트 1개(배열). 정답/부수를 직접 노출 말고 "어디에 집중하면 유추되는지" 훈련. 매 문항 다르게.
- `keywords` (obj[]): 2~3개, 각 `{w, py, en}`. py=성조기호 병음(숫자 금지).
- `explanation_en` (string): 기존 中文 `explanation`의 영어판.

### 3-B. VocabMatch (词语搭配) — `sec.items[0].items[]`의 각 행(num으로 식별)
- `explanation` (中文): **개별화 재작성**. "왜 이 단어가 맞는지 + 왜 다른 건 안 되는지". **"搭配自然/意思通顺" 상투구 절대 금지**(base 해설은 상투구이므로 반드시 새로 씀).
- `explanation_en` (string): 위 개별 해설의 영어판.
- `stem_en` (string): 그 搭配의 정확한 영어 번역.
- `keywords` (obj[]): 2개 `{w,py,en}`.

### 3-C. SentenceCraft (造句) — `sec.items[]`
- `question_en`, `answer_en` (string): 문제/모범답안 영어 번역.
- `tiles` (string[]): 정답 문장을 의미 단위로 분절, 정답 순서. **`tiles.join("") === q.answer` 정확 일치(필수).** 관련어(虽然/但是/因为/所以/只要/先/再/不但/而且/只有…)는 가급적 독립 타일로.
- `explanation_en` (string): 기존 中文 explanation의 영어판.

### 3-D. PassageCloze (短文填空) — `sec.items[0].blanks[]`의 각 빈칸(num으로 식별)
- `sentence_en` (string): 빈칸 든 문장의 영어 번역(`___` 유지).
- `hint` (string): 의미 기반·빈칸별 개별 힌트(상투구 금지).
- `keywords` (obj[]): 2개.
- `explanation_en` (string): 기존 中文 explanation의 영어판.

### 3-E. ReadingMcq / ReadingOpen (阅读理解) — `sec.items[0].questions[]`의 각 질문(id로 식별)
- `stem_en`, `answer_en` (string): 문제/정답 영어 번역.
- `keywords` (obj[]): 2~3개.
- `explanation` (中文): **신설**. 왜 정답인지 + 왜 각 오답이 틀린지 + 유형별 접근법(细节/推断/主旨/近义词).
- `explanation_en` (string): 위의 영어판.
- `solution` (obj): `{ evidence: "<지문 속 실제 substring>" }`. **evidence는 반드시 `sec.passage`의 실제 부분 문자열**(렌더러가 지문에서 찾아 하이라이트).

> **주의**: 일부 세트는 Reading 문항 id에 접미사가 붙음(예 `ZS10_G1_Q1`, `ZS12_H1_Q1`). dump 출력의 실제 id를 patch reading 키로 쓸 것.

---

## 4. 규칙 (예외 없이)

1. **문제 부분은 중국어만.** 지시문·문제문·선택지·버튼은 중국어(렌더러가 isZh로 처리 완료). **학습층만 영어**: explanation_en, Translate, Key words, hint.
2. **최종 해설에 Translate 2개**: (문제 Translate)+(정답 Translate).
3. **핵심단어 2~3개** `{w,py,en}`, 병음은 성조기호(예 xiāng xìn), 숫자 금지.
4. **힌트는 집중 포인트 훈련.** 반복·무의미 힌트 금지, 문항마다 다르게.
5. **오답 해설 개별화.** 상투구 금지.
6. 造句 흐름·독해 evidence·커리큘럼 P3 1~4과 유지·WA2 어휘 오염 금지(v7 [4] 그대로).
7. 코드/주석 ASCII-only(앱 JS 무변경). **데이터 JSON·patch는 실제 중문 UTF-8**(BOM 없이, `\u` 이스케이프 금지).
8. **검증기·가드 파일 무변경**: `zh_wa1_validate.js`·`zh_wa1_schema.ts`·`dataEngine.js`·`p3PaperBridge.js`·`quizMeta.js`·`ChineseSession.js`. (이번 확장은 데이터 필드 추가만; 렌더러 ExamSession.js도 무변경.)
9. 빌드 통과 ≠ 완료. dev 화면 확인까지.

---

## 5. 렌더러 계약 (ExamSession.js — v7에서 배선 완료, 무변경)

데이터가 [3]의 필드명을 지키면 자동 렌더됨. 요지:
- **MCQPage**: 제출 후 결과박스에 Translate(`q.sentence_en`)+`q.explanation`+EnExp(`q.explanation_en`)+KeyWords(`q.keywords`); 첫 오답 힌트=`q.hints[0]`.
- **MatchPage**: 각 행 Translate(`it.stem_en`)+해설+EnExp+KeyWords.
- **SynthesisPage(造句)**: 오답 시 `q.tiles` 뒤섞어 클릭 조립(join==answer 전제) → ExplBox=Translate(`q.question_en`)+Translate(`q.answer_en`)+해설+EnExp.
- **ClozePage**: TransLine(`b.sentence_en`)+해설+EnExp+KeyWords; 첫 오답 힌트=`b.hint`.
- **CompPage(독해)**: Translate(`q.stem_en`)+Translate(`q.answer_en`)+`q.explanation`+EnExp+KeyWords; 지문 하이라이트=`q.solution.evidence`(보라 배경+굵게+문제번호 배지).

세부는 v7 [5] 참조. **60세트 확장 시 렌더러는 건드릴 필요 없음.**

---

## 6. 파이프라인 (세트당 절차) ★이번 세션 신설★

작업 폴더에 3개 스크립트가 있음. BASE 파일 = `wa1_work.json`.

1. **덤프**: `python3 dump_set.py ZS13` → 그 세트의 전 섹션 base(문항·정답·선택지·해설·지문·질문)를 출력. 이 출력만 보고 저작.
2. **patch 저작**: `patch_ZS13.json` 생성(실제 중문 UTF-8). 구조:
```
{
 "setId": "ZS13",
 "mcq":   { "<itemId>": {sentence_en, hints:[..], keywords:[{w,py,en}..], explanation_en} },
 "match": { "<num>":    {explanation, explanation_en, stem_en, keywords:[..]} },
 "craft": { "<itemId>": {question_en, answer_en, tiles:[..], explanation_en} },
 "cloze": { "<num>":    {sentence_en, hint, keywords:[..], explanation_en} },
 "reading":{ "<qId>":   {stem_en, answer_en, keywords:[..], explanation, explanation_en, solution:{evidence}} }
}
```
   - mcq 키 = 문항 id(ZS13_A1…C5). match/cloze 키 = num("1"~"5"). reading 키 = 질문 id(접미사 포함 주의).
3. **검증**: `python3 merge_patch.py patch_ZS13.json --dry` → "DRY OK" 확인. 실패 시 오류 지목대로 수정.
4. **병합**: `python3 merge_patch.py patch_ZS13.json` → "MERGED + VALIDATED OK".
5. 여러 세트마다 `python3 emit_ts.py` → `wa1_practice.ts` 재생성(round-trip 확인 내장).

### 6-1. 기계검증 항목 (merge_patch.py 내장 — 하나라도 실패 시 병합 거부)
- `tiles.join("") === answer` (craft)
- `solution.evidence`가 `passage`의 substring (reading)
- 병음에 성조기호 존재(숫자 병음 거부)
- `keywords` 각 원소 `{w,py,en}`·1~3개
- MCQ `sentence_en`에 `___` 유지(base sentence에 빈칸 있을 때)
- `explanation`/`explanation_en` 존재·비어있지 않음·상투구(搭配自然/意思通顺) 없음·세트 내 동일 해설 중복 없음
- 각 섹션 전 문항에 patch 존재(누락 시 실패)

---

## 7. 현재 상태 (커버리지 — 정직 보고)

- **강화 완료: ZS01(기준) + ZS02~ZS12 = 12/60.** 전량 검증 통과, 강화 세트 내 상투구 0, .ts round-trip OK.
- **ZS13~60: 미착수(잔재 없음).** base 中文 해설(특히 match)은 상투구이므로 확장 시 [4-5]로 반드시 재작성.
- 커버리지 확인:
```
node -e "const d=require('./wa1_work.json');let c={mcq_sentence_en:0,mcq_hints:0,match_stem_en:0,craft_tiles:0,cloze_hint:0,reading_evidence:0};for(const z of d)for(const s of z.plan){const t=s.type,it=s.items||[];if(['HanziMcq','PinyinMcq','VocabMcq'].includes(t))for(const q of it){if(q.sentence_en)c.mcq_sentence_en++;if(q.hints)c.mcq_hints++;}if(t==='VocabMatch')for(const b of it)for(const r of(b.items||[]))if(r.stem_en)c.match_stem_en++;if(t==='SentenceCraft')for(const q of it)if(q.tiles)c.craft_tiles++;if(t==='PassageCloze')for(const b of it)for(const x of(b.blanks||[]))if(x.hint)c.cloze_hint++;if(['ReadingMcq','ReadingOpen'].includes(t))for(const b of it)for(const q of(b.questions||[]))if(q.solution&&q.solution.evidence)c.reading_evidence++;}console.log(c)"
```
- **현재 기대값(12세트)**: `{mcq_sentence_en:168, mcq_hints:168, match_stem_en:60, craft_tiles:24, cloze_hint:60, reading_evidence:72}`.
- **60세트 완료 목표값**: `{mcq_sentence_en:840, mcq_hints:840, match_stem_en:300, craft_tiles:120, cloze_hint:300, reading_evidence:360}`. explanation_en = 세트당 약 32개.
- 세트당 증가분: sentence_en+14, hints+14, match_stem_en+5, craft_tiles+2, cloze_hint+5, reading_evidence+6.

---

## 8. 다음 작업

1. **ZS13부터 순서대로 ZS60까지** [6 파이프라인]으로 확장(48세트 남음).
2. 매 세트 dry 검증 통과 후 병합. 몇 세트마다 emit_ts.py로 .ts 갱신.
3. 전량 완료 후: 커버리지 100% 확인 → (검증파일 재첨부 시) `node zh_wa1_selftest.js` 27/0 → 최종 emit → 로컬 `npm run build`+dev 화면 스팟 확인.
4. 각 세트 저작 시 스팟감사: (a)词语搭配 개별화(상투구 0), (b)힌트 개별성, (c)evidence substring, (d)tiles join==answer, (e)전 문항 Translate 2개+keywords, (f)阅读 explanation+evidence, (g)병음 성조기호. → merge_patch.py가 대부분 자동 검사하지만, (a)(b)의 "질적 개별화"는 저자가 판단.

---

## 9. 파일 인벤토리 (역할)
- 데이터(source of truth): `wa1_work.json`(=wa1_zh_complete.json). emit 산출: `wa1_practice.ts` → `src/data/p3/chinese/wa1_practice.ts`.
- 파이프라인: `merge_patch.py`(병합+검증), `dump_set.py`(덤프), `emit_ts.py`(재emit).
- 렌더러(무변경): `src/components/ExamSession.js`, `src/components/Dashboard.js`, `src/app/ClaudeApp.js`.
- 검증권위(무변경): `zh_wa1_validate.js`, `zh_wa1_schema.ts`, `zh_wa1_selftest.js`.

## 10. 새 창 첫 메시지 첨부 목록
1. ZH_WA1_HANDOFF_v8.md
2. wa1_work.json
3. merge_patch.py
4. dump_set.py
5. emit_ts.py
6. (선택) ExamSession.js / v7 문서

**첨부 금지**: 기출/문제집 PDF.
