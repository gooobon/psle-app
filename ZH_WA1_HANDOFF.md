# P3 Chinese (华文) WA1 — 작업 이관 문서 (Handoff v2)
작성: 2026-07-06 · Genius Project (psle-app) · 이 문서는 새 채팅창에서 중국어 WA1 구축을 이어가기 위한 단일 기준(single source of truth)입니다.

---

## 0. 이 문서의 사용법 (Claude가 새 창에서 가장 먼저 할 일)

이 문서는 이전 채팅에서 진행한 "P3 고급화문(HCL) WA1" 구축 작업의 이관 문서입니다.
사용자가 이 문서와 함께 여러 파일을 첨부했습니다. **가장 먼저 아래 [1. 첨부 파일 검증]을 수행하고, 그 다음 [2. 프로젝트 컨텍스트]와 [3. 현재 진행 상황]을 읽어 이해한 내용을 5줄로 요약해 사용자에게 확인받은 뒤, [7. 다음 작업]으로 진행하세요.** 추측 금지 — 반드시 실제 파일을 확인한 뒤 판단합니다. 모든 보고·소통은 한국어로 합니다.

---

## 1. 첨부 파일 검증 (0단계 — 가장 먼저)

`/mnt/user-data/uploads/` 에서 아래 파일들이 존재하는지 확인하고, 하나라도 없으면 작업을 시작하지 말고 재첨부를 요청하세요.

필수(작업 핵심):
1. `seed_zh_all.json` — 확정된 통합 시드 (6개교, Phase1 자동채점 89문항, 해설 포함). **가장 중요한 자산.**
2. `zh_wa1_schema.ts` — 데이터 스키마 정의 (TypeScript)
3. `zh_wa1_validate.js` — 검증 모듈 (시드/생성기 공용 불변식)
4. `zh_wa1_selftest.js` — 검증 모듈 자가 테스트 (정상1+오류9 → 10/10 통과해야 함)
5. `build_seed_all.js` — 개별 시드→통합 병합·검증 빌더
6. `check_seed.js` — 단일 시드 검증 스크립트
7. `zh_wa1_ocr_pages.json` — 통합 OCR 색인 (179키: "1"~"113" 구 PDF + "hc_1"~"hc_66" 신 PDF)
8. `P3_Chinese_WA1.pdf` — 구 기출 원본 (113p, Red Swastika/道南 보충·복습모음 등)
9. `P3_High_Chinese_WA1.pdf` — 신 기출 원본 (66p, Tao Nan·Nanyang·Rulang·RGPS·Henry Park·CHIJ)

검증 방법:
- `node zh_wa1_selftest.js` 실행 → "RESULT: 10 pass / 0 fail" 확인
- `node build_seed_all.js seed_*.json` 은 개별 시드가 있을 때만. 통합본만 있으면 아래로:
- `node -e "const d=require('./seed_zh_all.json'); console.log('seeds:', d.seeds.length, d.seeds.map(s=>s.seedId))"` → 6개 확인
- OCR: 키 179개(1~113 + hc_1~hc_66) 확인
- PDF: `pdfinfo P3_Chinese_WA1.pdf`(113p), `pdfinfo P3_High_Chinese_WA1.pdf`(66p)

참고(선택, 없어도 됨): 개별 시드 6개(`seed_tao_nan.json` 등)는 `seed_zh_all.json`에 모두 포함되어 있어 재첨부 불필요. 통합본을 다시 개별로 풀 필요가 있으면 `seed_zh_all.json` 안 `seeds[].raw`에서 꺼낼 수 있음.

---

## 2. 프로젝트 컨텍스트

- 앱: Genius Project — 싱가포르 초등 시험 대비 웹앱. Next.js / React / TypeScript, Vercel 배포 (psle-app-vwx3.vercel.app)
- repo: gooobon/psle-app (public, main). raw.githubusercontent.com/gooobon/psle-app/main/<path> 로 fetch
- 로컬: C:\Users\gooob\psle-app (사용자가 PowerShell에서 node 패치 실행). Claude는 로컬을 직접 못 읽음 → 패치 스크립트를 /mnt/user-data/outputs/ 로 전달하면 사용자가 실행
- 영어 P3 WA1은 완성됨(60세트, 7섹션). 중국어는 이를 템플릿으로 하되 유형이 다름
- 영어 파이프라인(중국어의 참고 원본):
  - 생성기 build_wa1_practice.js (repo 루트): 입력 JSON → src/data/p3/english/wa1_practice.ts emit → 디스크 재파싱 라운드트립 검증
  - 렌더러 src/components/ExamSession.js: MCQPage/ClozePage/CompPage/SynthesisPage. 데이터엔 UI 스타일 0개(순수 텍스트)
  - raw로 확인 가능: raw.githubusercontent.com/gooobon/psle-app/main/build_wa1_practice.js , /src/components/ExamSession.js

