# P3 Chinese (华文) HCL WA1 — 작업 이관 문서 (Handoff v9)

작성: 2026-07-10 · Genius Project (psle-app) · **이 문서는 새 채팅창에서 중국어 WA1 "해설·학습층 확장(ZS13~60)"을 이어가기 위한 유일한 기준(single source of truth)입니다. 모든 보고·소통은 한국어로 합니다.**

> v8 → v9 변경 요약 ★중요★: **작업 방식이 "outputs 산출 후 사용자 복사" → "연결폴더(psle-app)에서 직접 작업"으로 바뀜.** 파이프라인이 repo 안에 배선되어 있어 별도 복사·붙여넣기가 필요 없다.
> - source of truth = **`wa1_zh_complete.json`** (repo 루트). 더 이상 `wa1_work.json`이 아님.
> - `emit_ts.py`가 **앱 경로 `src/data/p3/chinese/wa1_practice.ts`에 직접** 재생성(수동 복사 불필요).
> - 파이프라인 3종·patch 감사폴더·문서가 모두 repo 안에 있음.
> - 현재 **ZS01(기준) + ZS02~ZS12 = 12/60 강화 완료**(전량 검증 통과, 상투구 0). 다음 착수 = **ZS13**.
> - v6/v7의 대시보드·세션/섹션·렌더러·i18n·버그수정, v8의 필드명세·규칙·렌더러계약은 그대로 유효.

---

## 0. 새 창에서 가장 먼저 할 일

1. **`psle-app` 폴더를 이 세션에 연결(mount)한다.** (파일을 다시 첨부하지 않는다 — 모든 자료가 repo 안에 있음.) 경로: `C:\Users\gooob\psle-app`.
2. 아래 [1 인벤토리]가 repo에 있는지 확인하고, [7 커버리지] 스크립트로 현재 상태(12/60)를 확인해 5줄로 요약·보고.
3. **첫 작업 = ZS13부터 순서대로 확장.** 세트마다 [6 파이프라인]대로 dump → patch 저작 → dry 검증 → 병합 → (주기적) emit. 추측 금지, 반드시 dump 출력의 실제 필드/정답/지문을 보고 저작.

### 경로 규칙 (도구별로 다름 — 반드시 준수)
- **Read/Write/Edit/Grep/Glob**: Windows 경로 `C:\Users\gooob\psle-app\...` 사용.
- **bash(python 실행)**: 폴더 연결 시 안내되는 마운트 경로(예 `/sessions/<세션명>/mnt/psle-app`) 사용. 세션마다 `<세션명>`이 다르므로 하드코딩 금지 — 연결 응답에 나온 경로를 쓸 것.
- **마운트 제약**: 이 마운트는 unlink/rename(파일 삭제·이동)이 막혀 있음. `rm`/`mv`가 "Operation not permitted"로 실패함. → 파일은 항상 **제자리 덮어쓰기(`cat > file`, `open(p,'w')`, sed -i)** 로 갱신. 새 파일 생성은 가능. (그래서 emit_ts.py도 제자리 쓰기 방식.)

---

## 1. 파일 인벤토리 (repo 안, 모두 배치 완료)

### 데이터/파이프라인 (repo 루트)
- `wa1_zh_complete.json` — **source of truth. 60세트. ZS01~12 강화 완료, ZS13~60 미착수(잔재 없음).** 앱 build/emit의 기준.
- `merge_patch.py` — patch 병합 + 기계검증기. `BASE = wa1_zh_complete.json`. patch 경로를 인자로 받음.
- `dump_set.py` — 세트별 base 전량 덤프. `BASE = wa1_zh_complete.json`.
- `emit_ts.py` — `wa1_zh_complete.json` → **`src/data/p3/chinese/wa1_practice.ts` 직접 재생성**(round-trip 확인 내장).
- `wa1_patches/patch_ZS02.json` ~ `patch_ZS12.json` — 지금까지의 patch 감사기록(참고용 예시). 신규 patch도 여기에 저장 권장.

### 앱/렌더러 (무변경, 참조용)
- `src/data/p3/chinese/wa1_practice.ts` — 앱이 실제 읽는 파일(emit 산출).
- `src/components/ExamSession.js` — 학습층 렌더러(v7에서 배선 완료).
- `src/components/Dashboard.js`, `src/app/ClaudeApp.js` — 무변경.

### 참고 문서 (repo 루트)
- `ZH_WA1_HANDOFF_v9.md`(이 문서), `RESUME_STATE.md`(간단 재개 메모), `ZH_WA1_HANDOFF_v7.md`(원 명세 원문).

