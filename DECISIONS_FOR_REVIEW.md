# 판단 콜 검토 목록 (2026-07-12)

60세트 전수 정독·수정·힌트 저작을 끝내면서, **사용자 확인 없이 내가 판단해서 결정한 것들**을 전부 적는다.
전부 "학생이 문장에서 스스로 답에 도달할 수 있어야 하고, 힌트는 답을 알려주면 안 된다"는 원칙에 맞춰 결정했다.
하나씩 보고 마음에 안 드는 것만 말해주면 되돌리거나 다시 고친다.

각 항목: **[대상] 무엇을 / 왜 / 되돌리는 법**

---

## A. 전 세트에 일괄 적용한 규칙 (가장 중요 — 여기부터 봐주면 좋겠다)

### A-1. Vocabulary Cloze(D)에 오답 보기 3개씩 추가 — **약 50세트에 적용**
- **무엇**: D 섹션 상당수가 `보기 5개 = 빈칸 5개`(오답 0개)였다. 학생이 뜻을 몰라도 **소거법으로 5개를 다 맞힌다.**
- **왜**: 시험 성적 향상이 목적인데, 소거법으로 풀리는 문항은 어휘를 가르치지 못한다. S06/D가 원래 보기 8·정답 5 구조였으므로 그 설계를 표준으로 삼았다.
- **원칙**: 추가한 오답은 **어느 빈칸에도 들어갈 수 없는 것**만 골랐다(품사·의미 동시 불일치). 지문 본문에 등장하지 않는 단어만 사용.
- **되돌리기**: 각 `fix_sXX_sYY.py`의 word_box 추가 3개를 지우면 원상복구.

### A-2. 비실재형 소유격 오류어를 전부 교체 — **약 55세트**
- **무엇**: `rangers's`, `students's`, `teachers's`, `childrens'` 등 **영어에 존재하지 않는 형태**가 Editing 오류어로 쓰이고 있었다.
- **왜**: 실제 시험에서 학생이 저지르는 오류는 **아포스트로피 누락**(`students` → `students'`)이다. 존재하지 않는 형태를 고치는 연습은 시험에 도움이 안 된다.
- **예외로 남긴 것**: `it's → its`(S41), `children → children's`(S46), `librarians' → librarian's`(S53) — 이건 실재하는 오류 유형이라 유지.

### A-3. Editing 오류어의 "첫 등장 = 밑줄 자리" 규칙 강제 — **약 15세트**
- **무엇**: 렌더러가 `sentence.indexOf(wrongWord)`로 밑줄을 친다. 오류어가 지문 앞쪽에 **부분 문자열로라도 먼저 나오면 엉뚱한 글자에 밑줄**이 그어진다.
  - 실제 사례: `here` ⊂ `there`(S02), `was` ⊂ `washed`, 앞 문장의 `their`·`was`·`to`가 먼저 걸림(S12·S16·S18·S20·S29·S32·S35·S39·S40·S43·S47·S54·S59·S60).
- **왜**: 학생이 **밑줄 쳐진 엉뚱한 단어**를 보고 답을 쓰게 된다. 문항이 아예 성립하지 않는다.
- **조치**: 앞쪽 문장을 바꾸거나, 오류어를 지문에 아직 안 나온 명사로 교체.

### A-4. Cloze 보기가 두 번 필요한 문항 수정 — S46/C, S47/C, S53/C
- **무엇**: 정답이 같은 보기를 두 번 요구했다.
- **왜**: 렌더러는 사용한 단어를 **값(문자열)으로 비활성화**한다(`Object.values(answers).includes(w)`). 배열에 같은 단어를 두 개 넣어도 하나 쓰면 둘 다 죽는다 → **앱에서 풀 수 없다.**
- **참고**: 기존 인계문서의 "S47/C는 오탐(배열에 her가 2개니 정상)" 판정은 **렌더러 기준으로 오판**이었다. 실제 결함으로 확정하고 고쳤다.

### A-5. 힌트에서 정답의 "구성 낱말"까지 금지
- **무엇**: 정답이 `more modern`, `a lot of`, `not to run` 같은 다어절일 때, 개별 단어(`more`, `a`, `of`, `not`)도 힌트에 쓰지 않았다.
- **예외**: 그 낱말이 **보기 2개 이상에 공통으로 들어 있으면 허용**했다(보기가 전부 `modern`을 품고 있으면 modern을 말해도 정답을 알려주는 게 아니다).
- **부작용**: 일부 힌트가 "helper word", "that little word" 같은 우회 표현을 쓴다. 톤을 완화하고 싶으면 말해달라.

---

## B. 정답 키(answer)를 바꾼 문항 — **원본 의도를 내가 바꾼 것들이라 특히 확인 요망**

| 문항 | 왜 | 바꾼 내용 |
|---|---|---|
| S07_B8 | 정답이 비문("There **was** not enough **players**") | 정답 → `were` |
| S08_C7·C8 | 목적격/주격 자리가 서로 뒤바뀜 | they ↔ them 교환 |
| S28_B1 | 문장 끝 `before`가 현재완료를 강제 → 원래 정답(`solves`)이 비문 | 정답 → `has solved` |
| S40_B4 | `completed`/`had completed` 둘 다 성립 | stem에 `by the time` 삽입 + 정답 → `had completed` |
| S46/D | 3번·5번 정답이 서로 뒤바뀜 | gleaming ↔ sprawling 교환 |
| S51_B6 | 주절이 `was`인데 정답이 `haven't` → "haven't it?" 비문 | 정답 → `wasn't` |
| S20/D, S21/D, S25/D, S26/D, S27/C·D, S28/D, S29/D, S30/D, S31/D | 정답이 빈칸과 **한 칸씩 밀려** 있었음 | 지문 순서에 맞게 재배정 |