## 2-1. 서비스의 주 임무 (반드시 항상 명심)

문제풀이를 통한 **학생 실제 시험 성적 향상**이 최종 목적. 연습 60세트로 훈련 → 실제 기출 mock으로 실력 검증. 따라서:
1. 모든 설계 판단의 기준은 "이게 성적을 올리는가"
2. 문제 유형·구조를 전체 관점에서 상시 비판적으로 재점검하고 개선점을 선제 보고
3. MOE P3 고급화문(HCL) WA1 커리큘럼(1~4과 범위·어휘 등급) 적합성 상시 검증 — WA2급 어휘 오염 차단
4. 해설은 "왜 정답 + 왜 각 오답이 틀림 + 함정 유형 + 기억 포인트"까지 담아 같은 유형 재출제 시 안 틀리게 하는 교육적 해설이어야 함

---

## 3. 현재 진행 상황 (Step 로드맵)

| Step | 내용 | 상태 |
|---|---|---|
| Step 0 | 파일 검증·OCR 통합(179키)·기출 분석·결정 6건 확정 | 완료 |
| Step 1 | 데이터 스키마 설계 (스키마+검증모듈+자가테스트 10/10) | 완료 |
| Step 2 | 기출→구조화 시드 JSON 추출 (해설 포함, 병목 우선) | **진행 중 ← 현재** |
| Step 3 | 60세트 생성기 build_wa1_practice_zh.js | 대기 |
| Step 4 | 렌더러 배선 (MCQ/Cloze/Comp 재사용 + Match 신규 + 楷体 폰트) | 대기 |
| Step 5 | 앱 배선 (대시보드 Chinese WA1 라이브) | 대기 |
| Step 6 | 전수 검증→배포→프로덕션 확인 | 대기 |

### Step 2 시드 수집 현황 (6부 수록, 1부 스킵)

| # | 학교 | 트랙 | 밴드 | 확보 섹션 | 상태 |
|---|---|---|---|---|---|
| 1 | Tao Nan 2021 | HCL | mid | 辨字5·拼音2·词选4 | 완료 |
| 2 | Nanyang 2021 모의 | HCL | mid | 辨字5·搭配5·词选풀5·독해MCQ3 | 완료 |
| 3 | Rulang 2024 | CL | easy | 辨字3·词选4·클로즈2 | 완료 |
| 4 | RGPS 2024 WA2 | CL | easy | 辨字3·词选3·독해(배열1+MCQ2) | 완료 |
| 5 | Henry Park 2025 | CL | — | **불완전본(Q3~Q13 페이지 없음) → 스킵** | 스킵 |
| 6 | Nanyang 2024 WA2 | HCL | hard | 辨字5·搭配5·词选풀5·클로즈5·독해MCQ1 | 완료 |
| 7 | 道南 보충(Red Swastika 표지) | HCL | mid | 辨字4·拼音2·词选2·搭配5·클로즈4·독해MCQ4 | 완료 |
| 8+ | CHIJ·복습모음·기타 | — | — | 미착수 | 다음 |

- Phase 1 자동채점 총 **89문항**: MCQ 42 + 매칭(搭配+词选풀) 25 + 클로즈 11 + 독해자동채점 11
- 섹션별 시드 밀도: 辨字 6개교 / 拼音 2 / 词选 4 / 搭配 3 / 클로즈 3 / 독해MCQ 4 — 6개 자동채점 유형 전부 생성 가능 밀도
- 검증: 6부 전부 requireExplain:true 통과

### 병목 유형 커버리지 (성적 지표 — 다음 수집 우선순위)

수집 방향은 "부수 채우기"가 아니라 **"함정 유형 커버리지 채우기"**(성적 지렛대). 현재:
- 충분: 短文填空(11)·형근자xingjinzi(23)·搭配dapei(28)·독해detail(7)·근의어jinyici(8)
- 개선됨: 拼音 성모운모shengmu_yunmu(3)·독해추론inference(3)
- **남은 병목(다음 우선)**: 拼音 声调shengdiao(1) ← 최우선 / 배열sequence(1)·연사lianci(1)·다음자duoyinzi(0)·양사liangci(0)

---

## 4. 확정된 설계 결정 6건 (변경 시에만 재논의)

