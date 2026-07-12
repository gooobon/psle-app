# P3 Chinese (华文) HCL WA1 — 작업 이관 문서 (Handoff v4)

작성: 2026-07-08 · Genius Project (psle-app) · **이 문서는 새 채팅창에서 중국어 WA1을 이어가기 위한 유일한 기준(single source of truth)입니다.** 모든 보고·소통은 한국어로 합니다.

> v3 → v4 변경 요약: (1) SAP 문제집 시드 5건 추가로 **시드 21개** 확정, (2) `check_seed.js`/`build_seed_all.js`에 **ReadingOpen emit 갭 수정**, (3) 병목 liangci·duoyinzi **0→각 5** 해소, (4) **Step 3 생성기(3중 QA) 구축 완료** 및 **60세트 생성+전수 감사+치명결함 수정 완료**, (5) 렌더러용 `wa1_practice.ts` emit 완료. 이제 **duoyinzi 결손 7세트 보강 → Step 4(렌더러 배선)** 단계.

---

## 0. 이 문서의 사용법 (새 창에서 가장 먼저 할 일)

1. `/mnt/user-data/uploads/`에서 아래 [1. 첨부 파일]의 파일들이 있는지 확인. 하나라도 없으면 작업 중단하고 재첨부 요청.
2. 이 문서 전체 + [2 컨텍스트][3 진행상황][7 다음 작업]을 읽고, 이해한 현재 상태를 5줄로 요약해 사용자에게 확인받기.
3. 그다음 [7. 다음 작업]으로 진행 — **새 창의 첫 작업은 "duoyinzi 결손 7세트 보강 (재태깅 or 표적 재생성) + Cursor 병렬 결과와 비교·병합"**입니다. 추측 금지 — 반드시 실제 파일을 확인한 뒤 판단.

---

## 1. 첨부 파일 (0단계 검증)

### 필수(작업 핵심 — 전부 텍스트, 이미지 0개):
1. `ZH_WA1_HANDOFF_v4.md` — 이 문서
2. `seed_zh_all.json` — **확정 통합 시드 (21개)**. 가장 중요한 자산. 절대 처음부터 다시 만들지 말고 여기에 이어붙임.
3. `zh_wa1_schema.ts` — 데이터 스키마
4. `zh_wa1_validate.js` — **검증 모듈 (단일 검증 권위. 절대 생성기 편의로 수정하지 말 것 — selftest 27개가 걸린 공유 자산)**
5. `zh_wa1_selftest.js` — 자가테스트 (**27 pass / 0 fail** 나와야 함)
6. `build_seed_all.js` — 시드 통합·검증 빌더 (**ReadingOpen 지원 포함된 v4판**)
7. `check_seed.js` — 단일 시드 검증 (**ReadingOpen 지원 포함된 v4판**)
8. `generate_wa1_zh.js` — **Step 3 생성기 (Part A). 3중 QA(postCheck+reviewer+검증기) 탑재 최종판**
9. `build_wa1_practice_zh.js` — **변환·emit·라운드트립 검증기 (Part B)**
10. `wa1_zh_complete.json` — **감사·수정 완료된 60세트 (ZS01~ZS60). 최종본**
11. `add_sap_to_all.js` — (참고) SAP 시드 안전 병합 스크립트

### 이번 세션에서 만들 것(사용자 준비):
- **Cursor에서 생성한 duoyinzi 보강 세트** (아래 [7-A] 비교·병합 대상). 형식은 우리 `wa1_zh_complete.json`의 세트 객체와 동일해야 함.

### 절대 첨부하지 말 것(이미지 한도):
- 원본 기출/문제집 PDF들 — 이미 시드로 추출 완료. 재첨부 금지.

### 검증 방법(로컬, `C:\Users\gooob\psle-app`):
- `node zh_wa1_selftest.js` → "RESULT: 27 pass / 0 fail"
- `node -e "const d=require('./seed_zh_all.json'); console.log(d.seeds.length)"` → **21**
- `node -e "const d=require('./wa1_zh_complete.json'); console.log(d.length)"` → **60**
- `node build_wa1_practice_zh.js --in wa1_zh_complete.json --expect 60` → pre-emit PASS → round-trip PASS

---

## 2. 프로젝트 컨텍스트

