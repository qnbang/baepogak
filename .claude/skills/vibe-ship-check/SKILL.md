---
name: vibe-ship-check
description: 웹 프로젝트를 실제 배포하기 전, "배포 후 참교육 당하는" 12가지 함정(백업·소프트삭제·서버권한·하드코딩키·외부API 재시도·로그·시간대·금액 정수·OG·SEO 제목/설명·robots/sitemap·GEO)을 점검하고 빠진 것을 고친다. 트리거 — "배포 전 점검", "vibe ship check", "이 사이트 배포해도 되나 점검", "OG/SEO 세팅", "배포 준비됐는지 확인".
---

# 배포 전 점검 (vibe-ship-check)

이 프로젝트를 실제 서비스로 배포하기 전에, 아래 12가지를 **코드를 실제로 읽어** 점검하고 결과를 체크리스트로 보고한 뒤, 사용자 동의를 받아 빠진 것을 고친다. 같은 폴더의 `snippets/`를 참고 구현으로 쓴다.

## 진행 방식

1. 프로젝트 구조를 먼저 파악한다(정적 HTML인지 Next.js/기타 프레임워크인지, 데이터 저장 방식, 외부 API, 어드민 유무).
2. 아래 12항목을 각각 **✅적용됨 / ⚠️부실 / ❌없음 / — 해당없음**으로 판정하고 근거(파일:줄)를 단다.
3. 위험도(높음/중간/낮음)와 함께 체크리스트로 보고한다.
4. 고칠 것을 우선순위로 제시하고, 동의를 받아 **최소 수정**으로 고친다(과설계 금지). 비밀·키를 코드에 넣지 않는다.

## 점검 항목

**⚠️ 배포 전 필수 보안 (먼저)**
0a. 비밀키·비밀번호가 코드나 커밋에 노출됐는지, `.env`가 `.gitignore`에 있는지 (`recipes/키-깃허브에-올리지마.md`)
0b. 사용자 입력을 서버에서 검증하고 화면 출력 시 이스케이프하는지(XSS·조작 방지) (`recipes/입력값-검증.md`)

**데이터**
1. 백업 없이 통째 덮어쓰기 → 저장 직전 타임스탬프 백업 (`snippets/js/save-with-backup.ts`)
2. 물리삭제 → `deleted_at` 소프트삭제 (`snippets/js/soft-delete.ts`)

**보안**
3. 권한 검사를 프론트에만 두는지 → 서버 API에서 재검증
4. 비밀번호·키 하드코딩/기본값 폴백 → 환경변수 + fail-closed (`snippets/js/require-env-secret.ts`)

**외부 연동**
5. 외부 API 재시도·타임아웃·멱등성·부분성공 (`snippets/js/fetch-with-retry.ts`)

**운영**
6. 에러 로그 + 돈 변경 감사로그 (`snippets/js/log.ts`)
7. 시간 UTC 저장·한국시간 표시 (`snippets/js/kst-time.ts`)
8. 금액 정수 계산(float 금지) (`snippets/js/money.ts`)

**공유·검색**
9. OG 태그(og:title/description/image/url) — 카톡 공유 미리보기 (`snippets/seo/`)
10. 페이지 제목 + meta description + `lang="ko"` + favicon (기본값 "Create Next App" 방치 확인)
11. robots.txt + sitemap.xml
12. GEO — JSON-LD 구조화 데이터

## 원칙
- 최소 수정, 과설계 금지. 이미 잘 된 항목은 그대로 둔다.
- 각 항목의 "왜"를 한 줄로 설명한다(비개발자 대상).
- 실제로 고친 뒤엔 무엇을 왜 바꿨는지 요약한다.
