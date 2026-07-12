# P3 Chinese (华文) HCL WA1 — 작업 이관 문서 (Handoff v3)
작성: 2026-07-07 · Genius Project (psle-app) · **이 문서는 새 채팅창에서 중국어 WA1 구축을 이어가기 위한 유일한 기준(single source of truth)입니다.** 모든 보고·소통은 한국어로 합니다.

---

## 0. 이 문서의 사용법 (Claude가 새 창에서 가장 먼저 할 일)

1. `/mnt/user-data/uploads/`에서 아래 [1. 첨부 파일 검증]의 파일들이 있는지 확인. 하나라도 없으면 작업 중단하고 재첨부 요청.
2. 이 문서 전체 + [2 컨텍스트][3 진행상황]을 읽고, 이해한 현재 상태를 5줄로 요약해 사용자에게 확인받기.
3. 그다음 [7. 다음 작업]으로 진행 — **새 창의 첫 작업은 "첨부된 P3 고급화문 문제집 PDF 분석 → 우리 문제유형 구조와의 정합성 검토 → 활용 방안 보고"**입니다. 추측 금지 — 반드시 실제 파일·PDF를 확인한 뒤 판단.

---

## 1. 첨부 파일 검증 (0단계)

### 필수(작업 핵심 — 전부 텍스트, 이미지 0개):
1. `ZH_WA1_HANDOFF_v3.md` — 이 문서
2. `seed_zh_all.json` — **확정 통합 시드 (16개교)**. 가장 중요한 자산. 절대 처음부터 다시 만들지 말고 여기에 이어붙임.
3. `zh_wa1_schema.ts` — 데이터 스키마 (SentenceOrder·SentenceCraft 포함)
4. `zh_wa1_validate.js` — 검증 모듈 (SentenceOrder·SentenceCraft·answerKey 교차검증 포함)
5. `zh_wa1_selftest.js` — 자가테스트 (**27 pass / 0 fail** 나와야 함)
6. `build_seed_all.js` — 시드 통합·검증 빌더 (전 섹션 지원)
7. `check_seed.js` — 단일 시드 검증 (전 섹션 지원)

### 이번 세션 신규(사용자가 새로 첨부):
8. **P3 Higher Chinese 문제집 PDF (~50페이지)** — 새 창의 첫 분석 대상. 시중 문제집.

### 절대 첨부하지 말 것(이미지 한도 초과 원인):
- `P3_Chinese_WA1.pdf`(113p), `P3_High_Chinese_WA1.pdf`(66p) — **첨부 금지**. 이 기출들은 이미 seed_zh_all.json에 추출 완료. 재첨부 시 179 이미지로 한도 초과.
- `zh_wa1_ocr_pages.json`(구 기출 OCR 색인) — **선택**. 텍스트라 이미지 0개지만, 구 기출 전용이라 새 문제집 작업엔 불필요. 구 기출 참조가 필요할 때만.

### 검증 방법:
- `node zh_wa1_selftest.js` → "RESULT: 27 pass / 0 fail" 확인
- `node -e "const d=require('./seed_zh_all.json'); console.log(d.seeds.length)"` → **16** 확인
- 통합 재빌드(선택): 아래 [6] 참조

---

## 2. 프로젝트 컨텍스트

- 앱: Genius Project — 싱가포르 초등 시험 대비 웹앱. Next.js / React / TypeScript, Vercel 배포 (psle-app-vwx3.vercel.app)
- repo: gooobon/psle-app (public, main). raw.githubusercontent.com/gooobon/psle-app/main/<path> 로 fetch 가능
- 로컬: `C:\Users\gooob\psle-app` (사용자가 PowerShell에서 node 실행). Claude는 로컬을 직접 못 읽음 → 패치/생성 스크립트를 `/mnt/user-data/outputs/`로 전달하면 사용자가 실행
- 영어 P3 WA1은 완성됨(60세트, 7섹션). 중국어는 이를 템플릿으로 하되 유형이 다름
- **영어 파이프라인(중국어 Step 3의 참조 원본)**:
  - `build_wa1_practice.js`(repo 루트)는 **생성기가 아니라 변환·emit·라운드트립 검증기**. 입력=이미 완성된 60세트 JSON(`20260622_WA1_complete.json`)+독해 → `convertSet()`로 렌더러가 읽는 PlanSection 형태 변환 → `src/data/p3/english/wa1_practice.ts` emit → **디스크 재파싱 후 전수 불변식 재검증**. 즉 60세트 콘텐츠 생성은 별도 상류 공정에서 끝나 있었음.
  - 렌더러 `src/components/ExamSession.js`: MCQPage/ClozePage/CompPage/SynthesisPage. 데이터엔 UI 스타일 0개(순수 텍스트)
  - raw로 확인: raw.githubusercontent.com/gooobon/psle-app/main/build_wa1_practice.js , /src/components/ExamSession.js

