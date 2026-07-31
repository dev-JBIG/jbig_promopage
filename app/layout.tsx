import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JBIG — 전북대 유일 데이터 분석 동아리",
  description: "JBIG 홍보 페이지 인터랙티브 디자인 실험",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
