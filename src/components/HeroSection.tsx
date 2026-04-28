import SearchForm from "./SearchForm";
import Link from "next/link";

interface HeroSectionProps {
  onSearch: (query: string) => void;
}

export default function HeroSection({ onSearch }: HeroSectionProps) {
  return (
    <section className="bg-canvas py-section">
      <div className="max-w-[980px] mx-auto px-4 text-center">
        <h1 className="font-display text-hero-display text-ink mb-2 sm:text-hero-display text-[34px] leading-[1.1]">
          プロパピ
        </h1>
        <p className="font-display text-lead text-ink mb-1">
          土地のすべてがわかる BaaS
        </p>
        <p className="text-body text-ink-muted-48 max-w-lg mx-auto mb-2">
          不動産仲介・保険査定・ローン審査に必要な土地情報を
          <br className="hidden sm:block" />
          ワンストップで提供。業務工数を大幅に削減します。
        </p>
        <a
          href="#features"
          className="text-link text-body inline-block mb-8"
        >
          提供機能の詳細はこちら →
        </a>

        {/* Search Box */}
        <div className="w-full max-w-xl mx-auto">
          <SearchForm onSearch={onSearch} />
          {/* Example queries */}
          <div className="flex items-center justify-center gap-4 mt-3 text-caption text-ink-muted-48">
            <span>例:</span>
            <button
              type="button"
              onClick={() => onSearch("東京都江東区海の森3-3")}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              東京都江東区海の森3-3
            </button>
            <button
              type="button"
              onClick={() => onSearch("35.32377910560548, 139.58011637896283")}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              35.3237, 139.5801
            </button>
          </div>
        </div>

        {/* CTA Buttons — Apple dual pill CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto mt-10">
          <Link href="/docs" className="btn-primary">
            API 連携で組み込む
          </Link>
          <Link href="/docs/mcp" className="btn-secondary">
            MCP 経由で LLM に導入
          </Link>
        </div>
      </div>
    </section>
  );
}
