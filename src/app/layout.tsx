import type { Metadata } from "next";
import Analytics from "@/components/Analytics";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ぷろぱぴ PropAPI | 土地情報BaaS — ハザード・用途地域・地価を一括検索",
    template: "%s | ぷろぱぴ PropAPI",
  },
  description:
    "不動産仲介・保険査定・ローン審査に必要な土地情報をワンストップ提供。洪水・土砂災害・津波リスク、用途地域、公示地価、学区情報を住所から即時取得。",
  robots: { index: false, follow: false },
  metadataBase: new URL("https://propapi.jp"),
  openGraph: {
    title: "ぷろぱぴ PropAPI | 土地情報BaaS",
    description: "土地のすべてがわかる BaaS",
    url: "https://propapi.jp",
    siteName: "PropAPI",
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Zen+Maru+Gothic:wght@500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-canvas text-ink">
        <Analytics />
        {children}
      </body>
    </html>
  );
}
