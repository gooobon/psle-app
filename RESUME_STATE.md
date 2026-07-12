# ZH WA1 — 재개 메모 (v10 기준)

- **기준 문서: `ZH_WA1_HANDOFF_v10.md`** (v9는 폐기 — "12/60, 다음 ZS13"은 오류)

## 현재 상태
- **데이터 60/60 전량 완료**, 기계검증 오류 0.
- `src/data/p3/chinese/wa1_practice.ts` 60/60, round-trip OK.
- `ExamSession.js` truncation 사고 → **복구 완료**(esbuild PARSE OK).

## 남은 일
1. npm run build / npm run dev (PowerShell은 && 미지원, 줄 분리)
2. dev 화면 스팟 확인(3층 해설·【방법】카드·evidence 하이라이트·타일 조립)
3. ZS13~60 해설 질적 스팟감사(기계검증만 통과 상태)

## 주의
- 확장(세트 저작)은 **이미 끝남** — 다시 하지 말 것.
- 데이터 수정 시 반드시 `python3 emit_ts.py` 재실행.
- 마운트는 unlink/rename 불가 → 제자리 덮어쓰기.
