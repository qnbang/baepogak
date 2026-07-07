// ⑦ 시간은 UTC로 저장, 화면엔 한국시간
//
// 서버(Vercel 등)는 보통 UTC로 돕니다. "7월 3일 0시"를 그냥 저장하면 이게 한국시간인지
// UTC인지 모호해져, 쿠폰 만료·예약·정산이 9시간씩 어긋납니다.
// 규칙: 저장은 UTC(new Date().toISOString()), 화면·파일명엔 아래 헬퍼로 한국시간 변환.
//
// ponytail: Temporal API가 표준이 되면 그걸 쓰세요. 그전까진 이 +9시간 방식이 가장 단순합니다.

const KST_OFFSET_MS = 9 * 60 * 60 * 1000;

/** 지금을 한국시간 기준 Date로 (표시·파일명용. 저장은 UTC로 하세요) */
export function kstNow(): Date {
  return new Date(Date.now() + KST_OFFSET_MS);
}

/** 파일명·백업용 안전한 한국시간 문자열: "20260707-1830" */
export function kstStamp(d: Date = new Date()): string {
  const k = new Date(d.getTime() + KST_OFFSET_MS);
  const p = (n: number) => String(n).padStart(2, "0");
  return (
    `${k.getUTCFullYear()}${p(k.getUTCMonth() + 1)}${p(k.getUTCDate())}` +
    `-${p(k.getUTCHours())}${p(k.getUTCMinutes())}`
  );
}

/** 사람이 읽는 한국시간: "2026-07-07 18:30" */
export function kstReadable(d: Date = new Date()): string {
  // toLocaleString에 타임존을 명시하면 서버 로케일과 무관하게 한국시간이 나옵니다
  return d.toLocaleString("ko-KR", { timeZone: "Asia/Seoul", hour12: false });
}
