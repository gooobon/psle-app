# Genius Project (psle-app) — 마스터 인계 문서

작성 2026-07-12 · **새 채팅창에서 과목별 디테일 미세조정을 이어가기 위한 단일 기준(single source of truth).**
모든 보고·소통은 **한국어**로. 이 문서 → 과목별 세부 핸드오프(아래 §8) 순으로 읽는다.

---

## 0. 지금 상태 한 줄 요약
- **P3 English WA1 연습(60세트·1,980문항): 전 문항 정독 수정 + 재시도 힌트 100% 완료.** 빌드 통과, 배포/푸시 완료.
- **P3 Chinese WA1: 별도 트랙으로 이미 상당 부분 진행됨**(§8·§9 참조).
- 학생 진도는 이제 **로그인마다 유지**되고 다음 회차부터 이어짐(자동 초기화 제거 완료).
- **다음 단계 = 과목별 디테일 미세조정.** 무엇을 조정할지는 사용자가 지정한다.

---

## 1. 새 창에서 가장 먼저 할 일
1. **`C:\Users\gooob\psle-app` 폴더를 세션에 연결(mount)** 한다. 재첨부 불필요 — 모든 자료가 repo 안에 있다.
2. 이 문서와, 손댈 과목의 세부 핸드오프(§8)를 읽는다.
3. **작업 착수 전, 무엇을 어느 수준으로 조정할지 사용자에게 1~2개 질문으로 확정**한다(예: 어느 과목/어느 섹션/어느 세트, 톤인지 정확성인지 난이도인지).
4. 커버리지·현황은 추측하지 말고 **실측 스크립트로 확인**(§4)한 뒤 보고.

### 경로 규칙 (중요)
- Read/Write/Edit/Grep/Glob: **Windows 경로** `C:\Users\gooob\psle-app\...`
- bash(python/node 실행): 연결 시 안내되는 **마운트 경로** `/sessions/<세션>/mnt/psle-app`. **세션마다 다르므로 하드코딩 금지.**
- **마운트 제약**: unlink/rename 불가(`rm`/`mv` → "Operation not permitted"). 파일은 **제자리 덮어쓰기**로만. 새 파일 생성은 가능.
- PowerShell 5.x는 `&&` 미지원 → `npm run build` / `git` 명령은 **줄 분리**.

### ★ 마운트 truncation — 반드시 알 것
호스트(Read/Write/Edit)로 파일을 **길게 늘리면**, bash 마운트는 **예전 크기로 잘린 내용**을 본다(호스트 파일은 멀쩡). 실제로 이번 작업 중 `build_wa1_practice.js`·`en_hints_merge.py`·`ExamSession.js`가 이 때문에 잘려 보였다.
- **bash로 실행할 스크립트(.py/.js)·patch(.json)는 Write/Edit 대신 `cat > file <<'EOF'` heredoc으로 작성**한다.
- 부득이 호스트에서 편집했으면 bash에서 `tail`·`wc -l`로 끝을 확인하고, 잘렸으면 bash로 다시 쓴다.
- `src/` 앱 코드는 **호스트에서 Next.js가 읽으므로 호스트 파일이 정답**. bash 파서로 문법검사하면 거짓 오류가 난다 → 검증은 `npm run build`(PowerShell)로.

---

## 2. 프로젝트 개요
싱가포르 초등(P3~PSLE) 학생용 적응형 시험 연습 웹앱. Next.js(App Router) + React, **백엔드 없음** — 계정·진도는 전부 **브라우저 localStorage**.

- **과목**: English(운영), Chinese(운영), Math·Science(Coming Soon).
- **학년 탭**: `P3 P4 P5 P6 PSLE` (이번에 PSLE 추가, 5칸 균등폭). P3 English/Chinese만 실제 콘텐츠(`LIVE_CONTENT`).
- **역할**: student / parent / admin.
- 배포: Vercel. push → 자동 배포.

### 최종 목적 (항상 명심)
**문제풀이를 통한 학생의 실제 시험 성적 향상.** 모든 판단 기준은 "이게 성적을 올리는가".

---