### (주의) `wa1_practice.ts`가 repo 루트에도 있으나 **DEPRECATED(미사용)**. 앱은 `src/data/p3/chinese/wa1_practice.ts`만 import함. 마운트 unlink 제약으로 삭제 못 해 주석 처리만 해둠 — 무시할 것.

### 절대 첨부/생성 금지: 기출/문제집 PDF (이미지 한도, 이미 시드 추출됨).

---

## 2. 프로젝트 컨텍스트

- 앱: Genius Project — 싱가포르 초등 시험 대비 웹앱. Next.js 16(Turbopack)/React/TS/Tailwind, Vercel. repo: gooobon/psle-app, 로컬 `C:\Users\gooob\psle-app`.
- **최종 목적: 문제풀이를 통한 학생 실제 시험 성적 향상.** 모든 판단 기준은 "이게 성적을 올리는가".
- 화면 데이터 흐름: 중국어 일일연습 60세트 = `WA1_ZH_PRACTICE`(src/data/p3/chinese/wa1_practice.ts) → `ExamSessionScreen`(src/components/ExamSession.js). 섹션 8종.
- 빌드/미리보기(PowerShell 5.x는 `&&` 미지원 → 줄 분리):
  ```powershell
  cd C:\Users\gooob\psle-app
  npm run build
  npm run dev
  ```

---

## 3. 확장 필드 명세 (ZS01 = 기준; 각 세트에 동일 적용) ★핵심★

**base 문항의 기존 필드는 보존하고 아래 필드를 "추가"한다.** 섹션 8종:

### 3-A. MCQ 3종 (HanziMcq / PinyinMcq / VocabMcq) — `sec.items[]`
- `sentence_en` (string): 문장의 정확한 영어 번역. **빈칸 문항은 `___` 유지**(base sentence에 `______`가 있으면 필수). PinyinMcq는 빈칸이 아니라 밑줄어({u}..{/u})를 괄호로 병기.
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
- `tiles` (string[]): 정답 문장을 의미 단위로 분절, 정답 순서. **`tiles.join("") === q.answer` 정확 일치(필수).** 관련어(虽然/但是/因为/所以/只要/就/先/再/不但/而且/只有…)는 가급적 독립 타일로.
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
- `solution` (obj): `{ evidence: "<지문 속 실제 substring>" }`. **evidence는 반드시 `sec.passage`의 실제 부분 문자열.**

> **주의**: 일부 세트는 Reading 문항 id에 접미사가 붙음(예 `ZS10_G1_Q1`, `ZS12_H1_Q1`). dump 출력의 실제 id를 patch reading 키로 쓸 것. (참고로 base 데이터에 드물게 오류가 있을 수 있음 — 예: ZS12_H1 fill_word의 밑줄 표기 불일치. 이럴 땐 정답 필드에 맞게 해설을 논리적으로 정합하게 작성.)

---

## 4. 규칙 (예외 없이)

1. **문제 부분은 중국어만.** 지시문·문제문·선택지·버튼은 중국어(렌더러가 isZh로 처리 완료). **학습층만 영어**: explanation_en, Translate, Key words, hint.
2. **최종 해설에 Translate 2개**: (문제 Translate)+(정답 Translate).
3. **핵심단어 2~3개** `{w,py,en}`, 병음은 성조기호(예 xiāng xìn), 숫자 금지.
4. **힌트는 집중 포인트 훈련.** 반복·무의미 힌트 금지, 문항마다 다르게.
5. **오답 해설 개별화.** 상투구 금지.
6. 造句 흐름·독해 evidence·커리큘럼 P3 1~4과 유지·WA2 어휘 오염 금지(v7 [4] 그대로).
7. 코드/주석 ASCII-only(앱 JS 무변경). **데이터 JSON·patch는 실제 중문 UTF-8**(BOM 없이, `\u` 이스케이프 금지).
8. **검증기·가드 파일 무변경**: `zh_wa1_validate.js`·`zh_wa1_schema.ts`·`dataEngine.js`·`p3PaperBridge.js`·`quizMeta.js`·`ChineseSession.js`. 렌더러 `ExamSession.js`도 무변경(이번 확장은 데이터 필드 추가만).
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

## 6. 파이프라인 (세트당 절차 — 연결폴더에서 직접) ★핵심★

bash에서 마운트 경로로 이동해 실행(모든 스크립트는 repo 루트, BASE=`wa1_zh_complete.json`):

