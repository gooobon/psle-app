# P3 Chinese (华文) HCL WA1 — 작업 이관 문서 (Handoff v5)

작성: 2026-07-09 · Genius Project (psle-app) · **이 문서는 새 채팅창에서 중국어 WA1을 이어가기 위한 유일한 기준(single source of truth)입니다.** 모든 보고·소통은 한국어로 합니다.

> v4 → v5 변경 요약: (1) **duoyinzi 결손 7세트 보강 완료** — Cursor 병렬 생성 + Claude 리뷰/병합으로 60세트 전부 duoyinzi≥1 확보, (2) **60세트 감사·수정 최종본 확정**(정답 위치 균등화·병음 정답키 8건·구조 정규화 완료), (3) **Step 4 아키텍처 = 경로 A(ExamSession 기반) 확정** — repo 실제 코드 실측으로 근거 확보, (4) **ChineseSession/buildZhPlan은 공존(유지)** 결정, (5) Step 4 배선안·가드·Cursor 명령서 방향 확정. 이제 **Step 4(렌더러 배선) 실행** 단계.

---

## 0. 이 문서의 사용법 (새 창에서 가장 먼저 할 일)

1. `/mnt/user-data/uploads/`에서 아래 [1. 첨부 파일]의 파일들이 있는지 확인. 하나라도 없으면 작업 중단하고 재첨부 요청.
2. 이 문서 전체 + [2 컨텍스트][3 진행상황][7 다음 작업]을 읽고, 이해한 현재 상태를 5줄로 요약해 사용자에게 확인받기.
3. 그다음 [7. 다음 작업]으로 진행 — **새 창의 첫 작업은 "Step 4 렌더러 배선(경로 A): Cursor 병렬 산출물 리뷰·검증·병합, 또는 직접 배선"**입니다. 추측 금지 — 반드시 실제 코드/파일을 확인한 뒤 판단.

---

## 1. 첨부 파일 (0단계 검증)

### 데이터/파이프라인 (전부 텍스트, 이미지 0개):
1. `ZH_WA1_HANDOFF_v5.md` — 이 문서
2. `wa1_zh_complete.json` — **감사·수정·duoyinzi 병합 완료된 60세트 최종본** (ZS01~ZS60)
3. `seed_zh_all.json` — 통합 시드 21개
4. `zh_wa1_schema.ts` — 데이터 스키마 (Step 4에서 src/data/p3/chinese/schema.ts로 배치)
5. `zh_wa1_validate.js` — **검증 권위 (절대 수정 금지 — selftest 27개가 걸린 공유 자산)**
6. `zh_wa1_selftest.js` — 자가테스트 (**27 pass / 0 fail**)
7. `build_wa1_practice_zh.js` — 변환·emit·라운드트립 검증 (Part B)
8. `generate_wa1_zh.js` — Step 3 생성기 (3중 QA). Step 4에선 불필요, 향후 재생성/보강용
9. `check_seed.js`, `build_seed_all.js`, `add_sap_to_all.js` — 시드 도구 (참고)

### repo 렌더러 코드 (Step 4 대상 — 사용자가 로컬/ repo에서 첨부):
10. `ExamSession.js` (src/components/) — **배선 대상. 여기에 중국어 분기 additive 추가**
11. `ChineseSession.js` (src/components/) — 기존 적응형 렌더러 (**수정 금지, 공존**)
12. `ClaudeApp.js` (src/app/) — 앱 본체. ChineseApp에 60세트 모드 추가
13. `dataEngine.js` (src/lib/) — buildZhPlan (**수정 금지, 공존**)
14. `p3PaperBridge.js` (src/lib/) — 적응형 데이터 소스 (**수정 금지, 공존**)
15. (선택) Cursor의 Step 4 배선 산출물 — 있으면 리뷰·병합 대상

### 절대 첨부하지 말 것(이미지 한도):
- 기출/문제집 PDF — 이미 시드로 추출 완료. 재첨부 금지.