1. **시드 범위**: 현 PDF 자료군만으로 60세트 (WA2 기출 추가는 WA2 확장 단계로 이연). 이미 WA2급 3부 유입됨(RGPS WA2·Nanyang 计分二·CHIJ 学段)
2. **난이도 밴드**: S01→S60 점진 (내부밴드 1-20 易/21-40 中/41-60 难). 정적 난이도 필드 없음 — GeniusAdaptiveEngine이 런타임 정확도로 계산. 시드엔 bandHint만 메타로
3. **Phase 1 범위**: 자동채점 6유형 (辨字/拼音선택/词语选择/词语搭配/短文填空/阅读理解MCQ). 독해 问答·排序 등 확장 서브타입은 스키마엔 선반영, 렌더는 Phase 2
4. **표준 골격 = B안(확장)**: Red Swastika 8섹션 뼈대 + 독해 5서브타입 union(mcq/sequence/fill_word/open_sentence/fill_table) + 五슬롯 로테이션 + 词语选择 양식(list/pool) 로테이션 + 선택지 길이 3~4 가변. 스키마 선반영·렌더 후행
5. **폰트 = 楷体 계열** (사용자 첨부 시험지 사진이 楷体). 스택: `'KaiTi','STKaiti','LXGW WenKai',serif`. 宋体(Noto Serif SC)안은 폐기. LXGW WenKai(OFL 무료)를 웹폰트 폴백
6. **트랙 = HCL 단일 사다리**. CL 시드(Rulang·RGPS·Henry Park)→易 밴드, HCL 시드→中·难 밴드. 시드에 track·bandHint·seedSources 태그 보존

## 4-1. 작업 규칙 (예외 없이)

1. 모든 보고·소통은 한국어
2. 추측 금지 — repo/PDF/OCR/시드를 실제 확인한 뒤에만 판단
3. 코드 수정은 원자적 node 패치 스크립트로 /mnt/user-data/outputs/ 에 저장→사용자가 로컬 실행. 앵커 하나라도 불일치면 전체 THROW, 전부 통과 시에만 기록. 재실행 시 이미 적용됐으면 ABORT
4. 앵커는 LF/CRLF 양쪽 시도하는 유연 앵커
5. 빌드 통과 ≠ 완료. 사용자가 npm run build + dev 실제 화면 검증까지 해야 완료
6. 근본원인 수정 — 우회/땜질 금지
7. 패치 전 전체 데이터/파일 스캔 (일부만 보고 수정 금지)
8. 코드에 이모지·비ASCII 금지 (문항 콘텐츠의 중문·병음·해설은 예외)

## 4-2. OCR/래스터 작업 원칙 (중요)

- `zh_wa1_ocr_pages.json`은 **색인/초벌 전용**. 절대 재OCR 금지(재사용)
- OCR 오독 심함: 辨字→办字/闪字/辩字, 병음 성조·ü 소실, 정답키 선택지 번호 소실 등
- 정밀 추출 시 **반드시** 해당 페이지를 pdftoppm으로 래스터해 육안 대조. 특히 拼音 성조·辨字 선택지·클로즈 선택지·정답키는 OCR만으로 확정 금지
- **주의: Claude의 이미지 뷰어가 일부 PDF 페이지(구 PDF의 여러 페이지, 신 PDF의 Nanyang/Henry Park 등)를 렌더하지 못함.** 이 경우 육안 확정 불가 → 사용자에게 해당 페이지 스크린샷 첨부를 요청해야 함. 이전 창에서 道南 보충·Henry Park는 사용자 이미지 첨부로 확정했음
- **정답키 vs 문맥 충돌 시**: 문맥상 명백한 정답을 채택하고, 시드에 불일치를 명시 기록(예: Henry Park Q1은 정답키 3이지만 문맥상 吸=2로 확정). sgexam 정답키 오타 가능성

---

## 5. 데이터 스키마 요약 (자세한 정의는 zh_wa1_schema.ts)