## 3. 저장·진도 구조 (localStorage)
`src/app/ClaudeApp.js` 상단.
- `genius_users_v2` — 계정(id/password/name/grade/school/role). **절대 자동 삭제 금지.**
- `genius_progress_v2` — 진도. 키 = `userId_grade_subject`. 값 = `{ history[], mistakes[], settings, nextSession, vocabBook, sessionSections }`.
- **이어풀기**: 세션 완료 시 `history`에 회차 추가 + `nextSession = sessionNum+1` 저장. 로그인 시 `getProgress`가 `nextSession = history.length+1`로 복원 → **마지막 푼 회차 다음부터 이어서** 출제.
- **★ 페이지 로드 시 진도를 지우는 코드를 절대 다시 넣지 말 것.** 예전에 "일회성 초기화" 블록이 로그인마다 진도를 날려 1회차로 되돌리는 사고를 냈다. 지금은 제거됨. 초기화가 필요하면 **명시적 admin 액션**으로만.

---

## 4. 현황 실측 스크립트 (bash, 마운트 경로에서)
```
# EN 힌트 커버리지 + 세트 완결 수
node -e "const d=require('./20260622_WA1_complete.json');let t=0,h=0,f=0;for(const s of d.sets){let a=0,b=0;for(const[k,sec]of Object.entries(s.sections)){if(typeof sec!=='object'||k==='G')continue;for(const q of((sec.questions||[]).concat(sec.errors||[]))){b++;if(q.retry_hint)a++;}}t+=b;h+=a;if(a===b&&b>0)f++;}console.log('완결',f+'/60','힌트',h+'/'+t);"

# EN 힌트 전수 재검사 (독립 기준) — 위반 0 이어야 정상
python3 verify_all_sets.py
python3 audit_hints.py
```

---

## 5. English WA1 힌트 시스템 — 규칙 (이 프로젝트의 핵심 자산)

### 배경
학생이 **오답을 낸 뒤 재시도 직전에 뜨는 힌트**가 전 문항 동일 폴백이었다. 기존 필드는 힌트로 쓰면 안 된다:
- `learning_tip` — 정답 단어를 그대로 노출(MCQ 99.5%). **정답 공개 후 해설용.**
- `trap_type` — 정답 노출 74.7%.
→ 그래서 **재시도 전용 힌트 `retry_hint`** 를 소스에 새로 저작했다.

### 힌트 규격 (예외 없음)
형식 = **[문장 속 결정적 단서를 대문자로 지목] + [학생이 스스로 던질 질문] + [전이 가능한 규칙 한 줄]**, 1~2문장, **260자 이내**.
1. **정답·정답구를 절대 말하지 않는다.** 다어절 정답이면 **구성 낱말**까지 금지(`more modern`이면 `more`·`modern`도). 단, 그 낱말이 **보기 2개 이상에 공통**이면 식별력이 없으므로 허용.
2. **문장 안의 단서를 대문자로 지목** — 어디를 봐야 하는지 훈련.
3. **답이 아니라 질문으로** 제시.
4. **전이 규칙 한 줄** — 다음에도 안 틀리게.
- 오답 선택지 언급은 **허용·권장**. 금지되는 건 정답 문자열뿐.

### 승인된 톤 예시 = `en_patch_S05.json`, `en_patch_S06.json`, `en_patch_S27.json`

---

## 6. English WA1 파이프라인 (세트 수정·힌트 저작 절차)

