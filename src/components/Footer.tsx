import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-canvas-parchment py-16">
      <div className="max-w-[980px] mx-auto px-4 space-y-6">
        {/* Brand */}
        <div className="flex items-baseline gap-2">
          <span className="text-body-strong text-ink">プロパピ</span>
          <span className="text-fine-print text-ink-muted-48">PropAPI</span>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          <Link
            href="/docs"
            className="text-dense-link text-ink-muted-80 hover:text-primary transition-colors"
          >
            API ドキュメント
          </Link>
          <Link
            href="/docs/mcp"
            className="text-dense-link text-ink-muted-80 hover:text-primary transition-colors"
          >
            MCP
          </Link>
          <Link
            href="/terms"
            className="text-dense-link text-ink-muted-80 hover:text-primary transition-colors"
          >
            利用規約
          </Link>
          <Link
            href="/privacy"
            className="text-dense-link text-ink-muted-80 hover:text-primary transition-colors"
          >
            プライバシーポリシー
          </Link>
        </nav>

        {/* Hairline */}
        <div className="border-t border-hairline" />

        {/* Legal */}
        <div className="text-fine-print text-ink-muted-48 space-y-1">
          <p>
            出典: 国土数値情報（国土交通省）/ アドレス・ベース・レジストリ（デジタル庁）
          </p>
          <p>© {new Date().getFullYear()} PropAPI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
