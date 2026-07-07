// ④ 비밀번호·키를 코드에 하드코딩 금지 (환경변수 없으면 "거부")
//
// 흔한 실수: const PW = process.env.ADMIN_PW || "1234"
// 이러면 환경변수를 깜빡 설정 안 한 순간, "1234"가 공개 비번이 됩니다.
// 없으면 통과가 아니라 "거부"(fail-closed)해야 안전합니다.
//
// ponytail: 시크릿 관리 서비스(Vault 등)는 큰 팀이 되면. 그전엔 환경변수 + 이 가드로 충분.

/** 환경변수를 읽되, 없으면 에러로 터뜨린다 (앱 시작 시 호출하면 배포 즉시 알아챔) */
export function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) {
    throw new Error(
      `환경변수 ${name}가 없습니다. .env 또는 배포 설정(Vercel 등)에 반드시 넣으세요. ` +
        `(기본값으로 통과시키면 보안 구멍이 되므로 일부러 막습니다)`,
    );
  }
  return v;
}

/** 요청의 비밀키가 서버 환경변수와 일치하는지 (어드민 API 보호용) */
export function checkSecret(provided: string | undefined | null, envName: string): boolean {
  const expected = process.env[envName];
  if (!expected) return false; // 서버에 비번이 없으면 무조건 거부
  return provided === expected;
}
