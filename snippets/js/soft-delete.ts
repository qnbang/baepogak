// ② 삭제는 "진짜 삭제" 말고 "숨김 처리"
//
// 고객이 "지워주세요" 해도, 실수·분쟁·법적 보존의무 때문에 실제로 지우면 안 되는
// 데이터가 있습니다. 물리삭제(진짜 지우기) 대신 "삭제한 시각"만 기록하고,
// 목록에서만 빼면 화면엔 안 보이되 데이터는 살아있어 언제든 되살릴 수 있습니다.
//
// ponytail: 삭제 플래그 하나면 충분. 별도 "휴지통" 테이블·복원 UI는 필요해질 때 만드세요.

export interface SoftDeletable {
  deleted_at?: string | null;
}

/** 삭제: 실제로 지우지 않고 삭제 시각만 찍는다 */
export function softDelete<T extends SoftDeletable>(record: T): T {
  return { ...record, deleted_at: new Date().toISOString() };
}

/** 조회: 삭제 표시된 것을 걸러낸다 (목록 뽑을 때 항상 이걸 통과시키세요) */
export function visible<T extends SoftDeletable>(records: T[]): T[] {
  return records.filter((r) => !r.deleted_at);
}

/** 복원: 삭제 표시를 지운다 */
export function restore<T extends SoftDeletable>(record: T): T {
  return { ...record, deleted_at: null };
}
