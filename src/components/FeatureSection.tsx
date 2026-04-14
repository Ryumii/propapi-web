const AVAILABLE_FEATURES = [
  {
    icon: "🏙️",
    name: "用途地域",
    description: "建ぺい率・容積率・防火地域など都市計画情報",
  },
  {
    icon: "⚠️",
    name: "ハザードリスク判定",
    description: "洪水・土砂・津波・液状化の統合リスクスコア",
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
    <section id="features" className="bg-gray-50 py-16 sm:py-20">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-4">
          機能一覧
        </h2>
        <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
          PropAPI が提供するデータ項目の一覧です
        </p>

        {/* Available */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {AVAILABLE_FEATURES.map((f) => (
            <div
              key={f.name}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <span className="text-3xl mb-3 block">{f.icon}</span>
              <h3 className="font-semibold text-gray-900 mb-1">{f.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{f.description}</p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-100 text-brand-700">
                提供中
              </span>
            </div>
          ))}
        </div>

        {/* Upcoming */}
        <h3 className="text-lg font-semibold text-gray-700 mb-6 text-center">
          開発中の機能
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 opacity-75">
          {UPCOMING_FEATURES.map((f) => (
            <div
              key={f.name}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <span className="text-3xl mb-3 block">{f.icon}</span>
              <h3 className="font-semibold text-gray-900 mb-1">{f.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{f.description}</p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                開発中
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
