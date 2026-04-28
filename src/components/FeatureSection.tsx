const AVAILABLE_FEATURES = [
  {
    icon: "🏙️",
    name: "用途地域",
    description: "建ぺい率・容積率・防火地域など都市計画情報",
  },
  {
    icon: "⚠️",
    name: "ハザードリスク判定",
    description: "洪水・土砂・津波の統合リスクスコア",
  },
  {
    icon: "💰",
    name: "公示地価",
    description: "最寄りの国土交通省地価公示データ",
  },
  {
    icon: "🏫",
    name: "学区情報",
    description: "小学校・中学校の通学区域",
  },
  {
    icon: "🗺️",
    name: "ハザードマップ",
    description: "各ハザードのGeoJSONオーバーレイ地図",
  },
  {
    icon: "📍",
    name: "住所ジオコーディング",
    description: "住所→座標の変換",
  },
];

const UPCOMING_FEATURES = [
  {
    icon: "💧",
    name: "液状化リスク",
    description: "J-SHIS 液状化危険度データ連携",
  },
  {
    icon: "🏔️",
    name: "崩落危険地域",
    description: "急傾斜地崩壊危険区域の判定",
  },
  {
    icon: "📄",
    name: "登記情報取得",
    description: "法務局の不動産登記簿データ連携",
  },
  {
    icon: "🏗️",
    name: "建築基準法制限",
    description: "日影規制・斜線制限等",
  },
  {
    icon: "🚇",
    name: "交通アクセス",
    description: "最寄駅・バス停・主要施設距離",
  },
  {
    icon: "📊",
    name: "地価推移",
    description: "過去10年の地価トレンドグラフ",
  },
  {
    icon: "🏘️",
    name: "周辺施設",
    description: "コンビニ・病院・学校等の距離情報",
  },
];

export default function FeatureSection() {
  return (
    <>
      {/* Available features — parchment tile */}
      <section id="features" className="bg-canvas-parchment py-section">
        <div className="max-w-[980px] mx-auto px-4">
          <h2 className="font-display text-display-lg text-ink text-center mb-2">
            機能一覧
          </h2>
          <p className="text-body text-ink-muted-48 text-center mb-12 max-w-2xl mx-auto">
            PropAPI が提供するデータ項目の一覧です
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {AVAILABLE_FEATURES.map((f) => (
              <div
                key={f.name}
                className="bg-canvas border border-hairline rounded-lg p-6"
              >
                <span className="text-3xl mb-3 block">{f.icon}</span>
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
                <span className="text-3xl mb-3 block">{f.icon}</span>
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