### 파일 인벤토리
| 파일 | 역할 |
|---|---|
| `20260622_WA1_complete.json` | **소스 오브 트루스.** 60세트·1,980문항. `retry_hint`가 여기 들어있다 |
| `build_wa1_practice.js` | 소스 → `src/data/p3/english/wa1_practice.ts` 재생성. retry_hint→hints, learning_tip→explanation 배선. **끝에 `ALL PASS (0 failures)` 자체검증** |
| `en_hints_merge.py` | 힌트 patch 병합 + 기계검증(정답누출/단서인용/중복/길이). `errors`·`questions` 양쪽 순회. `EN_SRC` 환경변수로 소스 교체 가능 |
| `verify_all_sets.py` | **독립 전수 검증**(힌트 누출·구성낱말·단서·중복·길이 + Cloze 구조 + Editing 밑줄위치 + MCQ stem노출 + Synthesis 원문). 현재 위반 0 |
| `audit_hints.py` | 소스의 모든 retry_hint를 병합 규칙으로 재검증 |
| `en_patch_S01.json`…`S60.json` | 세트별 힌트 patch (저작 톤 기준) |
| `fix_s01_s03_s06.py`, `fix_s07_s10.py` … `fix_s56_s60.py` | 세트별 결함 수정 스크립트 (self-check 내장) |
| `src/data/p3/english/wa1_practice.ts` | **앱이 읽는 생성물. 직접 수정 금지** (헤더에 DO NOT EDIT) |
| `src/components/ExamSession.js` | 렌더러 |

### 절차 (세트당)
1. **세트 덤프** — 전 문항(지문·보기·정답·trap·tip) 출력해 정독.
2. **정답 정독 검증** — 정답을 문장에 실제 대입해 읽는다. 결함이면 `fix_*.py`에 수정 추가(self-check 필수).
3. **힌트 저작** — `en_patch_SXX.json` (`{"setId":"SXX","hints":{"SXX_A1":"...",...}}`).
4. **병합·검증** — `python3 en_hints_merge.py en_patch_SXX.json --dry` → `DRY OK` 후 `--dry` 없이 병합.
5. **빌드** — `node build_wa1_practice.js` → `ALL PASS (0 failures)`. `.ts` 자동 재생성.
6. **전수 재검사** — `python3 verify_all_sets.py` 위반 0 확인.

### 섹션 구성 (세트당 33문항)
A Vocab MCQ 5 · B Grammar MCQ 8 · C Grammar Cloze 8 · D Vocab Cloze 5 · E Editing 5 · F Synthesis 2. (G Comprehension은 힌트 대상 아님.)

### ★ 스키마가 세트마다 갈린다 (전수 처리 시 함정)
- Editing 문항이 `sections.E.errors`인 세트 vs `sections.E.questions`인 세트.
- 오류어 키가 `wrong_word` vs `error_word`.
- Cloze `word_box`가 **dict**(A~H, 정답=letter) vs **배열**(정답=단어). 배열형은 merge가 누출검사를 못 하니 별도 검사 필요.
→ 스크립트는 **두 경우 모두** 처리해야 한다. 한쪽만 보면 조용히 아무것도 안 고치고 통과한다.

---

## 7. 데이터셋에서 반복 발견된 결함 유형 (미세조정 시 계속 만날 것)
구조 검사는 통과하는데 정독하면 세트당 1~3건씩 나온다. **60세트 전수 정독으로 다음을 다 잡았지만, 다른 시험지(EOY/과거문제)·중국어에는 남아 있을 수 있다.**
1. **Cloze 지문이 다른 문제 것** — box·해설은 A를 가리키는데 지문은 B를 요구 → 정답 대입 시 전부 비문.
2. **Cloze 정답이 빈칸과 밀림**(right words, wrong slots).
3. **미사용 오답이 지문 본문에 노출** → 오답 보기 무력화.
4. **Vocab Cloze(D) 오답 0개**(보기5=빈칸5) → 소거법으로 만점. **오답 3개 추가**(어느 빈칸에도 못 들어가는 것)해서 8개로.
5. **MCQ 정답이 자기 stem에 노출** / 정답이 둘 / 정답이 하나도 없음(문미 `before`가 현재완료 강제).
6. **Editing 오류어가 실재하지 않는 형태**(`rangers's`) → 아포스트로피 누락형으로.
7. **★ Editing 밑줄 오작동** — 렌더러가 `sentence.indexOf(wrongWord)`로 밑줄 → 오류어의 **첫 등장이 곧 밑줄 자리**여야 함. 부분문자열 함정(`here`⊂`there`, `was`⊂`washed`).
8. **Cloze 보기를 두 번 써야 하는 문항** → 렌더러가 값으로 비활성화 → **앱에서 풀 수 없음**.
9. **Synthesis 원문 문장 없음**(`sentence1` undefined) / 간접화법 시제역행 오류.