### 검증 방법(로컬, `C:\Users\gooob\psle-app`):
- `node -e "const d=require('./wa1_zh_complete.json'); console.log(d.length)"` → **60**
- `node build_wa1_practice_zh.js --in wa1_zh_complete.json --expect 60` → pre-emit PASS → round-trip PASS
- `node zh_wa1_selftest.js` → "RESULT: 27 pass / 0 fail"
- duoyinzi 커버리지 확인: 아래 [3-duoyinzi] 스크립트 → 결손 0

---

## 2. 프로젝트 컨텍스트

- 앱: Genius Project — 싱가포르 초등 시험 대비 웹앱. Next.js / React / TypeScript / Tailwind, Vercel 배포 (psle-app-vwx3.vercel.app)
- repo: gooobon/psle-app (public, main). `raw.githubusercontent.com/gooobon/psle-app/main/<path>` 로 fetch 가능(단 GitHub rate-limit 잦음 → 안 되면 사용자에게 파일 첨부 요청)
- 로컬: `C:\Users\gooob\psle-app`. Claude는 로컬을 직접 못 읽음 → 패치/생성 스크립트를 `/mnt/user-data/outputs/`로 전달 → 사용자가 실행
- **최종 목적(항상 명심)**: 기출 기반 모의고사 문제풀이를 통한 **학생 실제 시험 성적 향상**. 모든 설계 판단 기준은 "이게 성적을 올리는가".
- 커리큘럼: **P3 HCL WA1 = 1~4과 범위**. 검증기가 lesson 1~4 강제.

### repo 아키텍처 (v5에서 실측 확정 — 매우 중요)
앱에 **중국어 렌더링 시스템이 둘** 존재하며, **둘은 공존**한다:

| 시스템 | 데이터 소스 | 렌더러 | 성격 |
|---|---|---|---|
| **buildZhPlan → ZhSessionScreen** (ChineseSession.js) | 기출(allP3ChinesePapers, p3PaperBridge) | BianZi/CiYu/KanTu/PeiDui/JuZi/ZuJu/YueRead | 적응형 드릴링 (3세션 난이도 자동조정) |
| **ExamSessionScreen** (ExamSession.js) | 영어 WA1 60세트(WA1_PRACTICE_SETS) | MCQPage/ClozePage/CompPage/SynthesisPage | 고정 모의고사 (mock + 오답복습) |

- 영어 60세트는 `ClaudeApp.js`에서 `<ExamSessionScreen plan={wa1Plan} isMockExam mockInfo .../>`로 렌더됨. **우리 중국어 60세트는 이 ExamSession 패턴의 쌍둥이로 설계됨.**
- `ChineseApp`은 현재 `buildZhPlan` 적응형만 돌림(우리 60세트 미사용). → Step 4에서 60세트 모드를 **추가**(교체 아님).

---

## 3. 현재 진행 상황 (Step 로드맵)

| Step | 내용 | 상태 |
|---|---|---|
| Step 0~2 | 파일검증·설계·스키마·검증기·시드추출(21개, 병목해소) | 완료 |
| Step 3 | 60세트 생성기(3중 QA) + 생성 + 전수 감사 + emit | 완료 |
| Step 3.5 | duoyinzi 결손 7세트 보강 (Cursor 병렬 + Claude 병합) | **완료** |
| Step 4 | 렌더러 배선 (경로 A: ExamSession 기반) | **← 지금 여기** |
| Step 5 | 앱 배선 (대시보드 华文 WA1 모의고사 라이브) | 대기 |
| Step 6 | 전수 검증→배포→프로덕션 확인 | 대기 |

### 3-데이터: wa1_zh_complete.json (60세트 최종본)
- validation PASS · postCheck CLEAN · selftest 27/0 · Part B round-trip PASS.
- 카운트 mcq840·match300·cloze300·compAuto240·open120·craft120.
- **정답 위치 균등** {0:211,1:209,2:210,3:210} (편향 66%→25% 균등화 완료).
- **duoyinzi 결손 0** (60세트 전부 ≥1).

