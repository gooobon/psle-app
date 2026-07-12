# P3 English WA1 — 힌트 저작 + 정답 검증 인계 문서 (Handoff v1)

작성: 2026-07-11 · Genius Project (psle-app) · **이 문서는 새 채팅창에서 "영어 WA1 재시도 힌트 저작 + 정답 정독 검증"을 이어가기 위한 유일한 기준(single source of truth)입니다. 모든 보고·소통은 한국어로 합니다.**

---

## 0. 새 창에서 가장 먼저 할 일

1. **`C:\Users\gooob\psle-app` 폴더를 세션에 연결(mount)한다.** 파일 재첨부 불필요 — 모든 자료가 repo 안에 있다.
2. 이 문서 [2 규격][3 파이프라인][4 규칙][6 함정]을 읽고, [5 현재 상태]의 커버리지 스크립트를 실행해 실제 상태를 5줄로 요약·보고.
3. **첫 작업 = S02부터 세트 단위 루프.** 세트 하나를 열어 ①전 문항 정답 정독 검증 → ②힌트 저작 → ③검증·병합 → ④빌드. 한 번 읽기로 둘 다 끝낸다.

### 경로 규칙
- Read/Write/Edit/Grep/Glob: Windows 경로 `C:\Users\gooob\psle-app\...`
- bash(python/node 실행): 연결 시 안내되는 마운트 경로(`/sessions/<세션>/mnt/psle-app`). **세션마다 다르므로 하드코딩 금지.**
- **마운트 제약**: unlink/rename 불가(`rm`/`mv` → "Operation not permitted"). 파일은 **제자리 덮어쓰기**로만 갱신. 새 파일 생성은 가능.
- PowerShell 5.x는 `&&` 미지원 → `npm run build` / `npm run dev` 줄 분리.

---

## 1. 배경 — 왜 이 작업을 하는가

학생이 **오답을 냈을 때 재시도 직전에 뜨는 힌트**가 전 문항 동일한 폴백 문구(`"Think carefully and try again!"`)로 나오고 있었다. 원인은 렌더러가 읽는 `hints` 필드가 **1,955문항 중 0개**였기 때문.

**핵심: 기존 필드를 그대로 연결하면 절대 안 된다.**
- `learning_tip` — 전 문항에 있으나 **정답 단어를 그대로 노출(MCQ 776/780 = 99.5%)**. 예: `Nobody KNOWS = add -S`, `TELL → TOLD`. 이건 **정답 공개 후 해설용**이지 힌트가 아니다.
- `trap_type` — 정답 노출 **74.7%**. 그런데 빌드가 Cloze/Synthesis에서 `hint: q.trap_type`으로 매핑하고 있어서 **이미 정답을 알려주고 있었다**. 이 매핑은 제거함.

→ 따라서 **재시도 시점 전용 힌트(`retry_hint`)를 새로 저작**한다.

**최종 목적(항상 명심): 문제풀이를 통한 학생 실제 시험 성적 향상.** 모든 판단 기준은 "이게 성적을 올리는가".

---

## 2. 힌트 규격 ★핵심★

### 형식
**[문장 속 단서 지목] + [학생이 스스로 던질 질문]**, 1~2문장, **260자 이내**.

### 4대 원칙 (예외 없음)
1. **정답·정답구를 절대 말하지 않는다.** (기계 검증으로 강제, 단어 경계 검사)
2. **문장 안의 결정적 단서를 대문자로 지목한다.** 어디를 봐야 하는지 훈련 → 다음에 같은 유형을 스스로 찾게.
3. **답이 아니라 질문으로 제시한다.** "Ask: does a singular subject take the plain verb, or the one ending in -s?"
4. **전이 가능한 규칙 한 줄**을 남긴다. 이번 문제만이 아니라 다음에도 안 틀리게.

### 승인된 예시 (사용자 톤 확정 완료)
```
S01_B1 (정답 knows — 한 번도 말하지 않음)
"Look at the subject: NOBODY. Words like nobody, everyone and somebody act like ONE person,
 even though they feel like many. Ask: does a singular subject take the plain verb, or the
 verb ending in -s?"

S03_A1 (정답 limp)
"The dash explains it: her arms were TOO tired to lift anything, and they are compared to
 NOODLES. Ask: are cooked noodles firm and springy, or floppy and drooping? Match the
 adjective to the noodles, not to temperature."

S03_B7 (정답 themselves)
"The subject is the TWINS - two people, and they are not the speaker. Ask: does the reflexive
 pronoun point back to one boy, to a thing, to us, or to them? Match it to who actually did
 the cleaning."
```
오답 선택지를 언급하는 것은 **허용**(오히려 유용). 금지되는 것은 **정답 문자열**뿐.

