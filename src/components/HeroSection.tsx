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
          <a
            href="https://line.me/R/"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-[#06C755] text-[#06C755] hover:bg-[#06C755]/10 px-5 py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
            </svg>
            LINE で使う
          </a>
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