- 앱: Genius Project — 싱가포르 초등 시험 대비 웹앱. Next.js / React / TypeScript / Tailwind, Vercel 배포 (psle-app-vwx3.vercel.app)
- repo: gooobon/psle-app (public, main). `raw.githubusercontent.com/gooobon/psle-app/main/<path>` 로 fetch 가능
- 로컬: `C:\Users\gooob\psle-app`. Claude는 로컬을 직접 못 읽음 → 패치/생성 스크립트를 `/mnt/user-data/outputs/`로 전달 → 사용자가 실행
- **최종 목적(항상 명심)**: 문제풀이를 통한 **학생 실제 시험 성적 향상**. 모든 설계 판단 기준은 "이게 성적을 올리는가". (그래서 이번 감사에서 정답 위치 편향을 최우선으로 잡음 — 아래 [3-감사] 참조)
- 커리큘럼: **P3 HCL WA1 = 1~4과 범위**. 검증기가 lesson 1~4 강제로 WA2급 어휘 오염 차단.

### 영어 파이프라인(중국어 Part B의 참조 원본)
- `build_wa1_practice.js`(repo 루트)는 생성기가 아니라 **변환·emit·라운드트립 검증기**. 중국어 `build_wa1_practice_zh.js`가 이를 동형으로 구현하되 **우리 `zh_wa1_validate.js`를 재사용**(재구현 금지).
- 렌더러 `src/components/ExamSession.js`: MCQPage/ClozePage/CompPage/SynthesisPage. 데이터엔 UI 스타일 0개(순수 텍스트).

---

## 3. 현재 진행 상황 (Step 로드맵)

| Step | 내용 | 상태 |
|---|---|---|
| Step 0 | 파일 검증·기출/문제집 분석·설계결정 | 완료 |
| Step 1 | 스키마+검증모듈+자가테스트 | 완료 |
| Step 2 | 기출/문제집→시드 추출 (21개, 병목 해소) | **완료** |
| Step 3 | 60세트 생성기 + 생성 + 전수 감사 + emit | **완료** |
| Step 3.5 | duoyinzi 결손 7세트 보강 (+ Cursor 병렬 병합) | **← 지금 여기** |
| Step 4 | 렌더러 배선 (MCQ/Cloze/Comp 재사용 + Match/SentenceCraft 신규 + 楷体) | 대기 |
| Step 5 | 앱 배선 (대시보드 Chinese WA1 라이브) | 대기 |
| Step 6 | 전수 검증→배포→프로덕션 확인 | 대기 |

### 3-시드: seed_zh_all.json (21개)
- 기출/문제집 16개교 + SAP 3A 문제집 5건(`sap_p3a_L1`~`L4` + `sap_p3a_bottleneck`).
- **병목 커버리지**: liangci 5 · duoyinzi 5 · lianci 4 · shengdiao 3 (모두 닫힘). 함정 분포: dapei 61 · vocab_in_context 60 · xingjinzi 46 · tongyinzi 18 · jinyici 15 · shengmu_yunmu 11.
- SAP 시드 규약(중요): 각 과 認識字詞에서 (a)직접추출 3섹션(短文填空→PassageCloze, 词语搭配→VocabMatch, 阅读理解→ReadingOpen) + (b)MCQ변환 2섹션(错字改正→HanziMcq 오자를 distractor로, 词语替换/填写词语→VocabMcq). L4 错字改正 Q3은 스캔 오독으로 원본 오자 대신 표준 동음 distractor 사용(시드에 기록).