### 3-감사 이력 (v4에서 완료, 요약)
- **[치명] 정답 위치 편향** index0 66% → 결정적 재배치로 균등화(각 25%). ✓/해설/오답설명 함께 이동.
- **[치명] 병음 정답키 8건 교정**: 答应 dā yìng(ZS14_B2·ZS26_B1·ZS50_B2), 亲切 qīn qiè(ZS38_B1), 难过 nán guò(ZS50_B1), 教导 jiào dǎo(ZS50_B3), 好奇 hào qí(ZS16_B4·ZS43_B4).
- **[구조] 정규화**: ZS47·ZS55 매칭 6→5문항, ZS22 클로즈 여분 추가, ZS15 클로즈 여분 伴侣→生气.

### 3-duoyinzi 보강 (v5에서 완료)
- 대상 7세트: ZS06·ZS14·ZS15·ZS24·ZS39·ZS47·ZS49 (각 PinyinMcq에 duoyinzi 0였음).
- Cursor 병렬 생성 → Claude 검증/리뷰/병합. Cursor 산출물이 우리 검증기 ALL PASS·비타깃 문항 무변경(drift 0)이라 채택.
- Claude가 병합 시 2건 개선: ZS39_B3 分工(fēn)이 같은 세트 分享(fēn)과 중복 → 重 chóng(重新)로 교체(ZS24 zhòng과 상보), ZS15_B3 "小杰好朋友很多" → "小杰的好朋友很多"(的 보강).
- duoyinzi 커버리지 확인 스크립트:
  ```
  node -e "const d=require('./wa1_zh_complete.json');let df=[];for(const s of d){let n=0;for(const sc of s.plan)if(['HanziMcq','PinyinMcq','VocabMcq'].includes(sc.type))for(const q of sc.items)if(q.skill==='duoyinzi')n++;if(!n)df.push(s.setId)}console.log('deficit:',df.length?df:'NONE')"
  ```

### 3-잔여 이슈 (스킵 결정 — 향후 업데이트)
- 완전 동일 MCQ 문장 ~9쌍, craft 답 3쌍, match stem ~40쌍(상투 collocation). → 넘어감(간격 반복으로 수용). 다양성 업데이트 대상.
- 소수 경계 문항: ZS35_A4 `被湿了`, ZS46 蜥蜴/蜕皮·ZS57 惭愧(hard 밴드 상급). 치명 아님, 후행.

---

## 4. 확정된 설계 결정

### 콘텐츠(변경 시에만 재논의)
1. 표준 8섹션: HanziMcq(5)→PinyinMcq(4)→VocabMcq(5)→VocabMatch(pool6/items5)→SentenceCraft(2)→PassageCloze(5빈칸/뱅크6)→ReadingMcq(3)→ReadingOpen(fill_word1+open_sentence2).
2. 난이도 밴드 S01-20易/21-40中/41-60难 (정적필드 아님, 런타임 계산).
3. 폰트 = 楷体 계열 `'KaiTi','STKaiti','LXGW WenKai',serif`.
4. 트랙 = HCL 단일. 병음 = 성조 기호. 해설 = ZhExplain(why/distractors[✓正确答案 at answer]/trapType/memoryTip). answerKey=answer0+1.
5. 세트당 liangci≥1·duoyinzi≥1.

### Step 4 아키텍처 = 경로 A (ExamSession 기반) — v5 확정
**근거(실측)**: ExamSession 페이지들이 우리 데이터와 필드 정합. 데이터 변환 거의 불필요.
- MCQPage: `q.id/topic/answer/options/(sentence||question)/explanation` = 우리 MCQ와 동일.
- ClozePage: `set.passage/wordBank/blanks[{num,answer,explanation}]`, 빈칸 정규식 `/\((\d+)\)\s*_{3,}/g` = 우리 `(1) ___` 마커와 **정확히 일치**.
- CompPage: 이미 format `mcq/fill_word/open_sentence` 지원 → **ReadingMcq+ReadingOpen 둘 다 신규 렌더러 불필요**.
- SynthesisPage: `q.id/instruction/sentenceA/sentenceB/answer/explanation` = 우리 SentenceCraft 호환.
- **VocabMatch만 대응 페이지 없음 → MatchPage 신규 필요**(ChineseSession의 PeiDui 참조, 원본은 수정 금지).