---

## 3. 파이프라인 (세트당 절차)

bash에서 마운트 경로로 이동해 실행.

1. **세트 덤프** — 아래 스크립트로 한 세트 전 문항(지문·보기·정답·trap)을 출력.
```
node -e "
const d=require('./20260622_WA1_complete.json');
const s=d.sets.find(x=>x.set_id==='S02');
for(const [k,sec] of Object.entries(s.sections)){
  if(typeof sec!=='object'||!sec.questions) continue;
  console.log('===== Sec '+k+' ('+sec.questions.length+') : '+sec.label+' =====');
  if(sec.word_box) console.log('box: '+JSON.stringify(sec.word_box));
  if(sec.passage) console.log('passage: '+sec.passage);
  for(const q of sec.questions){
    console.log(' ['+q.question_id+(q.blank_number?' b'+q.blank_number:'')+'] ans='+JSON.stringify(q.answer));
    if(q.stem) console.log('    stem: '+q.stem);
    if(q.options) console.log('    opts: '+JSON.stringify(q.options));
    if(q.error_word) console.log('    error: '+q.error_word+' -> '+q.correction);
    if(q.model_answer) console.log('    model: '+q.model_answer);
  }
}"
```
2. **① 정답 정독 검증** — [4 규칙]대로 모든 정답이 문법·의미상 맞는지 사람이 읽어 판정. 결함이면 [7 결함 유형]대로 수정.
3. **② 힌트 저작** — `en_patch_S02.json` 작성:
```
{ "setId": "S02",
  "hints": { "S02_A1": "...", "S02_B1": "...", ... } }
```
4. **③ 검증·병합** — `python3 en_hints_merge.py en_patch_S02.json --dry` → `DRY OK` 확인 후 `--dry` 없이 병합.
5. **④ 빌드** — `node build_wa1_practice.js` → `ALL PASS (0 failures)` 확인. `.ts`가 자동 재생성됨.

### 기계 검증 항목 (en_hints_merge.py 내장 — 하나라도 실패 시 병합 거부)
- **정답 누출 금지** (단어 경계 검사 — `us`가 `because`에 걸리지 않게)
- **문장 속 단서 인용 강제** — 힌트의 대문자 토큰 또는 '따옴표' 토큰이 실제 문항(stem/passage/instruction/error_word)에 존재해야 통과
- **문항 간 중복 금지**
- **길이 260자 이내**

---

## 4. 정답 검증 규칙 (사람이 읽을 때 반드시 확인)

### 구조 검증은 이미 0건 (자동화 완료)
정답 인덱스 유효성 · 선택지 중복 · Cloze 정답이 word_box에 존재 · 빈칸수=문항수 · Editing 오류단어가 지문에 존재 · Synthesis 모범답안 존재 — **전부 0건**.

### 남은 것은 "구조는 멀쩡한데 뜻이 틀린" 부류 = 반드시 정독
세트를 읽을 때 아래를 하나씩 확인한다.
- **Cloze**: 정답을 빈칸에 **실제로 대입해 문장을 소리내어 읽어본다.** 말이 되는가?
  - 보기 세트가 지문이 요구하는 **품사를 모두 갖고 있는가**? (명사 자리인데 형용사만 있는 box = 결함)
  - `told/showed/gave` 뒤는 **목적격 대명사** 자리다.
  - `watch/see/hear + 목적어 + 원형동사` (예: "watched the otter **swim**", `swims` 아님)
  - `keep + -ing`, `has/have + 과거분사`
  - **"Use each word ONCE only"** 지시문이면 재고 초과 사용은 결함. (단, word_box가 **배열**이고 같은 단어가 두 번 들어있으면 두 번 사용이 정상 — S47/C가 이 케이스)
- **MCQ**: 정답이 문법·문맥상 유일하게 옳은가. 다른 보기도 성립하지 않는가.
- **Editing**: `error_word`가 지문에 **실제로 그 형태로** 존재하는가. `correction`과 다른가.

---

## 5. 현재 상태 (실측)

