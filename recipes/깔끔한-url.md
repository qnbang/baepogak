# 주소에 .html 안 붙게 (깔끔한 URL)

`example.com/about.html` 보다 `example.com/about` 이 더 깔끔하고 전문적으로 보입니다.
공유·검색·기억에도 유리합니다.

## Vercel을 쓴다면

프로젝트 루트에 `vercel.json` 파일을 만들고 이 한 줄이면 끝입니다:

```json
{
  "cleanUrls": true
}
```

- `about.html` → `about` 로 자동 접속
- `.html`이 붙은 옛 주소로 들어와도 깔끔한 주소로 넘겨줍니다(redirect)

## 그 외 호스팅

- **Netlify**: 기본으로 `.html`을 떼줍니다(Pretty URLs). 대부분 설정 불필요.
- **Next.js**: 애초에 파일 기반 라우팅이라 `.html`이 안 붙습니다.
- **직접 서버(nginx 등)**: `try_files $uri $uri.html $uri/ =404;` 규칙으로 처리.

## 주의

이미 사람들이 `.html` 붙은 주소를 공유했거나 검색에 걸려 있다면, 옛 주소가 깨지지 않게
**리다이렉트**(옛 주소 → 새 주소)를 꼭 함께 두세요. `cleanUrls: true`는 이걸 자동으로 해줍니다.