- 섹션 타입(ZhSectionType) 15개: HanziMcq/PinyinMcq/VocabMcq/VocabMatch/PassageCloze/ReadingMcq (Phase1) + ReadingOpen/SentenceCraft/SentenceMcq/SentenceOrder/ErrorCorrection/CharWrite (Phase2) + PictureVocabMcq/PictureComposition/StrokeOrder (Phase3)
- 표준 8섹션 순서(ZH_SECTION_ORDER): HanziMcq→PinyinMcq→VocabMcq→VocabMatch→SentenceCraft→PassageCloze→ReadingMcq→ReadingOpen
- 해설 객체(ZhExplain, 자동채점 전 문항 필수): why / distractors(options와 동일 길이, 오답별 개별해설) / trapType(15종 스킬태그) / memoryTip
- 스킬태그: xingjinzi/tongyinzi/duoyinzi/shengdiao/shengmu_yunmu/dapei/jinyici/lianci/liangci/yufa/detail/inference/sequence/main_idea/vocab_in_context
- 커리큘럼: lesson 1~4 (ZH_LESSON_MIN/MAX). 검증기가 범위 강제 → WA2급 오염 차단
- 세트 컨테이너(ZhPracticeSet): setId(ZS01~ZS60)/theme/track('HCL')/band/seedSources/plan
- MCQ류는 영어 McqItem과 필드명 동일(sentence/options/answer/explanation) → MCQPage 재사용. Cloze는 영어 ClozeSet과 동일 → ClozePage 재사용. 독해는 영어 CompSet과 동일 → CompPage 재사용. 신규 렌더러는 VocabMatch(MatchPage)뿐

### 시드 원본(seed_*.json)의 데이터 형태 (raw seed 규약)
- 각 섹션 items[]에 sentence/options + **answerKey(1-based 시험지표기)와 answer0(0-based 코드용) 둘 다** 저장 (변환오류 차단)
- 辨字 인라인형(문장 안 ①②③)은 variant:"inline", 나열형은 "list"
- 词语搭配·词语选择풀형은 pool[]+items[]{stem,answer0} 구조 (VocabMatch로 매핑). 词语选择풀형은 세션에 VocabMcqPool 키로 저장 → build_seed_all이 variant:'pool'로 변환
- 辨字가 한 시험지에 두 블록이면 HanziMcqB로 추가 저장 → build_seed_all이 HanziMcq에 병합
- {u}...{/u} 는 밑줄 단어 마킹(拼音 문제에서 어느 단어 묻는지)
- 클로즈 지문의 빈칸은 "(n) ___" 마커 (검증기가 마커수=blanks수 강제)

---

## 6. 검증 방법 (매 시드 추가 시)

1. 개별 시드: `node check_seed.js seed_xxx.json --explain` → "FAILS: NONE -> PASS"
2. 통합 병합: `node build_seed_all.js seed_a.json seed_b.json ...` → 전부 PASS + grand 카운트 + seed_zh_all.json 생성
3. 자가테스트 회귀: `node zh_wa1_selftest.js` → 10 pass / 0 fail 유지
4. 통합 파일은 매번 사용자가 C:\Users\gooob\psle-app\seed_zh_all.json 에 덮어쓰기 저장

---

## 7. 다음 작업 (Step 2 계속)

**목표: 声调(성조) 병목 우선 보강.** 声调 시드가 현재 1개(Tao Nan Q7 绿色)뿐. P3 학생 빈출 오답이라 최우선.

진행 순서 제안:
1. 복습모음(구 PDF p9~p48) 스캔 → 拼音(看汉字选拼音/选音节) 문항에서 声调 함정 우선 확보. 유형 다양(看图选词·组句成段·仿写 등)이라 병목 여러 개 동시 보강 가능
2. 또는 CHIJ 学段考查(신 PDF hc_59~66, 语文应용14+造句+독해问答) — 단 **CHIJ는 道南 보충/Red Swastika와 문항 중복 주의**(이전 분석: CHIJ=구 PDF Paper1과 동일 시험지 확인됨). 추출 시 seed_zh_all의 기존 문항과 지문·문장 대조해 중복 제거 필수
3. 声调·sequence·lianci 병목이 어느 정도 메워지면(각 3개 이상) Step 3(생성기) 착수 검토

각 부는 이전과 동일 방식: OCR 색인 → 래스터/사용자이미지 육안대조 → 해설 작성 → check_seed → build_seed_all → 통합본 갱신 전달. 사용자는 "다음 진행해"로 구동, 학교 지정도 가능.

**중요: 새 창에서 처음 시드를 추가하기 전에, 먼저 seed_zh_all.json을 로드해 기존 6부·89문항이 온전한지 확인하고, 거기에 이어붙이세요. 절대 처음부터 다시 만들지 마세요.**

---

## 8. 이 문서 + 파일들의 로컬 저장 위치 (사용자 안내)

사용자는 아래를 C:\Users\gooob\psle-app\ 아래에 두고, 새 채팅창 첫 메시지에 이 문서(HANDOFF)와 [1]의 필수 파일들을 첨부합니다. 자세한 첨부 목록은 함께 제공된 별도 프롬프트 파일(NEW_CHAT_PROMPT) 참조.