## 2-1. 서비스의 주 임무 (항상 명심)

문제풀이를 통한 **학생 실제 시험 성적 향상**이 최종 목적. 연습 60세트로 훈련 → 실제 기출 mock으로 검증. 따라서:
1. 모든 설계 판단 기준은 "이게 성적을 올리는가"
2. 문제 유형·구조를 전체 관점에서 상시 비판적으로 재점검, 개선점 선제 보고
3. MOE P3 고급화문(HCL) WA1 커리큘럼(**1~4과 범위**·어휘 등급) 적합성 상시 검증 — WA2급 어휘 오염 차단(검증기가 lesson 1~4 강제)
4. 해설은 "왜 정답 + 왜 각 오답 틀림 + 함정 유형 + 기억 포인트"까지 담아 재출제 시 안 틀리게 하는 교육적 해설

---

## 3. 현재 진행 상황 (Step 로드맵)

| Step | 내용 | 상태 |
|---|---|---|
| Step 0 | 파일 검증·OCR 통합·기출 분석·설계결정 | 완료 |
| Step 1 | 스키마+검증모듈+자가테스트 | 완료 |
| Step 2 | 기출→시드 추출 (해설 포함, 병목 우선) | **완료** (닫을 수 있는 병목 전부 닫음) |
| Step 3 | 60세트 생성기 (`generate_wa1_zh.js` + `build_wa1_practice_zh.js`) | **진행 중 ← 지금 여기 (설계 확정 단계)** |
| Step 4 | 렌더러 배선 (MCQ/Cloze/Comp 재사용 + Match/SentenceOrder/SentenceCraft 신규 + 楷体) | 대기 |
| Step 5 | 앱 배선 (대시보드 Chinese WA1 라이브) | 대기 |
| Step 6 | 전수 검증→배포→프로덕션 확인 | 대기 |

### Step 2 최종 자산 (16개교)
seed_zh_all.json 시드 목록:
tao_nan_2021_hcl_test1, nanyang_2021_hcl_mock1, rulang_2024_cl_minitest1, rgps_2024_cl_wa2, nanyang_2024_hcl_wa2, daonan_2024_hcl_supplement1, mgs_2023_cl_wa2, peichun_hcl_t3, peichun_hcl_t2, redswastika_2024_hcl_review1, redswastika_2024_hcl_review3, aitong_2025_hcl, mgs_2023_cl_wa1, acs_2023_cl_wa, peihwa_hcl_wa2, redswastika_2024_hcl_review1_craft

섹션별 소스 밀도(문항수/보유시드):
- HanziMcq 41/11 · VocabMcq 30/9 · VocabMcqPool 10/2 · VocabMatch 28/6 · ReadingMcq 21/8 · PassageCloze 15/4 · PinyinMcq 14/4 · SentenceOrder 2/2 · SentenceCraft 3/1 · HanziMcqB 2/1

### 함정유형(병목) 커버리지 — 성적 지표
- **충분/닫힘**: dapei 43 · xingjinzi 36 · vocab_in_context 33 · shengmu_yunmu 11 · detail 11 · jinyici 8 · tongyinzi 8 · inference 6 · **lianci 4(닫음)** · **shengdiao 3(닫음)** · **sequence 3(닫음)**
- **미해결(현 기출 2개 PDF에 자동채점 MCQ 부재 → 데이터 한계)**: **duoyinzi 0 · liangci 0**. 신규 문제집/기출 확보 시 채움.

---

## 4. 확정된 설계 결정 (변경 시에만 재논의)

