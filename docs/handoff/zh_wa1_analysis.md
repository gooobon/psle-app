# P3 Chinese WA1 — 기출 분석 및 구축 계획 (이관 문서)
작성: 2026-07-06 · Genius Project (psle-app) · 원본: P3_Chinese_WA1.pdf (113p)

## 0. 프로젝트 컨텍스트
- 앱: Genius Project — 싱가포르 초등 시험 대비 웹앱. Next.js 16 / React / TypeScript, Vercel 배포 (psle-app-vwx3.vercel.app)
- repo: gooobon/psle-app (public, main 브랜치). raw.githubusercontent.com/gooobon/psle-app/main/<path> 로 파일 fetch 가능
- 로컬: C:\Users\gooob\psle-app (사용자가 PowerShell에서 node 패치 실행)
- 영어 P3 WA1은 완성: 60세트 연습 + 실제 기출 mock, 7섹션 (GrammarMCQ → VocabMCQ → GrammarCloze → VocabCloze → Editing → Synthesis → Comprehension)
- 영어 파이프라인(중국어의 템플릿):
  - 생성기 build_wa1_practice.js (repo 루트): 입력 20260622_WA1_complete.json + comp60_FINAL_8type_backup.json → src/data/p3/english/wa1_practice.ts emit → 디스크 재파싱 라운드트립 검증
  - 스키마: SectionType union + McqItem/ClozeSet/EditSet/CompSet/SynthItem interface + PlanSection + PracticeSet{setId,theme,plan[7]}
  - 렌더러: src/components/ExamSession.js (2196줄) — MCQPage(133~) / ClozePage(352~) / EditingPage(725~) / CompPage(938~) / SynthesisPage(1885~). 데이터 파일에는 UI 스타일 0개(순수 텍스트) → 렌더러만 고치면 전 세트 반영
- 작업 원칙(사용자 확립): 원자적 Node 패치 스크립트(/mnt/user-data/outputs/ 전달 → 사용자가 로컬 실행), 빌드 통과 ≠ 완료(실제 dev 화면 검증), 근본원인 수정, 추측 금지(실파일 확인), 전 데이터 스캔 후 패치, 보고는 한국어

## 1. PDF 구성 (시험지 경계 — 실물 확인 완료)
| 자료 | 페이지 | 성격 |
|---|---|---|
| Paper 1 (학교명 미상 정식 WA1) | p1–8 | 2부 구성: 语文应用 14题 + 造句 + 阅读理解问答 |
| 복습 모음집 (考查·复习 시리즈) | p9–48 | WA1 대비 연습 5~6회분 + 정답키 |
| Red Swastika 정식 WA1 | p49–67 | 8섹션 표준 + 정답 + 小复习 |
| Nanyang 计分测试(一) | p68–75 | 看图作文 + 산출형 중심 6섹션 |
| CHIJ St Nicholas HCL 보충 3세트 | p76–111 | Red Swastika와 8섹션 동일 골격 |
| Tao Nan | p112–113 | 표지+정답 1p 불완전본(참고용) |

주의 1: CHIJ 세트는 Red Swastika와 지문·문항 상당수 동일(예: "排队" 지문) → 시드 풀 구축 시 중복 제거 필수.
주의 2: 113p 전체에 听力(듣기) 없음 → P3 WA1은 지필 중심, 오디오는 범위 밖.

## 2. 학교별 섹션 구성 (시각 검증 완료)
### Red Swastika WA1 = 표준 골격 (CHIJ 3세트도 동일)
一 辨字测验 5题5分 → 二 汉语拼音(看汉字选拼音) 2题2分 → 三 词语选择 4题4分 → 四 词语搭配 5题5分 → 五 改写句子(A:두 문장 합치기 / B:개작) 4题8分 → 六 短文填空 4题4分 → 七 阅读理解(MCQ) 4题8分 → 八 理解问答(서술) 5题9分 (계 ~45分)

### Paper 1 (p1–8)
第一部分 语文应用 14题14分 (Q1-Q2 밑줄 단어 병음 고르기 + 어휘·어법 혼합 MCQ) → 二 造句 3题6分 → 三 阅读理解 问答 5题10分

### Nanyang (p68–75)
看图作文(篇中段, 15分, 40분) / (一) 改正错字 10题20分 (틀린 한자 동그라미+정정) / (二) 填写汉字 5题10分 (병음→한자 쓰기) / (三) 填写汉语拼音 3题6分 / (四) 选择句子 4题8分 / (五) 看短文回答问题 3题6分 / (六) 数笔画·写笔顺·填拼音 3题6分