## C. Cloze word_box에서 보기 단어를 교체한 것 (동의어 충돌로 정답이 둘이 되던 문항)

| 세트 | 교체 | 왜 |
|---|---|---|
| S42/C | `provided that`·`even though` 제거 → `because`·`so that` | `as long as`/`if`, `although`와 동의어라 유일해 설계 불가 |
| S43/C | `less…than` → `fewer…than` | `not as…as`와 동의 중복. less/fewer 구분은 P3 핵심 |
| S52/C | `as` → `unless` | as/when/while이 P3 수준에서 진짜 교환 가능 |
| S54/C | `eventually` → `never` | `finally`와 의미 분리 불가 |
| S57/C | `need to` → `may` | `have to`와 동의어. **`need to` 학습 포인트는 상실됨** |
| S59/C | `quickly` → `immediately` | `fast`와 완전 호환 |
| S46/C | 관계사 8개 재설계(`whom`·`why` 도입) | 기존 box가 `who×2, which×2`라 앱에서 풀 수 없었음. **`whom`은 P3치고 높은 편** |

## D. MCQ 보기를 교체한 것 (정답이 둘이던 문항)

S37_A3(`spread`→`polished`), S47_B3(`much` 제거), S48_B3(`severest`→`very severe`), S50_B3(`much`→`too`), S57_A5(`change`→`silence`), S23_A2(`drop`→`litter`), S26_A1(`round`→`rough`), S28_B5(`in`→`into`), S24_B1(`has seen`→`seeing`).

## E. 난이도 판단으로 오류 유형을 바꾼 것

- **라틴/그리스어 복수형**(`criterias`→criteria, `medias`→media, `bacterias`→bacteria)은 **P3 수준을 넘는다**고 판단 → `childs`→children, `shelfs`→shelves, `womans`→women, `knifes`→knives로 교체. (S27, S32, S33, S34)

## F. "틀리지 않은 것을 틀렸다고 하던" Editing 문항 — 오류 자체를 교체

- S11/E3 `The ride was smooth`(정상 문장) → `the bus moved smooth`
- S49/E5 `firefighters' → firefighter's`(단·복수 단서가 지문에 없어 판정 불가) → `rescuers → rescuers'`
- S51/E5 지문에 과학자가 없는데 `scientist's` → `students → students'`
- S58/E4 `called out loud`(= aloud, 정상) → `called loud`
- S26/E4 `the class were given`(영국식 허용) → 주어를 명백한 복수(the pupils)로
- S04/E `near→nearby`(고치면 오히려 비문), `there→their`(고쳐도 organisers'가 맞음), `were→was`(영국식 허용) → 전부 교체

## G. 문항 본문(stem/지문)을 손댄 것 — 정답 노출·자기모순 해소

- **정답이 stem에 그대로 박혀 있던 것**: S07_A1(red), S09_A1(freshly), S09_A2(destroyed), S16_A2(operation), S29_A2(bright), S55_A5(shelter), S58_A4(wet market), S60/D(role model), S54/D(dedicated), S15/D(draft), S34/D(dialect)
- **자기모순**: S53_A3("완전히 조용한데 속삭임은 있다"), S07/D("전반전에 졌는데 결국 우승"), S01/D(사무실에 있는 병을 엄마가 돌려줌)
- **선행사 없음**: S38/C(Grandfather가 뒤에 나옴), S44/E(She/it의 선행사 부재), S22/C(Raju가 뒤에 나옴)

## H. 남겨둔 것 / 확신이 덜한 것

1. **S22_F1 model_answer**: `asked Jamal if he **heard**` — 교과서적으로는 `had heard`가 정석. learning_tip과는 일관되고 P3 채점에서 흔히 허용되어 **그대로 뒀다.**
2. **S35/C `usually` vs `normally`**: 8개 빈도부사 box는 본질적으로 동의어 충돌이 있다. box를 안 바꾸고 **지문에 단서만 넣어** 구별 가능하게 했다 — 완전 배타는 아니다.
3. **S45/C3 `some`**: 긍정문이라 `a lot of`도 문법상 가능. 다른 빈칸에서 `a lot of`가 소진되도록 배치해 소거로만 확정된다.
4. **Section C는 보기 8개 = 빈칸 8개(오답 0개)** 그대로 뒀다. 문법 표(동사변화형·대명사표) 설계라 오답을 넣으면 표가 깨진다. D에만 오답을 추가했다.
5. **문두 빈칸의 대문자**: `(3)___ the market and the post office…` 같은 문장 첫머리 빈칸은 보기 단어가 소문자다. 원본 설계 그대로 뒀다 — 채점기가 대소문자를 구분한다면 별도 처리가 필요하다.
6. **S14_A2** "My brother organised his stamp collection every weekend" — 보기 4개가 전부 과거형이라 문항은 성립하지만 "every weekend + 단순과거"가 어색. 보기를 전부 갈아야 해서 **미수정.**
7. **S10/C6** "put the tray ___ the oven" — `into`도 자연스러우나 into가 다른 빈칸 전용이라 '각 단어 1회' 관례로만 해소된다. 지시문이 없어 애매함이 남는다.
