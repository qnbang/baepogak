// ⑥ 로그 없이 운영 금지 — 에러 로그 + 돈 감사 로그
//
// 장애가 나도 로그가 없으면 원인을 전부 추측해야 합니다. 특히 돈을 바꾸는 곳은
// "누가 무엇을 얼마로 바꿨나"가 없으면 나중에 못 찾습니다.
//
// ponytail: winston·pino 같은 로깅 라이브러리 안 씁니다. Vercel·대부분의 호스팅은
//           console.error/console.log를 알아서 수집합니다. 한 줄이면 됩니다.

/** 에러 로그: 어디서·무슨 에러가·어떤 상황에서 났는지 남긴다 */
export function logError(route: string, e: unknown, ctx?: Record<string, unknown>) {
  console.error(
    JSON.stringify({
      t: new Date().toISOString(),
      level: "error",
      route,
      msg: e instanceof Error ? e.message : String(e),
      stack: e instanceof Error ? e.stack : undefined,
      ...ctx,
    }),
  );
}

/** 감사 로그: 돈·중요 데이터를 "바꾸는 데 성공"했을 때 무엇을 바꿨는지 남긴다 */
// ctx에 who(변경자)를 넣을 수 있으면 넣으세요. 로그인 구조가 없으면 생략해도 됩니다.
export function logAudit(route: string, action: string, ctx?: Record<string, unknown>) {
  console.log(
    JSON.stringify({
      t: new Date().toISOString(),
      level: "audit",
      route,
      action,
      ...ctx,
    }),
  );
}