### 원래 결정 6건:
1. **시드 범위**: 기존 PDF 자료군 기반 60세트. (이번에 문제집 PDF 추가로 소스 확대 예정 — [7] 참조)
2. **난이도 밴드**: S01→S60 점진 (S01-20 易 / 21-40 中 / 41-60 难). 정적 난이도 필드 없음 — GeniusAdaptiveEngine이 런타임 정확도로 계산. 시드엔 bandHint만 메타로
3. **Phase 1 범위**: 자동채점 6유형 (辨字HanziMcq/拼音PinyinMcq/词语选择VocabMcq/词语搭配VocabMatch/短文填空PassageCloze/阅读理解MCQ ReadingMcq). 나머지는 스키마 선반영·렌더 후행
4. **표준 골격 = B안(확장)**: 8섹션 뼈대 + 독해 5서브타입 union(mcq/sequence/fill_word/open_sentence/fill_table) + 五슬롯 로테이션 + 词语选择 양식(list/pool) 로테이션 + 선택지 길이 3~4 가변
5. **폰트 = 楷体 계열**: `'KaiTi','STKaiti','LXGW WenKai',serif`. LXGW WenKai(OFL 무료) 웹폰트 폴백
6. **트랙 = HCL 단일 사다리**. CL 시드→易 밴드, HCL 시드→中·难 밴드. 시드에 track·bandHint·seedSources 태그 보존

### 이번 세션 추가 결정/구현:
7. **SentenceOrder(组句成段) 신설**: raw 규약 = `{instruction, sentences[], answerKey(1-based 위치), answer0(0-based 읽는순서 인덱스), explain, lesson}`. 검증기가 answer0 순열성 + **answerKey↔answer0 교차검증**(변환오류 차단) 강제. 스킬 tag = sequence.
8. **SentenceCraft(仿写/造句, Phase-2 자유생성) 앞당김 — lianci 훈련용**: raw 규약 = `{items:[{num, subtype(combine/expand/rewrite/make_sentence), connector, sentenceA, sentenceB, instruction, answer, marks, lesson, skill, explain}]}`. 검증기가 **connector가 모범답안에 실제 사용됐는지**(모든 부분) + lesson 1~4 + skill(SKILLS) + 해설(requireExplain 시) 강제. 스키마 ZhCraftItem에 skill·explain 필드 추가됨.
9. **check_seed에 VocabMcqPool 지원 추가**(누락 갭 수정), **build_seed_all·check_seed에 SentenceOrder·SentenceCraft 매핑 추가**.

## 4-1. 작업 규칙 (예외 없이)

1. 모든 보고·소통은 한국어
2. 추측 금지 — repo/PDF/시드를 실제 확인 후에만 판단
3. 코드 수정은 **완전 파일 교체본** 또는 원자적 node 패치로 `/mnt/user-data/outputs/`에 저장→사용자가 로컬 실행. (두 창 병렬 편집 중이면 패치 앵커 충돌 위험 → 완전 파일 교체본 선호)
4. 빌드 통과 ≠ 완료. 사용자가 `npm run build` + dev 실제 화면 검증까지 해야 완료
5. 근본원인 수정 — 우회/땜질 금지. 패치 전 전체 데이터/파일 스캔
6. **코드·주석에 이모지·비ASCII 금지** (문항 콘텐츠의 중문·병음·해설은 예외). 검증: `grep -cP '[^\x00-\x7F]' file.js` == 0
7. **시드 검증 3종**: `node check_seed.js seed_xxx.json --explain` → PASS / `node build_seed_all.js seed_a.json ...` → 전부 PASS + seed_zh_all.json 생성 / `node zh_wa1_selftest.js` → 27 pass 유지. 통합본은 매번 사용자가 로컬에 덮어쓰기
8. **다른 창과 병렬 작업 주의**: 사용자가 다른 창에서도 seed_zh_all.json을 갱신 중일 수 있음. 새 시드 추가 전 반드시 최신 업로드본을 base로 삼고, 기존 시드(특히 내 것) 보존 확인 후 이어붙이기.
9. **이미지 뷰어 한계**: Claude 이미지 뷰어가 일부 스캔 PDF 페이지(특히 구 기출)를 렌더 못 함. 그럴 땐 육안 확정 말고 사용자에게 해당 페이지 스크린샷 요청. 정답키 vs 문맥 충돌 시 문맥상 명백한 정답 채택 + 불일치를 시드에 기록.

---

## 5. 데이터 스키마 요약 (자세한 정의는 zh_wa1_schema.ts)

