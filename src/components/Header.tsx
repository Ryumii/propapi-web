import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-surface-black">
      {/* Global Nav — Apple style: thin, dark, minimal */}
      <div className="max-w-[980px] mx-auto px-4 h-11 flex items-center justify-between">
        <Link href="/" className="flex items-baseline gap-1.5">
          <span className="text-[14px] font-semibold text-white tracking-tight">
            ぷろぱぴ
          </span>
          <span className="text-nav-link text-body-muted">PropAPI</span>
        </Link>

        <div className="flex items-center gap-5">
          <nav className="hidden sm:flex items-center gap-5">
            <a
              href="#features"
              className="text-nav-link text-body-muted transition-colors hover:text-white"
            >
              機能
            </a>
            <Link
              href="/docs"
              className="text-nav-link text-body-muted transition-colors hover:text-white"
            >
              API ドキュメント
            </Link>
            <Link
              href="/docs/mcp"
              className="text-nav-link text-body-muted transition-colors hover:text-white"
            >
              MCP
            </Link>
          </nav>

          <Link
            href="/dashboard"
            className="bg-primary text-white text-button-utility rounded-pill px-4 py-1.5 transition-transform active:scale-95"
          >
            ダッシュボード
          </Link>
        </div>
      </div>
    </header>
  );
}