### 힌트 저작 — **완료 (2026-07-12)**
- **1,980 / 1,980 (100%) — 60세트 전부 완결(각 33/33).** 빌드 `ALL PASS (0 failures)`.
- **세트당 33개 = A5 + B8 + C8 + D5 + E5 + F2.**
- 검사기 두 개를 반드시 쓸 것:
  - `python3 audit_hints.py` — 소스의 모든 retry_hint를 병합 규칙으로 재검증.
  - `python3 verify_all_sets.py` — **독립 기준 전수 검증**(힌트 누출·다어절 정답의 구성 낱말·단서 인용·중복·길이, Cloze 빈칸수/중복사용/오답 노출, Editing 밑줄 위치, MCQ 정답의 stem 노출, Synthesis 원문 존재). 현재 **위반 0**.
- 내가 사용자 확인 없이 내린 판단은 전부 **`DECISIONS_FOR_REVIEW.md`** 에 정리했다. 다음 세션은 이 문서부터 볼 것.

### 섹션별 문항수 (총 1,955)
| Sec | 유형 | 문항 |
|---|---|---|
| A | Vocabulary MCQ | 300 |
| B | Grammar MCQ | 480 |
| C | Grammar Cloze | 480 |
| D | Vocabulary Cloze | 300 |
| E | Editing | 275 |
| F | Synthesis | 120 |

### 정답 검증
- 구조 검증: **전 항목 0건** (자동)
- 정독 검증 완료: S01, S02, S03, S04, S05 (S02·S04·S05는 결함 수정까지 완료)
- **미확정 의심 1건**: S30/C — `told` 뒤 `herself` (목적격 자리). 정독 필요.
- **결함 밀도 실측(정독 5세트 기준): Cloze C/D 결함 4건, Editing 결함 7건.** 구조 검사는 전부 통과하는데
  정독하면 세트당 1~3건이 나온다. **전 60세트 정독은 선택이 아니라 필수.**

---

## 6. 함정 — 반드시 읽을 것 (실제로 겪은 실수들)

1. **휴리스틱으로 대량 판정하지 말 것.** 품사 추정 스캔(`-s/-ed/-ing`로 끝나면 동사)을 돌렸더니 `canvas`·`hypothesis`·`wireless`·`anonymous`를 동사로 **오판**했고, 정작 정독으로 찾은 S02/D는 **놓쳤다.** 오탐도 내고 진짜도 놓친다. **대량 수정의 근거로 쓰면 멀쩡한 데이터를 망친다.**
2. **`.ts`는 생성물이다.** `src/data/p3/english/wa1_practice.ts` 헤더에 `DO NOT EDIT BY HAND`. 반드시 **소스 JSON을 고치고 `build_wa1_practice.js`로 재생성**한다. 재생성 후 `diff`로 의도한 줄만 바뀌었는지 확인할 것.
3. **화면에 뜨는 세트를 확인할 것.** "힌트가 안 나온다"는 신고를 받았을 때, 실제로는 저작한 세트(S01)가 아니라 **다른 세트(S03)가 화면에 떠 있었다.** 커버리지 문제를 버그로 오진하지 말 것.
4. **파일 truncation 주의.** 큰 파일을 전체 재작성하면 끝이 잘린 채 저장되는 사고가 두 번 있었다(`ExamSession.js`, `en_hints_merge.py`). 수정 후 반드시 `tail`로 끝을 확인하고, JS/JSX는 파서로 검증할 것.
5. **정답 교정이 힌트보다 먼저다.** 틀린 정답 위에 힌트를 얹으면 학생을 틀린 답으로 유도한다.

---

## 7. 발견·수정된 결함 이력

### 7-A. 수정 완료 (원본 백업: `outputs/en_source.before_fix.json`)
| 대상 | 진단 | 조치 |
|---|---|---|
| S03_B5 | 문장에 빈칸이 없고 정답 `All`이 문장에 박혀 있어 무엇을 묻는지 알 수 없음 | stem을 `________ of the children…`으로 교정(언더스코어 8개 표준) |
| S01/C | box에 `he` 없음 → 남성 단수 주어(Raju) 표현 불가, 정답 `they`가 비문 | box를 `he` 포함으로 교체하고 지문을 8개 보기가 각각 정확히 한 번씩 쓰이게 재구성 |
| S05/C | box에 `him` 없음 → "thanked ___"가 `his`로 비문 | 동일하게 box·지문 재구성 |
| S04/C | `behind`가 들어갈 자리가 없고 `on`이 2회 필요 | 6번 문맥을 "community centre"로 바꿔 `behind`에 자리 부여, 정답 재배정 |
| S22/D | `rehearsal` 2회 필요, `trembled` 미사용 | 3번 빈칸을 "무대 뒤에서 긴장으로 떨었다"로 바꿔 `trembled`에 자리 부여 |
| S24_E1 | 지문 오류어는 `fishes`인데 `error_word`가 `"fish"` → 오류=수정 동일 | `fishes`로 교정 |
| S47/C | — | **오탐**. box가 배열이고 `her`가 두 개 → 두 번 사용 정상. 정답 전부 맞음 |