---

## 8. 과목별 세부 핸드오프 (손대기 전 반드시 읽을 것)
| 과목/영역 | 문서 |
|---|---|
| **English WA1 힌트·정답** | `EN_WA1_HANDOFF_v1.md` (섹션 7에 전 세트 결함 이력, 도구 결함 이력) |
| **English 판단 콜 검토목록** | `DECISIONS_FOR_REVIEW.md` — 내가 사용자 확인 없이 내린 결정 전부(정답키 변경, D 오답 추가, box 교체 등). **미세조정은 여기부터 훑고 시작하는 게 효율적** |
| **Chinese WA1** | `ZH_WA1_HANDOFF_v10.md` (최신). 그 외 v3~v9 이력 |
| **Chinese 해설 품질** | `ZH_WA1_EXPL_QUALITY_PLAN.md` |

---

## 9. Editing 렌더러 UI (이번에 바꾼 것 — 다른 과목에도 영향 가능)
`src/components/ExamSession.js` EditingPage.
- **바뀐 흐름**: 오답 → **정답 숨김 + "Not quite! Hint:"(retry_hint)** → 재입력(placeholder는 `_ _ _ _` 글자수만) → 재입력 후 **정답 + explanation(learning_tip) 공개**.
- 이전엔 오답 즉시 정답을 보여줘 재시도가 무의미했고, placeholder가 정답 철자를 흘렸다.
- 관련 상태: `answerRevealed`(재시도했거나 리뷰모드), `showRetryHint`.
- MCQ/Cloze/Synthesis 렌더러 계약: `q.hints[0]` / `b.hint` / `q.hint`. 빌드가 retry_hint를 이 필드로 내보낸다.

---

## 10. 빌드·배포 (PowerShell, 줄 분리)
```
cd C:\Users\gooob\psle-app
npm run build          # ✓ Compiled successfully 확인
git add -A
git commit -m "메시지"
git push               # Vercel 자동 배포
```
- 샌드박스(bash)는 네트워크가 막혀 `npm run build`·`git push` 불가 → **빌드/커밋/푸시는 PowerShell에서 사용자가 실행**.
- bash에서는 `.git/index.lock` 생성 후 삭제가 안 되니(마운트 제약) **git 명령을 bash로 돌리지 말 것.**

---

## 11. 함께 지키는 기본 규칙 (사용자가 반복 강조)
1. **넘겨짚지 말 것.** 추측 보고 금지, 실제 파일을 열어 확인 후 판단. 오탐은 정직하게 오탐이라 보고.
2. **전수조사.** "몇 개 봤더니 괜찮다" 금지. 검사 기준 자체도 비판적으로 검증.
3. **근본 수정.** 증상만 가리는 땜질 금지.
4. **수정 후 반드시 검증.** 빌드 통과 + 전수 검사 + diff로 의도한 변경만 일어났는지 확인.
5. **판단이 필요하면**: 힌트 목적·규칙에 가장 부합하는 방향으로 **스스로 결정하고 진행**하되, 그 결정들을 **리스트업**해서 사용자가 나중에 하나씩 확인·수정할 수 있게 한다(이번에 `DECISIONS_FOR_REVIEW.md`로 함).
6. 보고는 **한국어**, 간결하게. 무엇을 왜 고쳤는지 + 남은 위험을 정직하게.
7. **파일 공유**는 `present_files`로.

---

## 12. 커밋되는 산출물 요약 (repo 루트)
- 소스/빌드: `20260622_WA1_complete.json`, `build_wa1_practice.js`, `src/data/p3/english/wa1_practice.ts`
- 도구: `en_hints_merge.py`, `verify_all_sets.py`, `audit_hints.py`
- patch: `en_patch_S01.json`…`S60.json` / 수정: `fix_*.py`
- 앱: `src/components/ExamSession.js`, `src/components/Dashboard.js`, `src/app/ClaudeApp.js`
- 문서: `HANDOFF_MASTER.md`(이 문서), `EN_WA1_HANDOFF_v1.md`, `DECISIONS_FOR_REVIEW.md`, `ZH_*` 시리즈