**공존 원칙**: buildZhPlan/ChineseSession/p3PaperBridge/quizMeta 기존 로직 **불변**. 영어 sectionType 분기·영어 60세트 흐름 **불변**. 전부 **additive**로만.

## 4-1. 작업 규칙 (예외 없이)
1. 모든 보고·소통은 한국어.
2. 추측 금지 — repo/코드/JSON 실제 확인 후에만 판단.
3. 코드 수정은 완전 파일 교체본 또는 원자적 patch로 `/mnt/user-data/outputs/`에 저장→사용자 로컬 실행.
4. 빌드 통과 ≠ 완료. `npm run build` + dev 실제 화면 검증(렌더/채점/오답복습)까지 사용자가 확인해야 완료.
5. 근본원인 수정 — 우회/땜질 금지.
6. 코드·주석 ASCII-only(중문/병음/해설·중국어 라벨 상수는 예외). 검증 `grep -cP '[^\x00-\x7F]' file.js` == 0.
7. **zh_wa1_validate.js 절대 수정 금지.**
8. 다른 창(Cursor 포함)과 병렬 작업 주의: 공유 파일은 최신 업로드본 base로, 완전 교체본으로. 어느 파일을 Cursor가 만지는지 먼저 확인.
9. GitHub rate-limit으로 raw fetch 실패 시 사용자에게 파일 첨부 요청(육안 확정 말 것).
10. PowerShell 다중라인 node -e 는 따옴표 이스케이프 실패 잦음 → Python here-string 안정적.

---

## 5. 데이터 스키마 요약 (자세한 건 zh_wa1_schema.ts)
- 섹션 15종(ZhSectionType). MCQ류(sentence/options/answer/explanation) = 영어 McqItem 필드 동일.
- SKILLS 15종. {u}...{/u} = 밑줄 마킹(拼음/특정 단어), 클로즈 빈칸 = "(n) ___".
- 세트 컨테이너 ZhPracticeSet: setId(ZS01~ZS60)/theme/track('HCL')/band/seedSources/plan.

## 6. 검증 순서
- 세트 변경 시: `node build_wa1_practice_zh.js --in wa1_zh_complete.json --expect 60` → pre-emit PASS → round-trip PASS.
- 시드 변경 시: check_seed → build_seed_all → selftest 27/0.

---

## 7. 다음 작업 (새 창의 첫 임무 — Step 4 렌더러 배선, 경로 A)

### 7-A. 배선 작업 항목 (Cursor 병렬 산출물이 있으면 리뷰·검증·병합 / 없으면 직접 배선)

**(1) 데이터 배치**
- `src/data/p3/chinese/schema.ts` (zh_wa1_schema.ts 내용) + `src/data/p3/chinese/wa1_practice.ts`(Part B emit 결과, `export const WA1_ZH_PRACTICE` 길이 60).

**(2) ExamSession.js — additive 분기 5개** (영어 분기 불변, 데이터 변환 없이 그대로 라우팅)
- `HanziMcq`|`PinyinMcq`|`VocabMcq` → MCQPage
- `PassageCloze` → ClozePage (set=items[0])
- `ReadingMcq`|`ReadingOpen` → CompPage (set=items[0])
- `SentenceCraft` → SynthesisPage (items)
- `VocabMatch` → MatchPage(신규)
- 중국어 섹션 라벨 맵: {HanziMcq:"辨字",PinyinMcq:"拼音",VocabMcq:"词语",VocabMatch:"词语搭配",SentenceCraft:"造句",PassageCloze:"短文填空",ReadingMcq:"阅读理解",ReadingOpen:"阅读理解"} + 중국어 안내문.

