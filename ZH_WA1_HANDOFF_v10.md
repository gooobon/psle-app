# P3 Chinese (华文) HCL WA1 — 작업 이관 문서 (Handoff v10)

작성: 2026-07-10 · Genius Project (psle-app) · **v9를 대체함(supersede). 모든 보고·소통은 한국어로 합니다.**

> ★v9 → v10 정정 (중요)★ v9는 "12/60 강화 완료, 다음 착수 ZS13"으로 적혀 있었으나 **사실과 다름**. 실제로는 **병렬 작업이 ZS13~60을 이미 완료**하여 repo 데이터는 **60/60 전량 완료** 상태이며, 중문 해설도 전 세트가 **3층 구조**로 업그레이드되어 있음. 따라서 **"세트 확장" 작업은 종료**되었고, 남은 것은 화면 검증과 유지보수임.
>
> 또한 이 세션에서 **ExamSession.js 파일 truncation 사고를 발견·복구**했음([6] 참조).

---

## 1. 현재 상태 (실측·검증 완료)

### 데이터: **60/60 완료**
`wa1_zh_complete.json`(repo 루트) 전량 기계검증 **오류 0건**:

| 항목 | 실측 | 목표(60세트) |
|---|---|---|
| mcq sentence_en / hints | 840 / 840 | 840 / 840 |
| match stem_en | 300 | 300 |
| craft tiles | 120 | 120 |
| cloze hint | 300 | 300 |
| reading evidence | 360 | 360 |
| explanation_en | 1920 | 1920 |

검증 통과 항목: tiles.join()==answer · evidence가 지문 substring · 병음 성조기호(숫자 없음) · keywords {w,py,en} 1~3개 · 필수 필드 전부 존재 · **词语搭配 상투구(搭配自然/意思通顺) 0건**.

### 산출물: `src/data/p3/chinese/wa1_practice.ts` — **60/60**, round-trip OK (emit_ts.py로 재생성 가능)

### 렌더러: `src/components/ExamSession.js` — **복구 완료, 문법 정상(esbuild PARSE OK)**

---

## 2. 데이터 규격 (현행 — 렌더러와 짝을 이룸) ★중요★

렌더러가 업그레이드되어 **중문 해설이 3층 구조**를 전제함. `Expl` 컴포넌트가 줄바꿈으로 층을 나눠 렌더하고, 【…】로 시작하는 층은 보라 카드로 강조함.

### 중문 explanation — 3층 (MCQ 14 + 造句 2 + 填空 5 = 세트당 21개)
`\n`으로 구분된 3개 층:
1. **판정** — 왜 정답이 맞는지(부수/뜻/搭配 근거).
2. **오답소거** — 각 오답이 왜 안 되는지 구체적으로(예: 模（木字旁，样子）→模样、模型).
3. **【방법】** — `【…的方法】`로 시작하는 **전이 가능한 규칙**(같은 유형을 다음에 만나면 어떻게 접근할지).

예(ZS13_A1):
```
“愿望”是心里希望做到的事。“愿”下面是“心”，心里的希望，所以用“愿”。
另外三个虽然读音相近，却和“心里的希望”无关：原（本来、原野）→原来、草原；源（三点水，水的源头）→水源、来源；远（走之旁，距离长）→远方、遥远。
【形近字的方法】先找出字里表示意思的那个部件：带“心”的字，多半和心里的想法有关。
```

### 단문 explanation (VocabMatch 5 + Reading 6 = 세트당 11개)
줄바꿈 없는 1단락. Expl이 그대로 1단락으로 렌더(하위호환).

### 영어 explanation_en — **전 유형 1단락 간결 요약** (3층 아님)
설계 의도: 중문 = 완전한 학습 해설, 영어 = 이해 보조용 간결 요약. 60세트 전체가 이 규칙으로 일관됨. **영어를 3층으로 바꾸지 말 것**(현행 일관성 파괴).

### 기타 학습층 필드 (전 세트 완비)
- MCQ: sentence_en(빈칸 `___` 유지) · hints[1](의미기반) · keywords[2~3]{w,py,en}(성조기호)
- VocabMatch: stem_en · 개별화 explanation/explanation_en · keywords[2]
- SentenceCraft: question_en · answer_en · tiles(join==answer)
- PassageCloze: sentence_en · hint · keywords[2]
- Reading: stem_en · answer_en · explanation · keywords · solution.evidence(지문 substring)

### 렌더러 부가 (ExamSession.js)
- `U_MARK`: {u}…{/u} 밑줄어를 굵게+연노랑 배경+두꺼운 밑줄(오프셋)로 표시. 중국어 자형과 밑줄이 겹치지 않게 하려는 의도.
- `Expl`: 위 3층 렌더.

---

## 3. 파일 인벤토리 (repo 안)