- 섹션 타입(ZhSectionType) 15개. **표준 8섹션 순서(ZH_SECTION_ORDER)**: HanziMcq→PinyinMcq→VocabMcq→VocabMatch→SentenceCraft→PassageCloze→ReadingMcq→ReadingOpen. 검증기 순서검사는 **ZH_FULL_ORDER**(전 15유형 정렬)로 Phase2/3 섹션(SentenceOrder 등)도 수용.
- 해설 객체(ZhExplain, 자동채점 전 문항 필수): why / distractors(options와 동일 길이, 오답별 개별해설; order·craft는 옵션 없어 distractors 선택) / trapType(15종 스킬태그) / memoryTip
- 스킬태그(SKILLS 15종): xingjinzi/tongyinzi/duoyinzi/shengdiao/shengmu_yunmu/dapei/jinyici/lianci/liangci/yufa/detail/inference/sequence/main_idea/vocab_in_context
- 커리큘럼: lesson 1~4 (ZH_LESSON_MIN/MAX). 검증기가 전 문항 범위 강제 → WA2급 오염 차단
- 세트 컨테이너(ZhPracticeSet): setId(ZS01~ZS60)/theme/track('HCL')/band/seedSources/plan
- MCQ류는 영어 McqItem과 필드명 동일(sentence/options/answer/explanation) → MCQPage 재사용. Cloze→ClozePage. 독해→CompPage. 신규 렌더러: VocabMatch(MatchPage)·SentenceOrder·SentenceCraft(SynthesisPage 재사용 가능).

### 시드 원본(raw seed)의 데이터 형태 규약
- 각 섹션 items[]에 **answerKey(1-based 시험지표기)와 answer0(0-based 코드용) 둘 다** 저장 (변환오류 차단)
- 辨字 인라인형(문장 안 ①②③)은 variant:"inline", 나열형은 "list"
- 词语搭配·词语选择풀형은 pool[]+items[]{stem,answer0} 구조. 词语选择풀형은 VocabMcqPool 키 → build_seed_all이 variant:'pool'로 변환
- 辨字가 한 시험지에 두 블록이면 HanziMcqB로 추가 → build_seed_all이 HanziMcq에 병합
- {u}...{/u} 는 밑줄 단어 마킹(拼音 문제)
- 클로즈 지문 빈칸은 "(n) ___" 마커 (검증기가 마커수=blanks수 강제)
- **SentenceOrder**: `{instruction, sentences[], answerKey[], answer0[], explain, lesson}` (위 결정 7)
- **SentenceCraft**: `{items:[{num, subtype, connector, sentenceA, sentenceB, instruction, answer, marks, lesson, skill, explain}]}` (위 결정 8)

---

## 6. 검증 방법 (매 시드 추가 시)

1. 개별: `node check_seed.js seed_xxx.json --explain` → "FAILS: NONE -> PASS"
2. 통합: `node build_seed_all.js s_seed1.json s_seed2.json ...` → 전부 PASS + grand 카운트 + seed_zh_all.json 생성. **주의**: build_seed_all은 인자로 받은 개별 raw 시드 파일들을 병합. 통합본 안 raw를 개별 파일로 풀려면 `d.seeds.forEach(s=>fs.writeFileSync("s_"+s.raw.seedId+".json", JSON.stringify(s.raw,null,1)))`.
3. 회귀: `node zh_wa1_selftest.js` → 27 pass / 0 fail 유지
4. 통합 파일은 매번 사용자가 `C:\Users\gooob\psle-app\seed_zh_all.json`에 덮어쓰기

---

## 7. 다음 작업 (새 창의 첫 임무 — 순서대로)

