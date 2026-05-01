import { type ReactNode } from "react";

/* ── Monochrome line-art icons (SF Symbols inspired, 1.5px stroke) ── */

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      className="w-7 h-7 mb-3 text-ink-muted-48"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

function IconOnDark({ children }: { children: ReactNode }) {
  return (
    <svg
      className="w-7 h-7 mb-3 text-body-muted"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

/* Building — 用途地域 */
const IconZoning = () => (
  <Icon>
    <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4M9 9h.01M15 9h.01M9 13h.01M15 13h.01" />
  </Icon>
);

/* Shield — ハザードリスク判定 */
const IconHazard = () => (
  <Icon>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M12 8v4M12 16h.01" />
  </Icon>
);

/* Chart bar — 公示地価 */
const IconLandPrice = () => (
  <Icon>
    <path d="M3 3v18h18" />
    <path d="M7 16v-3M11 16V9M15 16v-5M19 16V7" />
  </Icon>
);

/* Graduation cap — 学区情報 */
const IconSchool = () => (
  <Icon>
    <path d="M12 3L1 9l11 6 9-4.91V17M5 13.18v4L12 21l7-3.82v-4" />
  </Icon>
);

/* Map — ハザードマップ */
const IconMap = () => (
  <Icon>
    <path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z" />
    <path d="M8 2v16M16 6v16" />
  </Icon>
);

/* Pin — 住所ジオコーディング */
const IconPin = () => (
  <Icon>
    <path d="M12 21c-4-4-8-7.33-8-11a8 8 0 1 1 16 0c0 3.67-4 7-8 11z" />
    <circle cx="12" cy="10" r="3" />
  </Icon>
);

/* Droplet — 液状化リスク */
const IconDroplet = () => (
  <Icon>
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
  </Icon>
);

/* Mountain — 崩落危険地域 */
const IconMountain = () => (
  <Icon>
    <path d="M3 20l5.5-9 4 5 3.5-6L22 20H3z" />
  </Icon>
);

/* Document — 登記情報取得 */
const IconDocument = () => (
  <Icon>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6M8 13h8M8 17h8M8 9h2" />
  </Icon>
);

/* Ruler — 建築基準法制限 */
const IconRuler = () => (
  <Icon>
    <path d="M21 3L3 21M17 3h4v4M7 21H3v-4M16 8l-2 2M12 12l-2 2M8 16l-2 2" />
  </Icon>
);

/* Train — 交通アクセス */
const IconTrain = () => (
  <Icon>
    <path d="M8 2h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4z" />
    <path d="M9 22l3-4 3 4M8 15h.01M16 15h.01M7 10h10" />
  </Icon>
);

/* Trend — 地価推移 */
const IconTrend = () => (
  <Icon>
    <path d="M3 3v18h18" />
    <path d="M7 14l4-4 4 4 5-6" />
  </Icon>
);

/* Grid — 周辺施設 */
const IconNearby = () => (
  <Icon>
    <circle cx="12" cy="12" r="1" />
    <path d="M12 7a5 5 0 0 1 5 5M12 7a5 5 0 0 0-5 5M12 3a9 9 0 0 1 9 9M12 3a9 9 0 0 0-9 9" />
    <path d="M12 17v4M7 12H3" />
  </Icon>
);

const AVAILABLE_FEATURES = [
  {
    icon: <IconZoning />,
    name: "用途地域",
    description: "建ぺい率・容積率・防火地域など都市計画情報",
  },
  {
    icon: <IconHazard />,
    name: "ハザードリスク判定",
    description: "洪水・土砂・津波の統合リスクスコア",
  },
  {
    icon: <IconLandPrice />,
    name: "公示地価",
    description: "最寄りの国土交通省地価公示データ",
  },
  {
    icon: <IconSchool />,
    name: "学区情報",
    description: "小学校・中学校の通学区域",
  },
  {
    icon: <IconMap />,
    name: "ハザードマップ",
    description: "各ハザードのGeoJSONオーバーレイ地図",
  },
  {
    icon: <IconPin />,
    name: "住所ジオコーディング",
    description: "住所→座標の変換",
  },
];

const UPCOMING_FEATURES = [
  {
    icon: "droplet",
    name: "液状化リスク",
    description: "J-SHIS 液状化危険度データ連携",
  },
  {
    icon: "mountain",
    name: "崩落危険地域",
    description: "急傾斜地崩壊危険区域の判定",
  },
  {
    icon: "document",
    name: "登記情報取得",
    description: "法務局の不動産登記簿データ連携",
  },
  {
    icon: "ruler",
    name: "建築基準法制限",
    description: "日影規制・斜線制限等",
  },
  {
    icon: "train",
    name: "交通アクセス",
    description: "最寄駅・バス停・主要施設距離",
  },
  {
    icon: "trend",
    name: "地価推移",
    description: "過去10年の地価トレンドグラフ",
  },
  {
    icon: "nearby",
    name: "周辺施設",
    description: "コンビニ・病院・学校等の距離情報",
  },
];

const DARK_ICONS: Record<string, ReactNode> = {
  droplet: (
    <IconOnDark>
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </IconOnDark>
  ),
  mountain: (
    <IconOnDark>
      <path d="M3 20l5.5-9 4 5 3.5-6L22 20H3z" />
    </IconOnDark>
  ),
  document: (
    <IconOnDark>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M8 13h8M8 17h8M8 9h2" />
    </IconOnDark>
  ),
  ruler: (
    <IconOnDark>
      <path d="M21 3L3 21M17 3h4v4M7 21H3v-4M16 8l-2 2M12 12l-2 2M8 16l-2 2" />
    </IconOnDark>
  ),
  train: (
    <IconOnDark>
      <path d="M8 2h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4z" />
      <path d="M9 22l3-4 3 4M8 15h.01M16 15h.01M7 10h10" />
    </IconOnDark>
  ),
  trend: (
    <IconOnDark>
      <path d="M3 3v18h18" />
      <path d="M7 14l4-4 4 4 5-6" />
    </IconOnDark>
  ),
  nearby: (
    <IconOnDark>
      <circle cx="12" cy="12" r="1" />
      <path d="M12 7a5 5 0 0 1 5 5M12 7a5 5 0 0 0-5 5M12 3a9 9 0 0 1 9 9M12 3a9 9 0 0 0-9 9" />
      <path d="M12 17v4M7 12H3" />
    </IconOnDark>
  ),
};

export default function FeatureSection() {
  return (
    <>
      {/* Available features — parchment tile */}
      <section id="features" className="bg-canvas-parchment py-section" aria-label="PropAPI 提供中の不動産データAPI機能">
        <div className="max-w-[980px] mx-auto px-4">
          <h2 className="font-display text-display-lg text-ink text-center mb-2">
            機能一覧
          </h2>
          <p className="text-body text-ink-muted-48 text-center mb-12 max-w-2xl mx-auto">
            ぷろぱぴ（PropAPI）が提供する不動産土地情報データ項目の一覧です。住所を指定するだけでこれらのデータをAPI経由で即時取得できます。
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {AVAILABLE_FEATURES.map((f) => (
              <div
                key={f.name}
                className="bg-canvas border border-hairline rounded-lg p-6"
              >
                {f.icon}
                <h3 className="text-body-strong text-ink mb-1">{f.name}</h3>
                <p className="text-caption text-ink-muted-48 mb-3">
                  {f.description}
                </p>
                <span className="inline-flex items-center px-3 py-0.5 rounded-pill text-caption text-primary bg-[#e6f0ff]">
                  提供中
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming features — dark tile */}
      <section className="bg-surface-tile-1 py-section">
        <div className="max-w-[980px] mx-auto px-4">
          <h3 className="font-display text-tagline text-white text-center mb-8">
            開発中の機能
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {UPCOMING_FEATURES.map((f) => (
              <div
                key={f.name}
                className="bg-surface-tile-2 rounded-lg p-6"
              >
                {DARK_ICONS[f.icon]}
                <h3 className="text-body-strong text-white mb-1">{f.name}</h3>
                <p className="text-caption text-body-muted mb-3">
                  {f.description}
                </p>
                <span className="inline-flex items-center px-3 py-0.5 rounded-pill text-caption text-primary-on-dark bg-primary/10">
                  開発中
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
