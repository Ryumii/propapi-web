import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-5xl mx-auto px-4 space-y-6">
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-extrabold text-white">プロパピ</span>
          <span className="text-xs text-gray-500">PropAPI</span>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link
            href="/docs"
            className="text-gray-400 hover:text-white transition-colors"
          >
            API ドキュメント
          </Link>
          <Link
            href="/terms"
            className="text-gray-400 hover:text-white transition-colors"
          >
            利用規約
          </Link>
          <Link
            href="/privacy"
            className="text-gray-400 hover:text-white transition-colors"
          >
            プライバシーポリシー
          </Link>
        </nav>

        <div className="text-xs text-gray-500 space-y-1">
          <p>
            出典: 国土数値情報（国土交通省）/ アドレス・ベース・レジストリ（デジタル庁）
          </p>
          <p>© {new Date().getFullYear()} PropAPI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
