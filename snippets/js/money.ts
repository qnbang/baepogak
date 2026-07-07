// ⑧ 금액 계산에 소수(float) 쓰지 말기
//
// 컴퓨터는 0.9, 0.1 같은 소수를 정확히 저장하지 못합니다.
//   9900 * 0.9 → 8909.999999999999  (실제로 이렇게 나옵니다)
// 금액은 원 단위 "정수"로만 다루세요. 할인·부가세도 정수 연산으로.
//
// ponytail: 통화가 여러 개거나 소수점 단위(달러 센트)까지 가면 그때 Decimal 라이브러리를
//           쓰세요. 원화 정수만 다루면 이 몇 줄로 충분합니다.

/** 할인 적용: 10% 할인 = discountPct 10. (× 0.9 대신 × 90 ÷ 100) */
export function applyDiscount(amount: number, discountPct: number): number {
  assertInt(amount);
  return Math.round((amount * (100 - discountPct)) / 100);
}

/** 부가세 포함 총액에서 공급가·부가세 분리 (총액 = 공급가 + 부가세) */
export function splitVat(total: number): { supply: number; vat: number } {
  assertInt(total);
  const vat = Math.round((total * 10) / 110); // 총액의 10/110
  return { supply: total - vat, vat };
}

/** 여러 금액 합계 (정수 덧셈이라 오차 없음) */
export function sum(amounts: number[]): number {
  return amounts.reduce((a, b) => a + b, 0);
}

function assertInt(n: number) {
  if (!Number.isInteger(n)) {
    throw new Error(`금액은 원 단위 정수여야 합니다: ${n} (소수를 쓰면 정산이 어긋납니다)`);
  }
}