### 7-B. 미수정 — S02 착수 시 최우선 ★
**S02/C** (Grammar Cloze). box = `catch/caught/catches/catching/swim/swam/swimming/swims`(동사 변화형)인데 지문 빈칸 상당수가 **대명사 자리**다.
- "because (3)___ **was playful**" → `it` 필요, 정답 `swim` → "because swim was playful"
- "Our teacher **told** (5)___ to watch" → `us` 필요, 정답 `caught`
- "The guide **showed** (7)___ a video" → `us` 필요, 정답 `catch`
- "We **watched** a sea otter (1)___" → `watch+목적어+원형` = `swim`인데 정답 `swims`(비문)
→ 8개 보기를 **뜻과 무관하게 순서대로 배정**해 놓은 상태. **지문을 동사변화형 8빈칸으로 재작성**해야 함.

**S02/D** (Vocabulary Cloze). box에 명사가 없는데 지문이 명사를 요구.
- "placed it in a small (2)___" → `box`류 필요, 정답 `afraid` → "a small afraid"
- "feathers were (3)___ from the rain" → `wet` 필요, 정답 `gentle`
- "became more (5)___" → 정답 `surprised` 부적절
→ 지문 또는 box 재구성 필요.

> 이 두 섹션은 **구조 검사를 통과하지만 학생이 절대 못 푼다.** 같은 병(지문과 box가 다른 문제에서 온 것처럼 어긋남)이 다른 Cloze 섹션에도 있을 수 있으므로, **120개 Cloze 섹션을 전부 정독**해야 한다.

### 7-B(완료). S02 — 2026-07-11 수정됨
- **S02/C**: 지문을 동사변화형 8빈칸으로 재작성(watched…swim / kept swimming / sign says…swims / last winter…swam / caught / an otter always catches / kept catching / to see it catch). 보기 8개가 정확히 1회씩.
- **S02/D**: 지문 재작성 → 정답 tiny·chased·afraid·rescue·safe (오답 gentle·noisy·surprised).
- **S02_A4**: "she was ___ — she **was** so worried" 시제 모순 → "she **had been** so worried".
- 스크립트: `fix_s02_cloze.py`