**(3) MatchPage 신규** — set={id,instruction,pool[6],items[{num,stem,answer,explain,explanation}]} (answer=pool 인덱스, stem 빈칸 （　）). stem↔pool 연결선/탭 UX, 각 pool 1회 사용, 채점·오답 표시. 결과 계약은 MCQPage와 동일(topic/sectionType="VocabMatch"). ChineseSession의 PeiDuiSection 로직 참조하되 새로 작성(원본 수정 금지).

**(4) 중국어화(경미)**: 楷体 폰트(중국어 분기에서만 오버라이드, 영어 EXAM_BODY 불변), MCQ sentence의 `{u}...{/u}`→밑줄 렌더, 병음 옵션은 문자열 그대로.

**(5) ChineseApp에 "华文 WA1 모의고사(60세트)" 모드 추가** (buildZhPlan 공존)
```
import { WA1_ZH_PRACTICE } from '@/data/p3/chinese/wa1_practice';
const idx = ((prog.nextSession - 1) % 60 + 60) % 60;
<ExamSessionScreen plan={WA1_ZH_PRACTICE[idx].plan} isMockExam mockInfo={{school:"华文 WA1"}} .../>
```
대시보드에 별도 진입점 추가. 기존 `<ZhSessionScreen plan={buildZhPlan(...)}/>` 적응형은 그대로.

### 7-B. 자기검증 (완료 기준)
1. `node build_wa1_practice_zh.js --in wa1_zh_complete.json --expect 60` → PASS.
2. `npm run build` → 에러 0.
3. dev 화면(스크린샷): 华文 WA1 → ZS01 8섹션 렌더 / PinyinMcq {u}밑줄{/u}·병음 / PassageCloze `(1) ___` 워드뱅크 채점 / VocabMatch 연결선 채점 / ReadingOpen fill_word·open_sentence 모범답안 / 오답복습(reviewMode) / 楷体.
4. **회귀**: 영어 WA1 흐름 정상 동작 확인.
5. **가드 확인**: ChineseSession.js/dataEngine.js(buildZhPlan)/p3PaperBridge.js/zh_wa1_validate.js/영어 분기 무변경.

### 7-C. Cursor 조율
- Cursor가 Step 4를 병렬로 만지는 중이면, 어느 파일을 만지는지 먼저 확인 → 충돌 파일은 완전 교체본으로. Cursor 산출물이 오면 (i)영어 회귀, (ii)8섹션 렌더 정확성, (iii)MatchPage 채점 정합, (iv)楷体/{u} 처리, (v)공존 가드 준수를 리뷰·병합.

---

## 8. 파일 인벤토리 (역할)
- 데이터: `wa1_zh_complete.json`(60세트 최종), `seed_zh_all.json`(21시드)
- 검증 권위: `zh_wa1_validate.js`(수정 금지), `zh_wa1_schema.ts`
- 파이프라인: `generate_wa1_zh.js`(Part A), `build_wa1_practice_zh.js`(Part B), 시드도구(check_seed/build_seed_all/add_sap_to_all)
- repo 렌더러: `ExamSession.js`(배선 대상), `ChineseSession.js`/`dataEngine.js`/`p3PaperBridge.js`(공존·수정금지), `ClaudeApp.js`(ChineseApp 60세트 모드 추가)
- 산출 예정: `src/data/p3/chinese/{schema.ts, wa1_practice.ts}`, ExamSession additive 분기 + MatchPage

## 9. 새 창 첫 메시지 첨부 목록
1. ZH_WA1_HANDOFF_v5.md
2. wa1_zh_complete.json
3. zh_wa1_schema.ts
4. zh_wa1_validate.js
5. build_wa1_practice_zh.js
6. ExamSession.js
7. ChineseSession.js
8. ClaudeApp.js
9. dataEngine.js
10. p3PaperBridge.js
11. (선택) zh_wa1_selftest.js, seed_zh_all.json, generate_wa1_zh.js
12. (선택) Cursor Step 4 배선 산출물

**첨부 금지**: 기출/문제집 PDF (이미지 한도 초과, 시드에 추출 완료).
