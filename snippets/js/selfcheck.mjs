// 빠른 검증 데모 — 스니펫의 핵심 계산이 맞는지 확인 (의존성 없음)
// 실행: node selfcheck.mjs   (통과하면 아무 출력 없이 끝, 틀리면 에러)
//
// money.ts / kst-time.ts 의 순수 로직을 그대로 옮겨 assert 합니다.
import { strict as assert } from "node:assert";

// --- money.ts ---
const applyDiscount = (amount, pct) => Math.round((amount * (100 - pct)) / 100);
const splitVat = (total) => {
  const vat = Math.round((total * 10) / 110);
  return { supply: total - vat, vat };
};
assert.equal(applyDiscount(9900, 10), 8910); // float이면 8909.99...가 됐을 것
assert.deepEqual(splitVat(11000), { supply: 10000, vat: 1000 });

// --- kst-time.ts ---
const KST = 9 * 60 * 60 * 1000;
const kstStamp = (d) => {
  const k = new Date(d.getTime() + KST);
  const p = (n) => String(n).padStart(2, "0");
  return `${k.getUTCFullYear()}${p(k.getUTCMonth() + 1)}${p(k.getUTCDate())}-${p(k.getUTCHours())}${p(k.getUTCMinutes())}`;
};
// UTC 09:00 → 한국시간 18:00
assert.equal(kstStamp(new Date("2026-07-07T09:00:00Z")), "20260707-1800");

console.log("✅ selfcheck 통과");