1. **덤프**: `python3 dump_set.py ZS13` → 그 세트 전 섹션 base(문항·정답·선택지·해설·지문·질문) 출력. 이것만 보고 저작.
2. **patch 저작**: `wa1_patches/patch_ZS13.json` 생성(실제 중문 UTF-8). 구조:
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
3. **검증**: `python3 merge_patch.py wa1_patches/patch_ZS13.json --dry` → "DRY OK" 확인. 실패 시 오류 지목대로 수정.
4. **병합**: `python3 merge_patch.py wa1_patches/patch_ZS13.json` → "MERGED + VALIDATED OK" (wa1_zh_complete.json 갱신).
5. **emit(주기적, 몇 세트마다)**: `python3 emit_ts.py` → `src/data/p3/chinese/wa1_practice.ts` **직접 갱신**(복사 불필요, round-trip 확인 내장).

### 6-1. 기계검증 항목 (merge_patch.py 내장 — 하나라도 실패 시 병합 거부)
- `tiles.join("") === answer` (craft)
- `solution.evidence`가 `passage`의 substring (reading)
- 병음에 성조기호 존재(숫자 병음 거부)
- `keywords` 각 원소 `{w,py,en}`·1~3개
- MCQ `sentence_en`에 `___` 유지(base sentence에 빈칸 있을 때)
- `explanation`/`explanation_en` 존재·비어있지 않음·상투구(搭配自然/意思通顺) 없음·세트 내 동일 해설 중복 없음
- 각 섹션 전 문항에 patch 존재(누락 시 실패)

> 기계검증이 대부분 잡지만, **(a)词语搭配 개별화의 질, (b)힌트의 의미적 개별성**은 저자가 직접 판단해야 함(단순 통과 ≠ 좋은 해설).

---

## 7. 현재 상태 (정직 보고)

- **강화 완료: ZS01(기준) + ZS02~ZS12 = 12/60.** 전량 검증 통과, 상투구 0, .ts round-trip OK.
- **ZS13~60: 미착수(잔재 없음).** base 中文 해설(특히 match)은 상투구이므로 확장 시 [4-5]로 반드시 재작성.
- 커버리지 확인(bash, 마운트 경로에서):
```
node -e "const d=require('./wa1_zh_complete.json');let c={mcq_sentence_en:0,mcq_hints:0,match_stem_en:0,craft_tiles:0,cloze_hint:0,reading_evidence:0};for(const z of d)for(const s of z.plan){const t=s.type,it=s.items||[];if(['HanziMcq','PinyinMcq','VocabMcq'].includes(t))for(const q of it){if(q.sentence_en)c.mcq_sentence_en++;if(q.hints)c.mcq_hints++;}if(t==='VocabMatch')for(const b of it)for(const r of(b.items||[]))if(r.stem_en)c.match_stem_en++;if(t==='SentenceCraft')for(const q of it)if(q.tiles)c.craft_tiles++;if(t==='PassageCloze')for(const b of it)for(const x of(b.blanks||[]))if(x.hint)c.cloze_hint++;if(['ReadingMcq','ReadingOpen'].includes(t))for(const b of it)for(const q of(b.questions||[]))if(q.solution&&q.solution.evidence)c.reading_evidence++;}console.log(c)"
```
- **현재 기대값(12세트)**: `{mcq_sentence_en:168, mcq_hints:168, match_stem_en:60, craft_tiles:24, cloze_hint:60, reading_evidence:72}`.
- **60세트 완료 목표값**: `{mcq_sentence_en:840, mcq_hints:840, match_stem_en:300, craft_tiles:120, cloze_hint:300, reading_evidence:360}`. explanation_en = 세트당 약 32개.
- 세트당 증가분: sentence_en+14, hints+14, match_stem_en+5, craft_tiles+2, cloze_hint+5, reading_evidence+6.

---

## 8. 다음 작업

1. **ZS13부터 ZS60까지** [6 파이프라인]으로 순서대로 확장(48세트 남음).
2. 매 세트 dry 통과 후 병합. 몇 세트마다 `emit_ts.py`(앱 경로 직접 갱신).
3. 전량 완료 후: 커버리지 100% → (검증파일 있으면) `node zh_wa1_selftest.js` 27/0 → 최종 emit → `npm run build`+dev 화면 스팟 확인.
4. 진행분은 `wa1_zh_complete.json`에 영속 → 중단·재개 안전. 재개 시 [7 커버리지]로 다음 착수 세트 파악(마지막 강화 세트+1).

---

## 9. 새 창 첫 메시지 (권장 문구)

> "psle-app 폴더를 연결하고, ZH_WA1_HANDOFF_v9.md 대로 ZS13부터 이어서 확장 진행해. 커버리지로 현재 상태부터 확인해줘."

**파일 재첨부 불필요** — 폴더만 연결하면 모든 자료(데이터·파이프라인·문서)가 repo 안에 있음.
