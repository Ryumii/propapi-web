import Link from "next/link";

export default function ApiPromoBanner() {
  return (
    <section className="rounded-lg border border-hairline bg-canvas p-6 flex flex-col sm:flex-row items-center gap-4">
      <div className="flex-1 text-center sm:text-left">
        <h3 className="text-body-strong text-ink">
          API でシステム連携しませんか？
        </h3>
        <p className="text-caption text-ink-muted-48 mt-1">
          不動産査定・物件情報サイトに PropAPI
          のハザード・用途地域データを組み込めます。月間 1,000
          リクエストまで無料。
        </p>
      </div>
      <Link
        href="/docs"
        className="btn-primary shrink-0"
      >
        API ドキュメント
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </Link>
    </section>
  );
}