### 3-생성기: generate_wa1_zh.js (Part A) — 3중 QA 아키텍처
디버깅 이력에서 확정된 필수 요소들(전부 검증 완료):
1. **스트리밍(SSE)** + 3초마다 누적 글자 수 표시 (비스트리밍은 5분 타임아웃·무출력 대기 문제).
2. **repairInnerQuotes**: 모델이 해설에 ASCII 따옴표(`"`)를 쓰면 JSON이 깨짐 → 문자열 내부 ASCII 따옴표를 전각 `“ ”`로 자동 교정 후 재파싱. 프롬프트 규칙에도 금지 명시.
3. **normalizeSet + preflightShape**: `items`가 배열 아닌 단일 객체면 자동 배열 래핑, 그 외 형태 오류는 검증기 크래시 대신 재시도 피드백으로 전환.
4. **postCheck**(기계 검출): 옵션 중복 · {u}마커 무결성 · 양사 오태깅 · **✓위치=answer 인덱스 정합** · 해설 혼잣말 패턴(等等，/重新看/不对，) · match stem 이중 빈칸. → 검증기 실패와 합산해 재시도.
5. **reviewer(critic) 패스**: 검증 통과 후 두 번째 API 호출로 **의미 심사**(복수정답·정답키·자연성·어휘수준·클로즈 유일성·여분단어 비적합·병음 사전 대조·match 세트 포함) → `pass`/문항별 `fix`(자동 적용 후 재검증)/`regenerate`. `--no-review`로 끔.
6. resume(있는 setId skip), 밴드 자동(S01-20易/21-40中/41-60难), 테마 12종 로테이션, API키 env/.env.local, 모델 claude-sonnet-4-6.
- 실행: `node generate_wa1_zh.js --from N --to M --attempts 6`. 크레딧 소진 시 충전 후 같은 명령 재실행하면 이어감.

### 3-감사: 60세트 전수 배치 감사 (완료) — wa1_zh_complete.json은 감사·수정본
스크립트 전수 스캔 + 840 MCQ/300 cloze/302 match/240 reading 육안 판독 후 **치명 결함을 수정**:
- **[치명] 정답 위치 편향**: index 0에 551개(66%)로 몰려 있어 "무조건 A 찍기"로 66% 득점 가능 → 서비스 핵심 목적 무력화. **결정적 재배치로 완벽 균등화(각 위치 210개=25%)**. ✓/해설/오답설명 모두 정답과 함께 이동.
- **[치명] 병음 정답키 8건 교정**: 答应 dā **yìng**(ZS14_B2·ZS26_B1·ZS50_B2), 亲切 qīn **qiè**(ZS38_B1), 难过 nán **guò**(ZS50_B1), 教导 jiào **dǎo**(ZS50_B3), 好奇 **hào** qí(ZS16_B4·ZS43_B4, skill→duoyinzi 정정).
- **[구조] 규칙 정규화**: ZS47·ZS55 매칭 6문항→5문항+여분1(marks 5), ZS22 클로즈 여분 추가, ZS15 클로즈 여분 伴侣→生气.
- 결과: validation PASS · postCheck CLEAN · selftest 27/0 · Part B round-trip PASS. 카운트 mcq840·match300·cloze300·compAuto240·open120·craft120.

### 3-잔여 이슈 (정직한 보고 — 자동수정 안 함)
- **중복(사용자 결정: 스킵)**: 완전 동일 MCQ 문장 9쌍(ZS20_A1=ZS08_A1 등), craft 답 3쌍, match stem ~40쌍(상투 collocation). → 이번엔 **넘어감**. 향후 다양성 업데이트 대상.
- **duoyinzi 결손 7세트(이번에 보강)**: **ZS06·ZS14·ZS15·ZS24·ZS39·ZS47·ZS49**에 duoyinzi 태그 문항 0. 단, ZS14 答应·ZS15 好朋友·ZS49 长大는 실제로 다음자 단어인데 shengdiao/shengmu로 **오태깅**된 것 → 재태깅만으로도 해결 가능.
- 소수 경계 문항: ZS35_A4 `被湿了`(被 뒤 동사 없음), ZS46 蜥蜴/蜕皮·ZS57 惭愧(hard 밴드치고 상급). → 치명 아님, 후행.

---

## 4. 확정된 설계 결정 (변경 시에만 재논의)

1. **표준 8섹션 골격**: HanziMcq(5)→PinyinMcq(4)→VocabMcq(5,mcq4)→VocabMatch(pool6/items5)→SentenceCraft(2,combine)→PassageCloze(5빈칸/뱅크6)→ReadingMcq(3)→ReadingOpen(fill_word1+open_sentence2). 세트당 자동채점 mcq14·match5·cloze5·compAuto4·open2·craft2.
2. **난이도 밴드**: S01-20易/21-40中/41-60难 (정적 필드 아님, bandHint 메타만; 런타임 GeniusAdaptiveEngine이 계산).
3. **폰트 = 楷体 계열**: `'KaiTi','STKaiti','LXGW WenKai',serif`. LXGW WenKai(OFL) 웹폰트 폴백. (Step 4에서 적용)
4. **트랙 = HCL 단일**.
5. **병음 표기 = 성조 기호**(xiāng xìn), 숫자 아님.
6. **해설 = ZhExplain**(why/distractors[옵션수 동일, ✓正确答案 at answer index]/trapType(15 SKILLS)/memoryTip). answerKey = answer0+1.
7. **ReadingOpen**: 검증기는 지원했으나 시드 빌더가 emit 안 하던 갭을 v4에서 수정(순수 additive). fill_word 정답은 지문 내 존재 강제, open_sentence는 모범답안.
8. **세트당 liangci≥1·duoyinzi≥1** (생성 프롬프트 규칙 + 감사 점검).

