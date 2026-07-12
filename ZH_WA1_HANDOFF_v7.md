# P3 Chinese (华文) HCL WA1 — 작업 이관 문서 (Handoff v7)

작성: 2026-07-09 · Genius Project (psle-app) · **이 문서는 새 채팅창에서 중국어 WA1 "해설·학습층 확장(ZS01 패턴 → 60세트)"을 이어가기 위한 유일한 기준(single source of truth)입니다.** 모든 보고·소통은 한국어로 합니다.

> v6 → v7 변경 요약: (1) **ZS02~05의 이전 `explanation_en`을 비판적으로 재검증** → ZS01 수준에 미달(词语搭配가 폐기된 상투구 "搭配自然、意思通顺" 그대로, 학습층 전무, 독해 해설·evidence 전무)로 판정 → **ZS02~05 explanation_en 전량 삭제(110개)**. 이제 **enriched 세트는 ZS01 하나뿐**이며 ZS02~60은 잔재 없이 **처음부터 동일 규칙으로 전량 확장**. (2) v6까지의 내용(대시보드 통합·세션/섹션 메커니즘·ZS01 전 섹션 완전 확장·전면 중국어화·버그 수정)은 그대로 유효.

> [이전 v5→v6 요약] 대시보드 통합(공용 StudentShell/StudentHome, 빨강), 세션 모델(일일=60세트/Mock=기출), ZS01 전 섹션 학습층 완전 확장(=기준 패턴), 화면 전면 중국어화(학습층만 영어), 런타임 버그 수정(getProgress 이중래핑·섹션 네비게이션·#undefined·mojibake).

---

## 0. 새 창에서 가장 먼저 할 일

1. `/mnt/user-data/uploads/`에서 아래 [1. 첨부 파일]이 있는지 확인. 없으면 중단하고 재첨부 요청.
2. 이 문서 전체를 읽고 [3 확장 패턴 명세][4 규칙][5 렌더러 계약]을 이해한 뒤, 현재 상태를 5줄로 요약해 사용자에게 확인받기.
3. 그다음 [7. 다음 작업]으로 진행 — **새 창의 첫 작업은 "ZS01 패턴을 검증하는 생성 스크립트 설계 → ZS02~05 파일럿 → 사용자 확인 → 전체 60세트 확장"**. 추측 금지 — 반드시 실제 파일(wa1_zh_complete.json·ExamSession.js)을 확인한 뒤 판단.

---

## 1. 첨부 파일 (0단계 검증)

### 데이터/파이프라인 (전부 텍스트, 이미지 0개):
1. `ZH_WA1_HANDOFF_v7.md` — 이 문서
2. `wa1_zh_complete.json` — **60세트 최종본. ZS01만 완전 확장(기준). ZS02~60은 학습층 미착수(잔재 없음).** (source of truth)
3. `zh_wa1_schema.ts` — 데이터 스키마
4. `zh_wa1_validate.js` — 검증 권위 (**절대 수정 금지**)
5. `zh_wa1_selftest.js` — 자가테스트 (27 pass / 0 fail)
6. `seed_zh_all.json` — 통합 시드 21개 (참고)

### repo 렌더러/앱 코드 (확장의 렌더 계약 확인용 — 사용자가 로컬에서 첨부):
7. `ExamSession.js` (src/components/) — **학습층 렌더러. [5 렌더러 계약]의 필드를 읽는 최종본.**
8. `ClaudeApp.js` (src/app/) — 앱 본체 (세션/섹션 메커니즘·getProgress 최종본)
9. `Dashboard.js` (src/components/) — 공용 대시보드 (ZH_WA1_SECTIONS 최종본)

### 절대 첨부 금지: 기출/문제집 PDF (이미지 한도, 이미 시드 추출됨).

### 검증 방법(로컬, `C:\Users\gooob\psle-app`):
- `node -e "const d=require('./wa1_zh_complete.json'); console.log(d.length)"` → **60**
- `node zh_wa1_selftest.js` → "RESULT: 27 pass / 0 fail"
- 확장 커버리지 확인: 아래 [6-커버리지] 스크립트.

---

## 2. 프로젝트 컨텍스트

- 앱: Genius Project — 싱가포르 초등 시험 대비 웹앱. Next.js 16(Turbopack)/React/TypeScript/Tailwind, Vercel 배포. repo: gooobon/psle-app.
- 로컬: `C:\Users\gooob\psle-app`. Claude는 로컬을 직접 못 읽음 → 패치/데이터를 `/mnt/user-data/outputs/`로 전달 → 사용자가 덮어쓰고 `npm run build`+`npm run dev`.
- **최종 목적(항상 명심)**: 문제풀이를 통한 **학생 실제 시험 성적 향상**. 모든 설계 판단 기준은 "이게 성적을 올리는가".
- **파일 경로 규칙**: 생성 파일마다 repo-상대 경로 + 로컬 전체경로(`C:\Users\gooob\psle-app\...`) 둘 다 명시. 앱 파일은 `src\...`, 도구/데이터는 repo 루트.
- **화면 데이터 흐름**: 중국어 일일연습 60세트 = `WA1_ZH_PRACTICE`(src/data/p3/chinese/wa1_practice.ts) → `ExamSessionScreen`(src/components/ExamSession.js). 섹션 타입 8종으로 페이지 디스패치.

---

## 3. 확장 패턴 명세 (ZS01 = 기준, 60세트에 동일 적용) ★핵심★

**wa1_zh_complete.json의 각 세트(plan[])의 섹션별로 아래 필드를 "추가"한다. 기존 필드는 보존.** 모든 예시는 실제 ZS01 값.

### 3-A. MCQ 3종 (HanziMcq / PinyinMcq / VocabMcq) — `sec.items[]`의 각 문항
추가 필드:
- `sentence_en` (string): 문제 문장의 정확한 영어 번역. **빈칸은 `___`로 유지.**
  - 예: `"Xiaoming's ___ is to become a doctor when he grows up."`
- `hints` (string[]): **의미 기반 힌트 1개**(배열). 정답/부수(部首)를 직접 노출하지 말고, "어디에 집중하면 유추되는지"를 훈련. 매 문항 서로 다르게.
  - 예: `["The word you need means a strong hope you keep in your heart (a synonym is 'hope'). Which character forms that word with 望?"]`
- `keywords` (obj[]): **핵심단어 2~3개**, 각 `{w, py, en}` (w=중문, py=성조기호 병음, en=영어뜻).
  - 예: `[{"w":"愿望","py":"yuànwàng","en":"a wish"},{"w":"医生","py":"yīshēng","en":"doctor"}]`
- (기존) `explanation`(中文), `explanation_en`(영어 번역) — 이미 있음. 없으면 채움.

### 3-B. VocabMatch (词语搭配) — `sec.items[0].items[]`의 각 행(row)
추가/개선 필드:
- `explanation` (中文): **개별화**. "왜 이 단어가 맞는지(뜻) + 왜 다른 건 안 되는지"까지. **"搭配自然、意思通顺" 같은 똑같은 문구 반복 금지.**
  - 예: `"实现"是让事情变成真的，所以"实现梦想"表示让梦想成真。"坚持、勇敢"不能表示"让梦想变成现实"。`
- `explanation_en` (string): 위 개별 해설의 영어판.
- `stem_en` (string): 그 搭配(collocation)의 정확한 영어 번역(= Translate).
  - 예: `"to make a dream come true"`
- `keywords` (obj[]): 2개 `{w,py,en}` (보통 정답 단어 + stem 단어).

### 3-C. SentenceCraft (造句) — `sec.items[]`의 각 문항
추가 필드:
- `question_en` (string): 문제(무엇을 하라는지 + 두 원문장)의 영어 번역.
- `answer_en` (string): 모범답안(정답 문장)의 정확한 영어 번역.
- `tiles` (string[]): **정답 문장을 의미 단위로 분절, 정답 순서대로.** `tiles.join("") === q.answer` (정확히 일치, 필수).
  - 예(정답 `虽然实现梦想的路很难走，但是小文不打算放弃。`): `["虽然","实现梦想的路很难走，","但是","小文不打算放弃。"]`
- (기존) `explanation`/`explanation_en` — 이미 있음.
- **채점·흐름은 렌더러가 처리**([5-C] 참조). 데이터는 위 필드만 채우면 됨.

### 3-D. PassageCloze (短文填空) — `sec.items[0].blanks[]`의 각 빈칸
추가 필드:
- `sentence_en` (string): **빈칸이 든 문장**의 영어 번역(빈칸은 `___` 유지).
- `hint` (string): **의미 기반·빈칸별 개별 힌트.** 반드시 (a)주변 단서어 지목 + (b)단어 유형(태도/감정/동사/고정표현) 판단 + (c)뱅크에서 어떤 뜻을 고를지 유도. **똑같은 문구 반복 절대 금지.**
  - 예: `"Look at the clue 从不偷懒 (never lazy). The blank describes HOW she practises - an attitude word. Which box word means careful and serious?"`
- `keywords` (obj[]): 2개 `{w,py,en}`.
- (기존) `explanation`/`explanation_en` — 이미 있음.

### 3-E. ReadingMcq / ReadingOpen (阅读理解) — `sec.items[0].questions[]`의 각 질문
추가 필드(**독해엔 기존 flat 해설이 없었음 → 새로 작성**):
- `stem_en` (string): 문제(stem)의 영어 번역.
- `answer_en` (string): 정답의 영어 번역.
- `keywords` (obj[]): 2~3개 `{w,py,en}`.
- `explanation` (中文): **왜 그 답인지 + 왜 각 오답이 틀린지 + 어떻게 접근하는지(주지/세부/근접어 등 유형별)까지 자세히.**
- `explanation_en` (string): 위의 영어판.
- `solution` (obj): `{ evidence: "<지문 속 핵심 문장>" }`.
  - **`evidence`는 반드시 지문(sec.passage)의 실제 substring**이어야 함(렌더러가 지문에서 찾아 하이라이트). 검증 필수.
  - 예: `{"evidence":"小杰从小就有一个愿望——成为一名足球运动员。"}`

---

## 4. 규칙 (사용자 코멘트 + 이번 세션 확정 규칙 — 예외 없이)

1. **문제 부분은 중국어만.** 중국어 시험의 지시문·문제문·선택지·버튼·라벨은 전부 중국어(실제 기출처럼). 렌더러는 이미 `isZh` 조건부로 중국어화됨. **학습층만 영어**: `explanation_en`(EN 해설), Translate 라벨/내용, Key words, hint 내용.
2. **최종 해설에 Translate 2개.** 모든 문제유형에서 (문제 Translate) + (정답 Translate)를 정확히 제공.
3. **핵심단어 2~3개(최소 1~2개) 리스트업.** 정답/오답 모두. 학생이 외우고 갈 수 있게 `{w,py,en}`. 병음은 성조기호(예 xiāng xìn), 숫자 금지.
4. **힌트는 기계적 집중 포인트 훈련.** 똑같은 문장 반복·무의미 힌트 금지. 빈칸/문항마다 의미를 찾아 "어디에 집중하면 정답을 찾는지" 훈련해 유사 유형 대응력을 키운다.
5. **오답 해설 개별화.** 왜 정답인지 + 왜 각 오답이 틀린지. 유형 공통의 상투 문구 금지.
6. **造句 흐름.** 자유 작성 → 채점 → (처음 정답) 해설 / (처음 오답) **정답 문장 타일 클릭 조립** → 확인 → 그래도 오답이면 해설. 최종 해설에 문제/정답 Translate.
7. **독해 evidence.** 정답 핵심 문장을 지문에서 찾아 **보라색 배경+굵게+문제번호 배지**로 표시(렌더러 구현됨). 학생이 다음에도 지문에서 핵심문장을 찾는 패턴을 익히게. evidence는 지문 내 실제 문장.
8. **커리큘럼 범위 P3 1~4과 유지**, WA2급 어휘 오염 금지(검증기가 lesson 1~4 강제). 어휘 등급 적합성 확인.
9. **코드·주석 ASCII-only**(ExamSession.js·ClaudeApp.js는 non-ascii 0 유지; 중국어 UI 문자열은 `\uXXXX` 이스케이프). **데이터 JSON은 실제 중문 UTF-8**(BOM 없이). 중간 저작 JSON도 실제 중문 사용(‐ `\u` JSON 이스케이프는 파싱오류 유발).
10. **검증기(zh_wa1_validate.js) 절대 수정 금지.** 가드 파일 무변경: `dataEngine.js`·`p3PaperBridge.js`·`quizMeta.js`·`ChineseSession.js`.
11. 빌드 통과 ≠ 완료. `npm run build` + dev 실제 화면 검증까지 사용자 확인.
12. **PowerShell/Python 주의**: 다중라인 node -e 는 따옴표 이스케이프 실패 잦음 → Python here-string. **`open(p,'w')`는 여는 즉시 파일을 비우므로, 이모지/서로게이트 쓰기 실패 시 파일이 통째로 날아감** — 이모지·비ASCII를 `encoding='utf-8'`로 직접 쓰지 말 것(이번에 Dashboard.js가 이렇게 0바이트가 됐다가 outputs 백업에서 복구함). BMP만 `\u`로.

---

## 5. 렌더러 계약 (ExamSession.js — 확장 데이터가 어떻게 렌더되는지) ★확장 전 필독★

이번 세션에서 ExamSession.js에 아래를 배선함. **데이터가 이 필드명을 지키면 자동 렌더됨.** (렌더러는 이미 완성 — 60세트 확장 시 렌더러는 건드릴 필요 없음.)

공용 헬퍼(파일 상단):
- `EnExp({en})` — 중문 해설 아래에 점선 구분 후 영어 해설 렌더.
- `KeyWords({list})` — `list`=`[{w,py,en}]`를 "Key words: 단어(병음) — 뜻" 형태로.
- `TransLine({label,text})` — "label: text" (파란색). Translate 표시용.

### 5-A. MCQPage (HanziMcq/PinyinMcq/VocabMcq)
- 제출 후 결과박스(초록/빨강) 안에서 `ExpContent({q})`가 렌더: **Translate(`q.sentence_en`)** + `q.explanation`+`EnExp(q.explanation_en)` + **KeyWords(`q.keywords`)**.
- 처음 오답 시 재시도 힌트 = `q.hints?.[0]`.
- (Translate·Key words는 제출 후 결과박스 "안"에서만 노출.)

### 5-B. MatchPage (VocabMatch)
- 제출 후 각 행 박스: **Translate(`it.stem_en`)** + `it.explanation`+`EnExp(it.explanation_en)` + **KeyWords(`it.keywords`)**.
- (기존 공통 "记搭配…" 반복 줄은 제거됨.)

### 5-C. SynthesisPage (SentenceCraft) — 완전 재작성됨
- 상태: `answers`(타이핑), `built`(타일 클릭 순서), `checked`(타일 확인).
- 채점: `norm(s)` = 공백/문장부호 제거 후 `q.answer`(또는 `q.answerSimple`)와 비교.
- 흐름: 제출 → (처음 정답) `✓ 回答正确!` + ModelBox + ExplBox / (처음 오답 & `q.tiles` 있음) **타일 빌더**(뒤섞인 `q.tiles` 클릭 조립, 清空/确认) → 확인 후 ModelBox + ExplBox(排对了!/还不对).
- ExplBox = **Translate(`q.question_en`) + Translate(`q.answer_en`)** + `q.explanation`+`EnExp` + (있으면)Trap.
- `q.tiles` 없으면 타일 빌더 스킵(모범답안+해설 바로 표시) → 하위호환.

### 5-D. ClozePage (PassageCloze)
- 정답/재시도 해설박스 모두: **TransLine(`b.sentence_en`)** + `b.explanation`+`EnExp(b.explanation_en)` + **KeyWords(`b.keywords`)**.
- 처음 오답 힌트 = `b.hint`(의미기반).

### 5-E. CompPage (ReadingMcq/ReadingOpen)
- 문항 제출 후 `renderLearnBox(q)`: **Translate(question)=`q.stem_en`** + **Translate(answer)=`q.answer_en`** + `q.explanation`+`EnExp(q.explanation_en)` + **KeyWords(`q.keywords`)**.
- 지문 하이라이트 `renderPassageText(activeQuestion)`: `q.solution.evidence`를 **보라(#EDE9FE/#6D28D9) 굵게 + 문제번호 sup 배지**로. `renderEvidenceBox(q)`도 `q.solution.evidence` 사용.
- 문항 탭 시 그 문항의 evidence가 지문에서 강조됨.

### 5-F. 화면 중국어화(i18n)
- 학생 대면 영어 문구는 전부 `isZh` 조건부 중국어화됨(지시문/你的答案/参考答案/确认/完成本节/下一页/提交/查看解析/再想想!提示:/再选一次:/正确答案:/得分:/也可以:/第n空/清除/阅读短文/题目/开头:/要避开的陷阱 등). 영어 시험은 그대로 영어. **확장 시 이 부분은 건드리지 말 것.**

---

## 6. 현재 상태 (커버리지 — 정직 보고)

- **ZS01: 전 섹션 완전 확장 완료 = 유일한 기준 세트**. 14 MCQ·5 match·2 craft·5 cloze·6 reading 전부(`explanation_en` 32개).
- **ZS02~60: 학습층 미착수(잔재 없음).** 이전에 ZS02~05에 넣었던 `explanation_en`(110개)은 **품질 미달로 이번에 전량 삭제**함 → 부분 잔재 없이 균일하게 처음부터 확장.
  - 삭제 근거(비판적 검증): ZS02 词语搭配 해설이 `"向朋友道谢"搭配自然、意思通顺`(=ZS01에서 폐기한 상투·반복구) 그대로, MCQ에 sentence_en/hints/keywords 없음, 阅读理解에 explanation·evidence·stem_en 전무. → **[4 규칙]·[3 명세] 미충족.**
  - base 데이터의 中文 `explanation` 중 일부(특히 match)가 상투구임 → **확장 시 개별화 규칙[4-5]로 반드시 재작성**(단순 번역 금지).
- **품질 바(반례 금지)**: 词语搭配 해설에 "搭配自然/意思通顺" 류 상투구 금지 · 힌트 반복 문구 금지 · 阅读은 explanation+evidence 필수 · 전 문항 Translate 2개+keywords 필수. 하나라도 빠지면 미완성.
- 데이터 무결성: validation PASS · selftest 27/0 · 정답 위치 균등 · duoyinzi 결손 0.

### 6-커버리지 확인 스크립트
```
node -e "const d=require('./wa1_zh_complete.json');let c={mcq_sentence_en:0,mcq_hints:0,match_stem_en:0,craft_tiles:0,cloze_hint:0,reading_evidence:0};for(const z of d)for(const s of z.plan){const t=s.type,it=s.items||[];if(['HanziMcq','PinyinMcq','VocabMcq'].includes(t))for(const q of it){if(q.sentence_en)c.mcq_sentence_en++;if(q.hints)c.mcq_hints++;}if(t==='VocabMatch')for(const b of it)for(const r of(b.items||[]))if(r.stem_en)c.match_stem_en++;if(t==='SentenceCraft')for(const q of it)if(q.tiles)c.craft_tiles++;if(t==='PassageCloze')for(const b of it)for(const x of(b.blanks||[]))if(x.hint)c.cloze_hint++;if(['ReadingMcq','ReadingOpen'].includes(t))for(const b of it)for(const q of(b.questions||[]))if(q.solution&&q.solution.evidence)c.reading_evidence++;}console.log(c)"
```
현재 기대값(ZS01만): `{mcq_sentence_en:14, mcq_hints:14, match_stem_en:5, craft_tiles:2, cloze_hint:5, reading_evidence:6}`. 60세트 완료 시 각 값이 대폭 증가.
- `explanation_en`이 ZS01에만 있는지 확인:
```
node -e "const d=require('./wa1_zh_complete.json');let m={};for(const z of d){let n=0;(function c(o){if(Array.isArray(o))return o.forEach(c);if(o&&typeof o==='object'){if('explanation_en' in o)n++;for(const k in o)c(o[k]);}})(z.plan);if(n)m[z.setId]=n;}console.log(m)"
```
현재 기대값: `{ ZS01: 32 }` (ZS01 외 explanation_en 없음).

---

## 7. 다음 작업 (새 창의 첫 임무 — 60세트 확장)

**콘텐츠(번역·힌트·핵심단어·해설·evidence·tiles)는 문항마다 저작이 필요 → 사용자 환경에서 claude-sonnet-4-6로 생성. (Claude 작업환경엔 API 키 없음.)**

### 7-A. 생성 스크립트 설계 `gen_zh_enrich.js` (사용자 env 실행)
- 입력: `wa1_zh_complete.json`. 세트별·섹션별로 base 문항을 읽어 [3 명세]의 필드를 생성.
- 시스템 프롬프트: [4 규칙] + [3 필드 명세] + **ZS01을 few-shot 예시로 그대로 삽입**(각 섹션 1~2개) + 용어 글로서리(자주 나오는 단어의 병음/영어 고정表). 병음 성조기호 강제.
- 세트 단위 스트리밍·즉시 저장·resume(이미 채워진 문항 skip). API키 env/.env.local, 모델 `claude-sonnet-4-6`.
- **생성 후 기계 검증(스크립트에 내장)**:
  - `tiles.join("")===answer` (craft)
  - `solution.evidence`가 `passage`의 substring (reading)
  - `sentence_en`에 `___` 포함(빈칸 문항)
  - `keywords` 각 원소 `{w,py,en}` 형식·2~3개
  - `explanation`/`explanation_en` 존재·비상투(동일 문자열 중복 검출)
  - 병음에 성조기호(숫자 병음 거부)
  - 실패 문항은 재생성 피드백.
- 출력: `wa1_zh_complete.json` 갱신 → **Part B로 `src/data/p3/chinese/wa1_practice.ts` 재emit**(헤더+`export const WA1_ZH_PRACTICE`+BEGIN/END, `JSON.stringify(data,null,1)`).

### 7-B. 순서 (ZS02~60 균일 확장 — 부분 잔재 없음)
1. **ZS02~05 파일럿** 생성(ZS01 few-shot 기준). Claude가 스팟감사: (a)词语搭配 해설이 개별화됐는지(상투구 금지), (b)힌트 개별성, (c)evidence가 지문 substring, (d)tiles join==answer, (e)전 문항 Translate 2개+keywords, (f)阅读 explanation+evidence 존재, (g)병음 성조기호. → 사용자 화면 확인.
2. 승인되면 **ZS06~60 전량** 생성(밤새 가능, resume). base 中文 해설이 약하면 규칙대로 **재작성**(단순 번역 금지).
3. 전량 후: 커버리지 스크립트 100% + selftest 27/0 + (선택)Part B round-trip + dev 스팟 확인.

### 7-C. 대안(생성 없이): Claude가 세트별로 직접 저작 → JSON 병합. 품질은 높으나 60세트×~30문항이라 다수 왕복 필요. 파일럿 몇 세트는 이 방식으로 품질 기준을 잡고, 대량은 7-A 스크립트 권장.

---

## 8. 이번 세션에서 수정한 버그 (재발 방지 기록)
- **getProgress 이중 래핑**: App→StudentApp→ChineseApp이 각각 `(g,s)=>getProgress(user.id,g,s)`로 감싸 인자가 밀림 → setProgress가 문자열 "Chinese"를 저장, getProgress가 그걸 반환. **수정**: StudentApp이 ChineseApp에 prop을 **직접 전달**(`getProgress={getProgress}`), getProgress는 **비객체 저장값이면 기본값 재생성 + 누락필드 백필**.
- **`#undefined`(Next/SESSION)**: 위 이중래핑 + localStorage의 옛 형태(nextSession 없음). 위 백필로 자동 복구.
- **섹션 네비게이션**: 중국어 칩이 (1)섹션 무시하고 전체 시작, (2)적응형 `ZH_SECTIONS`(BianZi…) 키로 순회해 WA1 타입(HanziMcq…)과 불일치. **수정**: Dashboard에 `ZH_WA1_SECTIONS`/`ZH_WA1_ORDER` 신설(isZh 시 사용), ChineseApp에 영어식 `startSession/recordSection/sectionResults/reviewSection`(+ `sessionSections` 영속) 이식 → 칩 클릭=해당 섹션 진입, 완료=초록✓, 재클릭=기록 리뷰.
- **level undefined 크래시**, **Dashboard mojibake(ftfy 복구)**, **double-wrapped getProgress로 인한 `Cannot create property 'history' on string 'Chinese'`** — 모두 수정 완료.

---

## 9. 파일 인벤토리 (역할)
- 데이터(source of truth): `wa1_zh_complete.json`(60세트+ZS01확장). emit 산출: `src/data/p3/chinese/wa1_practice.ts`.
- 검증 권위(수정 금지): `zh_wa1_validate.js`, `zh_wa1_schema.ts`. 자가테스트: `zh_wa1_selftest.js`(27/0).
- 렌더러: `src/components/ExamSession.js`(학습층·i18n·타일·evidence — 이번 세션 확장 완료), `src/components/Dashboard.js`(공용 대시보드·ZH_WA1_SECTIONS), `src/app/ClaudeApp.js`(세션/섹션 메커니즘·getProgress).
- 폰트: `public/fonts/LXGWWenKai-WA1-subset.woff2`(@font-face in globals.css, family "LXGW WenKai"). ZH_FONT = `'KaiTi','STKaiti','LXGW WenKai',serif`.
- 가드(무변경): `dataEngine.js`·`p3PaperBridge.js`·`quizMeta.js`·`ChineseSession.js`.

## 10. 새 창 첫 메시지 첨부 목록
1. ZH_WA1_HANDOFF_v7.md
2. wa1_zh_complete.json
3. zh_wa1_schema.ts
4. zh_wa1_validate.js
5. zh_wa1_selftest.js
6. ExamSession.js
7. ClaudeApp.js
8. Dashboard.js
9. (선택) seed_zh_all.json

**첨부 금지**: 기출/문제집 PDF.
