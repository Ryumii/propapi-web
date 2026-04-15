import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-baseline gap-1">
          <span className="text-xl font-extrabold text-brand-900">
            プロパピ
          </span>
          <span className="text-xs text-gray-400">PropAPI</span>
        </Link>

        <div className="flex items-center gap-6">
          <nav className="hidden sm:flex items-center gap-6">
            <a
              href="#features"
              className="text-sm text-gray-600 hover:text-brand-700 transition-colors"
            >
              機能
            </a>
            <Link
              href="/docs"
              className="text-sm text-gray-600 hover:text-brand-700 transition-colors"
            >
              API ドキュメント
            </Link>
          </nav>

          <Link
            href="/dashboard"
            className="bg-brand-700 hover:bg-brand-800 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
          >
            ダッシュボード
          </Link>
        </div>
      </div>
    </header>
  );
}