## 4-1. 작업 규칙 (예외 없이)
1. 모든 보고·소통은 한국어.
2. 추측 금지 — repo/시드/JSON을 실제 확인 후에만 판단.
3. 코드 수정은 **완전 파일 교체본** 또는 원자적 patch로 `/mnt/user-data/outputs/`에 저장→사용자 로컬 실행. (병렬 편집 시 완전 교체본 선호)
4. 빌드 통과 ≠ 완료. 사용자가 실제 화면 검증까지 해야 완료.
5. 근본원인 수정 — 우회/땜질 금지. 패치 전 전체 스캔.
6. **코드·주석 ASCII-only** (문항 콘텐츠의 중문·병음·해설은 예외). 검증: `grep -cP '[^\x00-\x7F]' file.js` == 0.
7. **검증기(zh_wa1_validate.js)는 절대 생성기 편의로 수정 금지**. 방어는 생성기(postCheck/normalize) 쪽에서.
8. **다른 창(Cursor 포함)과 병렬 작업 주의**: 공유 파일은 최신 업로드본을 base로, 완전 교체본으로. seed_zh_all.json은 `add_sap_to_all.js`처럼 기존 보존+append 방식.
9. 이미지 뷰어가 스캔 PDF를 못 읽으면 육안 확정 말고 사용자에게 스크린샷 요청. 정답키 vs 문맥 충돌 시 문맥 채택 + 기록.
10. **PowerShell 팁**: 다중 라인 node -e 는 따옴표 이스케이프로 실패 잦음 → Python here-string(`@'...'@ | Out-File fix.py`)이 안정적. 큰 생성 작업은 밤새 돌려도 됨(세트별 즉시 저장, resume 가능).

---

## 5. 데이터 스키마 요약 (자세한 건 zh_wa1_schema.ts)
- 섹션 15종(ZhSectionType). 표준 순서는 ZH_SECTION_ORDER, 검증기 순서검사는 ZH_FULL_ORDER(Phase2/3 섹션 수용).
- SKILLS 15종: xingjinzi/tongyinzi/duoyinzi/shengdiao/shengmu_yunmu/dapei/jinyici/lianci/liangci/yufa/detail/inference/sequence/main_idea/vocab_in_context.
- MCQ류(sentence/options/answer/explanation)는 영어 McqItem과 필드 동일 → MCQPage 재사용. Cloze→ClozePage, 독해→CompPage. 신규 렌더러 필요: VocabMatch(연결선)·SentenceCraft(자유서술, SynthesisPage 재사용 가능).
- {u}...{/u} = 밑줄 마킹(拼音), 클로즈 빈칸 = "(n) ___".

## 6. 검증 순서 (변경 시마다)
1. 시드 추가 시: `node check_seed.js seed_x.json --explain` → PASS / `node build_seed_all.js ...` → seed_zh_all.json / `node zh_wa1_selftest.js` → 27/0.
2. 세트 생성 후: `node build_wa1_practice_zh.js --in wa1_zh_complete.json --expect 60` → pre-emit PASS → round-trip PASS.

---

## 7. 다음 작업 (새 창의 첫 임무 — 순서대로)

### 7-A. [먼저] duoyinzi 결손 7세트 보강 + Cursor 병렬 비교·병합
대상: **ZS06·ZS14·ZS15·ZS24·ZS39·ZS47·ZS49** (각 PinyinMcq에 duoyinzi 태그 문항 0).