### 7-A. [먼저] 문제집 PDF 분석 및 활용 방안 보고
사용자가 **시중 P3 Higher Chinese 문제집 PDF(~50p)**를 첨부함. 실제 기출만으로는 문제 풀(pool)이 부족해, 이 문제집을 기출과 함께 60세트 생성 소스로 쓰려 함. 다음을 **철저하고 완벽하게** 수행 후 보고:
1. **PDF 페이지별 분석**: 문제집의 섹션·문항 유형을 전부 나열. (뷰어가 렌더 못 하면 사용자에게 특정 페이지 스크린샷 요청)
2. **유형 정합성 검토**: 각 유형이 우리 스키마(ZhSectionType 15종)의 어디에 매핑되는지 표로. 매핑 안 되는 신규 유형이 있으면 명확히 지목.
3. **수정·변형·개선 필요성 판단**: 문제집 문항을 우리 구조(raw seed 규약·lesson 1~4·해설 4요소·answerKey/answer0 등)에 맞추려면 무엇을 어떻게 바꿔야 하는지. 커리큘럼 범위(1~4과) 적합성, 어휘 등급, 해설 유무, 정답키 유무 등 점검.
4. **활용 방안 보고**: 문제집을 (a) 시드로 직접 추출할지, (b) 60세트 생성기의 few-shot 예시 pool로 쓸지, (c) 둘 다인지. 병목(duoyinzi·liangci) 보강에 쓸 수 있는지도 판단.
5. 위 1~4 보고 → 사용자 확인 후에야 실제 추출/생성 진행. 추측 금지, 실제 PDF 확인 후 판단.

### 7-B. [그다음] Step 3 — 60세트 생성기 (설계 확정됨, 미구현)
2부 아키텍처:
- **Part A `generate_wa1_zh.js`** (콘텐츠 생성기, 사용자 환경에서 API 키로 실행): 시드+문제집을 few-shot 예시로, 가드레일 프롬프트로 60세트 생성. 세트별 `validatePracticeSets(requireExplain:true, expectSetCount:1)` 통과할 때까지 재시도. `wa1_zh_complete.json`(60세트) 출력. 오프라인이라 Vercel 10초 제한 무관. 모델: claude-sonnet-4-6 via /api/generate 프록시 또는 직접.
  - 가드레일(프롬프트+검증기 이중): lesson 1~4, 스킬 taxonomy, 해설 4요소, 옵션 3~4, 클로즈 마커=빈칸, craft 연결어 실사용, order answerKey↔answer0, 밴드 점진(S01-20易/21-40中/41-60难), 5~6과 어휘 차단.
- **Part B `build_wa1_practice_zh.js`** (변환·emit·검증, 영어 build_wa1_practice.js와 동형): `wa1_zh_complete.json` → `src/data/p3/chinese/wa1_practice.ts` emit → 디스크 재파싱 라운드트립 검증(**우리 zh_wa1_validate.js 재사용**, 영어처럼 재구현하지 말 것).
- 권장: 먼저 **S01~S03 파일럿** 생성해 프롬프트·검증 루프 확인 후 60세트로 확장.

---

## 8. 이미지 한도 회피 (중요 — 새 창 첨부 전략)

- 오류 "Your message will exceed the maximum image count..."는 **PDF 페이지 수(=이미지 수)** 때문. 
- **문제집 PDF(~50p)만 이미지로 첨부**. 구 기출 PDF 2개(113p+66p)는 **절대 첨부 금지** (이미 시드에 추출됨).
- 나머지 필수 파일(.json/.js/.ts/.md)은 전부 **텍스트 = 이미지 0개** → 한도 무관, 몇 개든 첨부 OK.
- 그래도 문제집이 50p 초과로 한도가 걱정되면: (a) 문제집을 앞/뒤 절반으로 나눠 2회에 걸쳐 첨부, 또는 (b) 문제·정답 페이지만 골라 첨부. 새 창 첫 메시지엔 필수 텍스트 파일 7종 + 문제집 PDF만.

---

## 9. 로컬 저장 위치 + 새 창 첨부 목록 (사용자 안내)

**저장 폴더**: 이 채팅에서 다운로드한 파일들을 `C:\Users\gooob\psle-app\` 아래(또는 별도 `handoff` 폴더)에 두세요. 문제집 PDF는 아무 폴더나(예: `C:\Users\gooob\psle-app\workbook.pdf`).

**새 창 첫 메시지에 첨부**:
1. ZH_WA1_HANDOFF_v3.md
2. seed_zh_all.json
3. zh_wa1_schema.ts
4. zh_wa1_validate.js
5. zh_wa1_selftest.js
6. build_seed_all.js
7. check_seed.js
8. (사용자 준비) P3 Higher Chinese 문제집 PDF (~50p)

**첨부 금지**: P3_Chinese_WA1.pdf, P3_High_Chinese_WA1.pdf (이미지 한도 초과 원인).