### 복습 모음집 추가 유형 (p9–48)
辨字测验 / 词语选择 / 词语搭配 / 看汉字选拼音 / 看图选词(그림) / 短文填空 / 仿写句子 / 扩写句子 / 改写句子 / 组句成段(문장배열) / 阅读理解一(MCQ)·二(问答) / 看图写段·写话

## 3. 통합 유형 분류 (14종 — WA1 전 유형 포괄)
자동채점(MCQ)형:
1. 辨字测验 — 빈칸에 올바른 한자 고르기
2. 汉语拼音(看汉字选拼音) — 병음 고르기
3. 词语选择 — 어휘 MCQ
4. 看图选词 — 그림 보고 어휘 MCQ (이미지 필요)
5. 词语搭配 — 선택지 풀 매칭(각 1회 사용)
6. 短文填空 — 클로즈 MCQ
7. 选择句子 — 올바른 문장 고르기

산출형:
8. 组句成段 — 문장 배열
9. 造句/仿写/扩写/改写句子 — 자유 서술
10. 改正错字 — 오자 찾아 정정
11. 填写汉字/填写拼音 — 쓰기
12. 数笔画·写笔顺 — 획수·필순

독해·작문:
13. 阅读理解 一(MCQ)+二/理解问答(서술)
14. 看图写话/看图作文 — 그림 작문

## 4. 렌더러 매핑 (영어 재사용 분석)
- MCQPage 그대로: 辨字/选拼音/词语选择/选择句子/语文应用
- ClozePage 그대로: 短文填空
- CompPage 그대로: 阅读理解 MCQ+问答 혼합
- Synthesis 패턴(자유입력+모범답안 학습모드) 재사용: 造句/仿写/扩写/改写, 理解问答, 改正错字, 填写汉字/拼音
- 신규 소형: 词语搭配(매칭, MCQ 변형 가능) / 组句成段(배열)
- 자산 필요(후순위): 看图选词·看图写话(이미지), 笔画笔顺(획순)

## 5. 구축 Phase 계획
- Phase 1 (자동채점, 즉시): 辨字 → 拼音选择 → 词语选择 → 词语搭配 → 短文填空 → 阅读理解(MCQ) — 기존 렌더러 + 매칭 1종
- Phase 2 (학습모드): 改写/仿写/扩写/造句, 理解问答, 改正错字, 填写汉字/拼音, 组句成段
- Phase 3 (자산): 看图선词, 看图写话, 笔画笔顺
- 전체 단계: Step1 스키마 설계 → Step2 기출→구조화 JSON(OCR+수동검증) → Step3 60세트 난이도 생성기(build_wa1_practice_zh.js) → Step4 렌더러 → Step5 앱 배선(대시보드 Chinese WA1 라이브)+중문 폰트(Noto Serif SC 등) → Step6 화면 전수검증→커밋→배포
- 참고: 영어와 피드백 렌더러 공유 → 진행 중인 마인크래프트 피드백 테마가 중국어에도 자동 적용됨

## 6. 미결 결정사항 (사용자 확인 필요)
1) 60세트 시드: 이 PDF 5개 자료군(중복 제거)만으로 충분한가, 추가 학교 기출 확보하는가
2) 난이도 밴드: 易/中/难 3단계 vs 1~60 점진 — 기준(어휘 등급/문장 복잡도/干扰项 난도)
3) Phase 1 범위 확정 (권장: 자동채점 6유형 먼저)
4) 표준 세트 골격: Red Swastika 8섹션 기본 + Nanyang 산출형 선택 흡수안 승인 여부
5) 중문 시험지 폰트: 宋体 계열 vs 楷体 계열(초등 교과서체)

## 7. 동봉 데이터
- zh_wa1_ocr_pages.json: 113페이지 전체 OCR 텍스트(tesseract chi_sim, 페이지번호→텍스트 JSON). OCR 오독 주의: 辨字测验이 准字/办字/闪字/状字测验 등으로 읽힘. 정밀 작업 시 해당 페이지를 pdftoppm으로 래스터해 시각 확인할 것 (원본 PDF 필요)
- 원본 P3_Chinese_WA1.pdf는 사용자가 직접 재업로드
