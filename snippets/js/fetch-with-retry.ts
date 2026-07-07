// ⑤ 외부 API는 항상 실패한다 — 타임아웃 + 재시도
//
// 결제·문자·검색 같은 외부 API는 늦거나, 실패하거나, 잠깐 과부하(429)가 납니다.
// 그냥 fetch만 쓰면 한 번 삐끗할 때 그대로 죽습니다. 이 헬퍼는 8초 타임아웃 +
// 429/5xx일 때 잠깐 기다렸다 2~3회 다시 시도합니다.
//
// 쓰는 법: const res = await fetchWithRetry(url, { method: "POST", body });
//
// ponytail: 이 이상(서킷브레이커·큐)은 트래픽이 커지기 전엔 YAGNI. 이 20줄이면 충분.

export async function fetchWithRetry(
  url: string,
  init: RequestInit = {},
  {
    tries = 3,
    timeoutMs = 8000,
    retryOn = (status: number) => status === 429 || status >= 500,
  }: { tries?: number; timeoutMs?: number; retryOn?: (s: number) => boolean } = {},
): Promise<Response> {
  let lastErr: unknown;
  for (let attempt = 1; attempt <= tries; attempt++) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeoutMs);
    try {
      const res = await fetch(url, { ...init, signal: ctrl.signal });
      // 재시도 대상 상태코드이고, 아직 시도 횟수가 남았으면 다시
      if (retryOn(res.status) && attempt < tries) {
        await sleep(500 * 2 ** (attempt - 1)); // 0.5s → 1s → 2s
        continue;
      }
      return res; // 성공했거나, 재시도해도 소용없는 응답이면 그대로 반환
    } catch (e) {
      lastErr = e; // 네트워크 실패·타임아웃(abort)
      if (attempt < tries) await sleep(500 * 2 ** (attempt - 1));
    } finally {
      clearTimeout(timer);
    }
  }
  throw lastErr ?? new Error(`fetchWithRetry 실패: ${url}`);
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
