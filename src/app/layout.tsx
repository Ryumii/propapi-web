import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "プロパピ PropAPI | 土地情報BaaS — ハザード・用途地域・地価を一括検索",
  description:
    "不動産仲介・保険査定・ローン審査に必要な土地情報をワンストップ提供。洪水・土砂災害・津波リスク、用途地域、公示地価、学区情報を住所から即時取得。",
  openGraph: {
    title: "プロパピ PropAPI | 土地情報BaaS",
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
      <body>{children}</body>
    </html>
  );
}
