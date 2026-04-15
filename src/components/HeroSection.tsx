import SearchForm from "./SearchForm";
import Link from "next/link";

interface HeroSectionProps {
  onSearch: (query: string) => void;
}

export default function HeroSection({ onSearch }: HeroSectionProps) {
  return (
    <section className="bg-gradient-to-b from-brand-50 to-white pt-20 pb-12 sm:pt-28 sm:pb-16">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
          プロパピ
        </h1>
        <p className="text-xl sm:text-2xl text-gray-600 font-medium mb-2">
          土地のすべてがわかる BaaS
        </p>
        <p className="text-sm sm:text-base text-gray-500 max-w-lg mx-auto mb-4">
          不動産仲介・保険査定・ローン審査に必要な土地情報を
          <br className="hidden sm:block" />
          ワンストップで提供。業務工数を大幅に削減します。
        </p>
        <a
          href="#features"
          className="text-sm text-brand-600 hover:text-brand-800 underline underline-offset-4"
        >
          提供機能の詳細はこちら ↓
        </a>

        {/* Search Box */}
        <div className="w-full max-w-xl mx-auto mt-8">
          <SearchForm onSearch={onSearch} />
          {/* Example queries */}
          <div className="flex items-center justify-center gap-4 mt-2 text-xs text-gray-400">
            <span>例:</span>
            <button
              type="button"
              onClick={() => onSearch("東京都江東区海の森3-3")}
              className="hover:text-brand-700 hover:underline underline-offset-2 transition-colors cursor-pointer"
            >
              📍 東京都江東区海の森3-3
            </button>
            <button
              type="button"
              onClick={() => onSearch("35.32377910560548, 139.58011637896283")}
              className="hover:text-brand-700 hover:underline underline-offset-2 transition-colors cursor-pointer"
            >
              🧭 35.3237, 139.5801
            </button>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-xl mx-auto mt-6">
          <Link
            href="/docs"
            className="bg-brand-900 hover:bg-brand-800 text-white px-5 py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
              />
            </svg>
            API 連携で組み込む
          </Link>
          <Link
            href="/docs/mcp"
            className="border-2 border-brand-700 text-brand-700 hover:bg-brand-50 px-5 py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z"
              />
            </svg>
            MCP 経由で LLM に導入
          </Link>
        </div>
      </div>
    </section>
  );
}
