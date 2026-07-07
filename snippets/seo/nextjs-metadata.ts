// ⑨⑩ Next.js(App Router)용 완성형 metadata — app/layout.tsx에 넣으세요
//
// 바이브코딩으로 만든 Next.js 사이트는 title/description만 있고 openGraph·robots·
// metadataBase가 비어 있는 경우가 많습니다("Create Next App"이 그대로 남기도 하죠).
// 아래를 layout.tsx에 넣으면 공유 미리보기·검색·크롤링이 한 번에 세팅됩니다.

import type { Metadata } from "next";

export const metadata: Metadata = {
  // metadataBase가 있어야 og:image 등이 절대주소로 만들어집니다
  metadataBase: new URL("https://CHANGE_ME.com"),
  title: {
    default: "내 사이트 이름 — 한 줄 소개",
    template: "%s | 내 사이트 이름", // 하위 페이지 제목 뒤에 자동으로 붙음
  },
  description: "이 사이트가 무엇인지 한두 문장으로. 검색결과에 이 문장이 뜹니다.",
  openGraph: {
    title: "내 사이트 이름 — 한 줄 소개",
    description: "공유됐을 때 뜰 설명.",
    url: "https://CHANGE_ME.com",
    siteName: "내 사이트 이름",
    locale: "ko_KR",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }], // public/og-image.jpg 에 실제 파일 두기
  },
  twitter: {
    card: "summary_large_image",
    title: "내 사이트 이름 — 한 줄 소개",
    description: "공유됐을 때 뜰 설명.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true }, // 검색엔진에 노출 허용
  alternates: { canonical: "https://CHANGE_ME.com" },
};

// 그리고 <html lang="ko"> 로 바꾸는 것 잊지 마세요:
//   export default function RootLayout({ children }) {
//     return <html lang="ko"><body>{children}</body></html>;
//   }