### 7-C. S04·S05 — 2026-07-11 수정됨 (같은 병이 계속 나온다)
| 대상 | 진단 | 조치 |
|---|---|---|
| S04/C | 정답은 옳으나 blank1 `at the end of our street`가 `at`(blank2 전용)과 충돌, blank6는 `behind`를 고를 단서가 지문에 없음. trap_type에 저작 중 메모("Let me reassign", "Redesign")가 그대로 남아 있었음 | 두 문장에 단서 삽입, tip 교체. 정답 letter 유지 |
| S04/D | **지문이 통째로 다른 문제 것.** box·tip은 "버스정류장에서 노인이 가방을 떨어뜨리고 소녀가 도왔다"를 가리키는데 지문은 "동네 가게 소개"(명사 자리) → 정답 5개 전부 비문 | 원래 의도대로 지문 복원. 정답 letter 유지 |
| S04/E | 5문항 중 **4개 결함**. `near→nearby`(고치면 오히려 비문), `there→their`(고쳐도 organisers' 가 맞음), `were→was`(영국식 허용 = 애매), `neighbourhood's's`(비실전) | 지문 재작성 + 오류 5개를 명확한 5유형으로 교체 |
| S05/D | 정답은 옳으나 **미사용 보기 3개(paid/favourite/delighted)가 지문 본문에 그대로 노출** → 오답 보기 무력화 | 지문 재작성. 정답 letter 유지 |
| S05/E | 5문항 중 **3개 결함** (S04와 동일 유형) | 지문 재작성 + 오류 재구성 |

스크립트: `fix_s04.py`, `fix_s05.py`. 세 파일 모두 `--dry` 자체검증 내장(빈칸수·중복정답·오류어 지문 내 1회 등장).

### 7-E. S01·S03·S06 — 2026-07-11 수정됨 (`fix_s01_s03_s06.py`)
| 대상 | 진단 | 조치 |
|---|---|---|
| S01/D | blank5 "Amy's mum came to school and **returned** the bottle to Amy" — 병은 사무실에 있었으므로 엄마가 돌려줄 수 없다(사건 순서 불성립) | 마지막 문장을 "the office teacher returned…"로 재작성 |
| S03/C | blank8 "What a **is cleaning** and tidy home" = 비문. box의 `is cleaning`이 갈 자리가 없었다 | blank7을 현재진행 자리로, blank8을 형용사(clean) 자리로 재배치 |
| S03/D | 미사용 보기 3개(helpful/proud/surprised)가 지문 본문에 노출 (S05/D와 동일 병) | 지문 재작성 |
| S03/E | `was`가 지문에 2회 → 밑줄 오작동. "cleaners's" 비현실 | 지문 재작성 + 오류 재구성 |
| S03/F1 | "Did you remember…?"의 간접화법은 `had remembered` (시제 일치) | model 교정 |
| S06/D | **완전 파손.** box(breeze/drenched/forecast/shelter/soaked)와 지문(tropical/umbrella/weather vane/overflow를 요구)이 서로 다른 문제. **보기가 5개뿐이라 오답 보기가 0개** | 지문·box 전면 재작성(보기 8, 정답 5) |
| S06/F | `sentence1`/`sentence2`가 **아예 없음(undefined)** → 학생이 볼 원문이 화면에 뜨지 않음 | model에서 원문 복원 |
| S06/C | blank6 "wear jackets **before** the visit" 어색 | "put on our jackets before the visit"로 자연화 |
| S01/E·S02/E·S03/E·S06/E | `students's` / `rangers's` / `cleaners's` / `neighbours's` = **실재하지 않는 형태** | 아포스트로피 누락형(`students` → `students'`)으로 교체 |
| **S02/E ★** | 34번 오류어 `here`가 33번 문장의 **`there` 안에 먼저 걸려** 렌더러(`indexOf`)가 **엉뚱한 글자에 밑줄**을 쳤다 | "goed (33) **there** by bus" → "goed (33) **to the park** by bus" |

> **Editing 오류어 검증 규칙(중요):** 렌더러는 `sentence.indexOf(wrongWord)`로 밑줄을 친다. 따라서 오류어는 지문에서 **첫 등장이 곧 밑줄 자리**여야 한다. 부분문자열 포함(`here` ⊂ `there`, `was` ⊂ `washed`)까지 봐야 한다. `fix_s01_s03_s06.py`의 self-check가 이 규칙을 강제한다 — **다음 세트에도 반드시 재사용할 것.**

### 7-F. 세트별 스키마가 갈린다 (전수 처리 시 함정)
- Editing 문항이 `sections.E.errors`인 세트(55) vs `sections.E.questions`인 세트(5).
- 오류어 키가 `wrong_word`인 세트 vs `error_word`인 세트(S06 등).
- Cloze `word_box`가 **dict**(A~H)인 세트 vs **배열**인 세트(S06 등) — 정답도 각각 `"H"` vs `"at"`.
→ 스크립트는 반드시 **두 경우를 모두** 처리해야 한다. 한쪽만 보면 조용히 아무 것도 안 고치고 통과한다.

### 7-D. 도구 자체의 결함 (2026-07-11 — 1·2 수정 완료, 3은 상시 주의)
1. **Editing 힌트 배선 완료 — 렌더 순서를 바꿨다.** (사용자 결정: "힌트를 먼저")
   - 이전: 오답 → **정답을 즉시 표시** → 재입력. (재시도 힌트가 들어갈 자리가 없었고, 재입력 칸의 placeholder가 `w . e . n . t` 처럼 **정답 철자를 그대로 흘리고** 있었다.)
   - 지금: 오답 → **정답 숨김 + "Not quite! Hint:" 박스(retry_hint)** → 재입력(placeholder는 `_ _ _ _` 글자수만) → 재입력 후 **정답 + learning_tip 공개**.
   - 코드: `ExamSession.js` EditingPage에 `answerRevealed`(= 재시도했거나 리뷰모드) / `showRetryHint` 도입. `build_wa1_practice.js`의 Editing 매핑에 `hints`(retry_hint)·`explanation`(learning_tip) 추가, `EditItem` 인터페이스 확장.
   - **8절의 "Editing: item.hints?.[0]" 는 원래 사실이 아니었다** (그 행은 Comprehension 렌더러였음). 이제는 사실이 되었다.
2. **`en_hints_merge.py` 수정 완료.** `sections[*].questions` 에 더해 **`errors` 배열도 순회**(E가 `errors`인 세트가 60개 중 5개, S02 포함). 또 **patch에 있으나 매칭되지 않은 question_id는 이제 실패**로 처리한다(예전엔 조용히 버려졌다).
3. **★ 마운트 읽기 truncation — 원인 규명.** 호스트(Read/Write/Edit)로 파일을 **늘리면**, bash 쪽 마운트는 **예전 파일 크기로 잘린 내용**을 보여준다. 호스트 파일은 멀쩡한데 bash가 뒷부분을 못 본다.
   - 실제 사고: 호스트에서 `build_wa1_practice.js`를 편집 → bash에서 실행했더니 **끝의 검증·`ALL PASS` 출력 블록이 통째로 잘려** 조용히 검증 없이 통과했다. `en_hints_merge.py`도 같은 이유로 `SyntaxError`.
   - **규칙: bash에서 실행할 파일(.py/.js)과 patch(.json)는 Write/Edit 대신 bash heredoc으로 작성한다.** 부득이 호스트에서 편집했다면 bash에서 `wc -l`·`tail`로 끝을 확인하고, 잘렸으면 bash로 다시 쓴다.
   - `src/` 아래 앱 코드(ExamSession.js 등)는 **호스트에서 Next.js가 읽으므로 호스트 파일이 정답**이다. bash가 잘려 보여도 앱은 정상. 단 bash로 문법검사를 하면 거짓 오류가 난다.

---

## 8. 파일 인벤토리 (repo 안)

| 파일 | 역할 |
|---|---|
| `20260622_WA1_complete.json` | **소스 오브 트루스.** 60세트·1,955문항. 여기에 `retry_hint`를 추가한다 |
| `build_wa1_practice.js` | 소스 → `src/data/p3/english/wa1_practice.ts` 재생성. `retry_hint` → `hints` 매핑 배선 완료 |
| `en_hints_merge.py` | 힌트 patch 병합 + 기계검증(누출/단서/중복/길이) |
| `en_patch_S01.json`, `en_patch_S03.json` | 완료된 patch 예시 — **저작 톤의 기준** |
| `src/data/p3/english/wa1_practice.ts` | 앱이 읽는 생성물. **직접 수정 금지** |
| `src/components/ExamSession.js` | 렌더러. `q.hints?.[0]` / `b.hint` / `q.hint`를 읽음. **수정 불필요** |

### 렌더러 계약 (수정하지 말 것)
- MCQ: `q.hints[0]` → 오답 후 "Not quite! Hint:" 박스
- Cloze: `b.hint`
- Synthesis: `q.hint`
- Editing/Comprehension: `item.hints?.[0]`
→ 빌드가 `retry_hint`를 이 필드들로 내보내므로, **소스에 `retry_hint`만 채우면 자동 렌더**된다.

---

## 9. 함께 유지되는 기본 규칙 (사용자가 반복 강조)

1. **넘겨짚지 말 것.** 추측으로 보고하지 말고 **실제 파일을 열어 확인**한 뒤 판단한다. 오탐을 냈으면 정직하게 오탐이라고 보고한다.
2. **전수조사.** "몇 개 봤더니 괜찮다"가 아니라 **전 세트·전 문항**을 검사한다. 검사 기준이 틀렸을 수 있으니 **기준 자체를 비판적으로 검증**한다.
3. **근본 수정.** 증상만 가리는 땜질 금지. (예: `isZh` 미정의를 한 줄만 고쳤다가 다음 렌더에서 또 터진 사고)
4. **수정 후 반드시 검증.** 빌드 통과 + `diff`로 의도한 변경만 일어났는지 확인.
5. 보고는 **한국어**, 간결하게. 무엇을 왜 고쳤는지와 남은 위험을 정직하게.

---

## 10. 새 창 첫 메시지 (권장)

> "psle-app 폴더를 연결하고 EN_WA1_HANDOFF_v1.md 를 읽어. 힌트 커버리지부터 확인하고, S02의 Cloze C·D 결함(7-B) 수정부터 시작해서 정답 정독 검증 + 힌트 저작 루프로 진행해."