**두 소스를 만들어 비교·병합한다**:
1. **Claude 측 생성**: 두 방안 중 사용자와 합의해 선택.
   - (a) **재태깅(경량)**: ZS14 答应·ZS15 好朋友(好)·ZS49 长大(长)는 이미 다음자 단어이므로 해당 B-item의 skill을 duoyinzi로 바꾸고 해설(why/trapType/memoryTip)을 다음자 관점으로 재작성. ZS06·ZS24·ZS39·ZS47은 다음자 단어가 없으므로 B-item 1개를 다음자 문항으로 교체(예: 长/好/教/数/发/觉/得/重 등 1~4과 등장 다음자).
   - (b) **표적 재생성(정공법)**: 해당 setId만 wa1_zh_complete.json에서 제거 후 `node generate_wa1_zh.js --from <n> --to <n> --attempts 6` (프롬프트가 이미 세트당 duoyinzi≥1 요구). 단, 재생성은 세트 전체가 바뀌므로 이미 감사 통과한 다른 문항까지 새로 검수해야 함 → 비용 큼.
   - **권장**: (a) 재태깅/부분교체가 감사 자산을 보존하므로 우선. 다음자 단어가 없는 4세트만 B-item 1개 교체.
2. **Cursor 측 생성**: 사용자가 Cursor에서 동일 7세트(또는 결손 문항)를 생성/수정. 결과 JSON을 새 창에 첨부.
3. **비교·병합**: 두 결과를 항목별로 비교 → (i) 검증기+postCheck 통과 여부, (ii) 정답 정확성, (iii) 함정 자연성·단일정답성, (iv) 어휘 1~4과 적합성 기준으로 **더 나은 쪽 채택**, 필요시 장점만 합쳐 새 문항 구성. 병합본을 wa1_zh_complete.json에 반영.
4. 반영 후 필수 재검증: `validatePracticeSets(requireExplain, expectSetCount:60)` PASS + postCheck CLEAN + **정답 위치 균등 유지**(재태깅/교체가 위치 편향을 다시 만들지 않도록, 교체 문항의 answer 위치를 분산) + selftest 27/0 + Part B round-trip.
5. 최종 60세트 확정 → wa1_zh_complete.json 갱신본 전달.

### 7-B. [그다음] Step 4 — 렌더러 배선
- `wa1_practice.ts`(이미 emit됨)를 화면에 띄운다. 먼저 `raw.githubusercontent.com/gooobon/psle-app/main/src/components/ExamSession.js`를 fetch해 현재 MCQPage/ClozePage/CompPage/SynthesisPage 구조 파악.
- 재사용: MCQ(Hanzi/Pinyin/Vocab)→MCQPage, PassageCloze→ClozePage, ReadingMcq/ReadingOpen→CompPage.
- 신규: **VocabMatch(연결선 UI)**, **SentenceCraft(자유서술 채점/모범답안 표시)**. **楷体 폰트** 적용(설계결정 3).
- 배선 후 `npm run build` + dev 실제 화면 검증까지 사용자가 확인해야 완료.

---

## 8. 파일 인벤토리 (역할)
- 시드 도구: `check_seed.js`, `build_seed_all.js`(둘 다 ReadingOpen 지원 v4), `add_sap_to_all.js`, `zh_wa1_selftest.js`
- 검증 권위: `zh_wa1_validate.js`(수정 금지), `zh_wa1_schema.ts`
- 데이터: `seed_zh_all.json`(21시드), `wa1_zh_complete.json`(60세트 감사본)
- Step 3: `generate_wa1_zh.js`(Part A, 3중 QA), `build_wa1_practice_zh.js`(Part B)
- 산출: `src/data/p3/chinese/wa1_practice.ts`(emit됨, 1.29MB)

## 9. 새 창 첫 메시지 첨부 목록
1. ZH_WA1_HANDOFF_v4.md
2. seed_zh_all.json
3. zh_wa1_schema.ts
4. zh_wa1_validate.js
5. zh_wa1_selftest.js
6. build_seed_all.js
7. check_seed.js
8. generate_wa1_zh.js
9. build_wa1_practice_zh.js
10. wa1_zh_complete.json
11. (선택) add_sap_to_all.js
12. (사용자 준비) Cursor 생성 duoyinzi 보강 결과 JSON

**첨부 금지**: 기출/문제집 PDF (이미지 한도 초과, 시드에 추출 완료).
