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

          <a
            href="mailto:contact@propapi.jp"
            className="text-brand-700 hover:text-brand-900 hover:bg-brand-50 px-4 py-2 rounded-lg transition-colors text-sm flex items-center gap-1.5"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
            <span className="hidden sm:inline">お問い合わせ</span>
          </a>
        </div>
      </div>
    </header>
  );
}
