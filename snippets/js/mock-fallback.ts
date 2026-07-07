// (보너스) API 키 없으면 예시 데이터로 — 키 발급 전에 막히지 않기
//
// 바이브코더가 자주 막히는 지점: 외부 API를 붙였는데 키 발급이 오래 걸려 화면을
// 아예 못 봅니다. 키가 없으면 "예시 데이터"를 돌려주게 해두면, 화면·로직을 먼저 완성하고
// 키는 나중에 넣을 수 있습니다. 배포 때 키만 채우면 자동으로 진짜 데이터로 바뀝니다.
//
// ponytail: 예시 데이터는 딱 화면 확인용 최소한만. 진짜처럼 정교하게 만들 필요 없습니다.

export function withMockFallback<T>(
  envKeyName: string,
  real: () => Promise<T>,
  mock: () => T,
): Promise<T> {
  if (!process.env[envKeyName]) {
    console.warn(`[mock] ${envKeyName} 없음 → 예시 데이터 사용. 배포 전 키를 넣으세요.`);
    return Promise.resolve(mock());
  }
  return real();
}

// 사용 예:
// const items = await withMockFallback("NAVER_API_KEY",
//   () => fetchFromNaver(query),
//   () => [{ title: "예시 상품", price: 10000 }],
// );