### 데이터/파이프라인 (repo 루트)
- `wa1_zh_complete.json` — **source of truth. 60/60 완료.**
- `merge_patch.py` — patch 병합 + 기계검증 (BASE=wa1_zh_complete.json). 확장 종료로 상시 사용은 없으나 부분 수정 시 유용.
- `dump_set.py` — 세트별 base 덤프.
- `emit_ts.py` — json → **src/data/p3/chinese/wa1_practice.ts 직접 재생성**(round-trip 검증 내장). **데이터를 고쳤으면 반드시 실행.**
- `wa1_patches/patch_ZS02~12.json` — 과거 patch 기록(참고).

### 앱
- `src/data/p3/chinese/wa1_practice.ts` — 앱이 읽는 파일(emit 산출).
- `src/components/ExamSession.js` — 학습층 렌더러(U_MARK·Expl 포함).
- `src/components/Dashboard.js`, `src/app/ClaudeApp.js` — 무변경.

### (주의) repo 루트의 `wa1_practice.ts` 는 **DEPRECATED 미사용 잔재**. 앱은 src/data/p3/chinese/ 것만 import. 마운트 제약으로 삭제 못 해 주석만 남겨둠.

---

## 4. 남은 작업 (확장이 아니라 검증·마무리)

1. **빌드 & 화면 검증** (PowerShell 5.x는 `&&` 미지원 → 줄 분리):
   ```powershell
   cd C:\Users\gooob\psle-app
   npm run build
   npm run dev
   ```
2. dev 화면 스팟 확인: 3층 해설이 문단·【방법】 보라카드로 렌더되는지 · {u}…{/u} 하이라이트 · 造句 타일 조립 · 독해 evidence 보라 하이라이트 · Translate 2개 + Key words.
3. (검증파일 있으면) `node zh_wa1_selftest.js` → 27 pass / 0 fail.
4. **미실시 항목(정직 보고)**: ZS13~60 콘텐츠는 **기계검증만 통과**했고, 해설의 질적 스팟감사(힌트 개별성·오답소거 구체성)는 아직 사람이 확인하지 않음. 표본 몇 세트를 눈으로 확인 권장.

---

## 5. 유지보수 절차 (데이터 일부를 고칠 때)

1. `python3 dump_set.py ZSxx` 로 현재 값 확인.
2. `wa1_patches/patch_ZSxx.json` 작성(추가/수정할 필드만).
3. `python3 merge_patch.py wa1_patches/patch_ZSxx.json --dry` → DRY OK 확인 후 --dry 없이 병합.
4. **`python3 emit_ts.py`** 로 ts 재생성(앱 경로에 직접 씀).

> merge_patch.py는 "각 섹션 전 문항에 patch 존재"를 요구하므로, 소수 문항만 고칠 땐 JSON을 직접 수정한 뒤 emit_ts.py만 실행해도 됨.

---

## 6. 사고 기록 — ExamSession.js truncation (재발 방지) ★필독★

- **증상**: `npm run build` 실패 — `./src/components/ExamSession.js:2600:3 Expected '</', got '<eof>'`.
- **원인**: 파일이 JSX 중간(MatchPage props)에서 **잘린 채 저장**됨. 꼬리 40행(나머지 props ~ `export default ExamSessionScreen;`)이 통째로 유실. 앞부분의 신규 작업(U_MARK·Expl)은 정상 기록돼 있었음 → **쓰기 도중 truncation**.
- **복구**: 백업본의 해당 꼬리(2553~2592행)를 이어붙여 복원 → esbuild 파싱 **PARSE OK**. 손상본 백업: `outputs/ExamSession.js.broken.bak`.
- **재발 방지**:
  - 큰 파일은 **부분 편집(Edit/sed)** 을 쓰고, 전체 재작성(open('w') 후 write)은 피할 것. 쓰기 실패 시 파일이 통째로 비거나 잘림. (v7에서 Dashboard.js가 0바이트가 된 전례 있음.)
  - 수정 후 **반드시 문법 검증**: 파서로 파싱하거나 최소한 `tail -3`으로 `export default …` 종료 확인.
  - 큰 편집 전 백업 사본을 남길 것.

---

## 7. 환경 주의 (새 세션에서)

- **폴더 연결**: `C:\Users\gooob\psle-app` 를 세션에 연결(mount)하면 모든 자료가 준비됨. **파일 재첨부 불필요.**
- **경로**: Read/Write/Edit는 Windows 경로. bash는 연결 시 안내되는 마운트 경로(/sessions/<세션>/mnt/psle-app) — 세션마다 다르므로 하드코딩 금지.
- **마운트 제약**: unlink/rename 불가(rm/mv → "Operation not permitted"). 파일은 **제자리 덮어쓰기**로만 갱신. 새 파일 생성은 가능.
- **PowerShell 5.x**: `&&` 미지원 → 명령 줄 분리.

---

## 8. 새 창 첫 메시지 (권장)

> "psle-app 폴더를 연결하고, ZH_WA1_HANDOFF_v10.md 를 읽어. 데이터는 60/60 완료 상태이니 확장하지 말고, 빌드·화면 검증과 ZS13~60 해설 스팟감사부터 해줘."
