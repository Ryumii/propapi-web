import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "ぷろぱぴ（PropAPI） | 不動産土地情報API — ハザードマップ・用途地域・地価を住所から一括取得",
  description:
    "ぷろぱぴ（プロパピ・PropAPI）は不動産仲介・保険査定・ローン審査向けの土地情報BaaS。洪水・土砂災害・津波ハザードマップ、用途地域、公示地価、学区情報を住所ひとつで即時取得できるREST API。",
  keywords: [
    "ぷろぱぴ", "プロパピ", "PropAPI",
    "不動産API", "土地情報API", "ハザードマップAPI",
    "用途地域API", "地価API", "学区情報API",
    "不動産テック", "不動産DX", "不動産データ",
    "洪水リスク", "土砂災害", "津波リスク",
    "BaaS", "土地情報", "不動産情報",
  ],
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://propapi.jp",
  },
  openGraph: {
    title: "ぷろぱぴ PropAPI | 不動産土地情報API",
    description:
      "ハザードマップ・用途地域・地価・学区情報を住所から即時取得。不動産業務を効率化するAPI。",
    url: "https://propapi.jp",
    siteName: "PropAPI",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ぷろぱぴ PropAPI | 不動産土地情報API",
    description:
      "ハザードマップ・用途地域・地価・学区情報を住所から即時取得。不動産業務を効率化するAPI。",
  },
};

/* ── JSON-LD structured data (SSR, visible to AI crawlers) ── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "ぷろぱぴ",
      alternateName: ["プロパピ", "PropAPI", "PROPAPI"],
      url: "https://propapi.jp",
      description:
        "不動産仲介・保険査定・ローン審査に必要な土地情報をワンストップ提供するAPI。",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://propapi.jp/?address={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "SoftwareApplication",
      name: "PropAPI",
      alternateName: ["プロパピ", "PropAPI"],
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any",
      url: "https://propapi.jp",
      description:
        "住所を入力するだけで洪水・土砂災害・津波のハザードリスク、用途地域、公示地価、学区情報を一括取得できる不動産土地情報REST API。",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "JPY",
        description: "無料プランあり",
      },
      featureList: [
        "洪水・土砂災害・津波ハザードリスク判定",
        "用途地域・建ぺい率・容積率情報",
        "公示地価データ取得",
        "小学校・中学校 学区情報",
        "ハザードマップ GeoJSON オーバーレイ",
        "住所→座標ジオコーディング",
        "MCP (Model Context Protocol) 経由のLLM連携",
      ],
    },
    {
      "@type": "Organization",
      name: "PropAPI",
      alternateName: ["プロパピ", "PropAPI"],
      url: "https://propapi.jp",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "ぷろぱぴ（PropAPI）とは何ですか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ぷろぱぴ（PropAPI）は、住所を入力するだけで洪水・土砂災害・津波のハザードリスク、用途地域、公示地価、学区情報を一括取得できる不動産土地情報APIです。不動産仲介、保険査定、ローン審査の業務効率化に利用できます。",
          },
        },
        {
          "@type": "Question",
          name: "どのようなデータを取得できますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "洪水・土砂災害・津波のハザードマップ情報、用途地域（建ぺい率・容積率・防火地域）、国土交通省の公示地価、小学校・中学校の学区情報、住所のジオコーディング（座標変換）が取得できます。",
          },
        },
        {
          "@type": "Question",
          name: "料金はかかりますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "無料プランがあり、基本的な機能を無料で利用できます。大量のAPIコールが必要な場合は有料プランをご用意しています。",
          },
        },
        {
          "@type": "Question",
          name: "APIの利用方法を教えてください",
          acceptedAnswer: {
            "@type": "Answer",
            text: "REST APIとして提供しており、住所または緯度経度を指定してHTTPリクエストを送るだけで利用できます。また、MCP（Model Context Protocol）経由でClaude DesktopやChatGPTなどのLLMから直接利用することも可能です。",
          },
        },
      ],
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient />
    </>
  );
}
