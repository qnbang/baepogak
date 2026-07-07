// ① 백업 없이 덮어쓰기 금지 — 저장 직전 한 벌 복사
//
// 데이터를 통째로 덮어쓰는 어드민은, 한 번의 오조작으로 직전 상태를 영영 잃습니다.
// 이 헬퍼는 덮어쓰기 "직전에" 기존 값을 날짜 붙인 이름으로 한 벌 복사해둡니다.
// 그러면 "content.20260707-1830.bak" 같은 파일에서 언제든 되살릴 수 있습니다.
//
// store는 어떤 저장소든 됩니다(Vercel Blob·S3·파일·DB) — read/write 두 개만 맞추면 끝.
//
// ponytail: 오래된 백업 자동정리는 안 넣습니다. 백업 몇 개 쌓이는 것보다
//           데이터 유실이 훨씬 비쌉니다. 정리가 정말 필요해지면 그때 크론 하나 붙이세요.

import { kstStamp } from "./kst-time";

interface Store {
  read(key: string): Promise<string | null>;
  write(key: string, value: string): Promise<void>;
}

export async function saveWithBackup(key: string, newValue: string, store: Store): Promise<void> {
  const prev = await store.read(key);
  if (prev != null) {
    try {
      await store.write(`${key}.${kstStamp()}.bak`, prev);
    } catch {
      // 백업 실패가 본 저장을 막지 않게 삼킴 — 백업은 보험이지 관문이 아님
    }
  }
  await store.write(key, newValue);
}
