import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MCP 連携ガイド | PropAPI",
  description:
    "PropAPI を MCP (Model Context Protocol) 経由で Claude Desktop や ChatGPT などの LLM チャットから利用する方法。",
};

export default function McpDocsPage() {
  const apiBase =
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

  return (
    <main className="min-h-screen bg-white">
      {/* header */}
      <header className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="text-xl font-extrabold shrink-0 flex items-baseline gap-1">
            <span className="text-brand-900">プロパピ</span>
            <span className="text-xs text-gray-400">PropAPI</span>
          </Link>
          <h1 className="text-lg font-semibold text-gray-700">
            MCP 連携ガイド
          </h1>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* intro */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">MCP とは</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            MCP（Model Context Protocol）は、LLM アプリケーションが外部データソースやツールと接続するためのオープンプロトコルです。
            PropAPI の MCP サーバーを導入することで、Claude Desktop や ChatGPT などの AI チャット上から
            直接「〇〇のハザードリスクを調べて」と指示するだけで土地情報を取得できます。
          </p>
        </section>

        {/* prerequisites */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold">前提条件</h2>
          <ol className="list-decimal list-inside text-sm text-gray-600 space-y-2">
            <li>
              PropAPI の API Key を取得してください（
              <Link href="/docs" className="text-brand-600 hover:underline">
                料金プラン
              </Link>
              を参照）
            </li>
            <li>Python 3.10 以上がインストールされていること</li>
            <li>Claude Desktop / ChatGPT Desktop など MCP 対応クライアント</li>
          </ol>
        </section>

        {/* install */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold">インストール</h2>
          <div className="bg-gray-900 text-gray-100 rounded-lg p-4 text-sm font-mono overflow-x-auto">
            <pre>{`pip install propapi-mcp`}</pre>
          </div>
        </section>

        {/* Claude Desktop config */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold">Claude Desktop 設定</h2>
          <p className="text-sm text-gray-600">
            <code className="bg-gray-100 px-1 rounded">claude_desktop_config.json</code> に以下を追加:
          </p>
          <div className="bg-gray-900 text-gray-100 rounded-lg p-4 text-sm font-mono overflow-x-auto">
            <pre>{`{
  "mcpServers": {
    "propapi": {
      "command": "python",
      "args": ["-m", "propapi_mcp"],
      "env": {
        "PROPAPI_API_KEY": "YOUR_API_KEY",
        "PROPAPI_BASE_URL": "${apiBase}"
      }
    }
  }
}`}</pre>
          </div>
        </section>

        {/* usage examples */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold">使い方</h2>
          <p className="text-sm text-gray-600">
            設定完了後、LLM チャット上で以下のように質問するだけで PropAPI が呼び出されます。
          </p>

          <div className="rounded-xl border bg-gray-50 p-4 space-y-3">
            <div className="flex gap-3">
              <span className="shrink-0 text-sm font-semibold text-brand-700">
                あなた:
              </span>
              <p className="text-sm text-gray-700">
                東京都渋谷区渋谷2-24-12 のハザードリスクと用途地域を調べてください
              </p>
            </div>
            <div className="flex gap-3">
              <span className="shrink-0 text-sm font-semibold text-gray-500">
                AI:
              </span>
              <div className="text-sm text-gray-700 space-y-1">
                <p>PropAPI で調査しました。結果は以下の通りです：</p>
                <ul className="list-disc list-inside text-xs text-gray-600 space-y-1 ml-2">
                  <li>用途地域: 商業地域（建ぺい率 80%、容積率 600%）</li>
                  <li>洪水リスク: 低い（浸水深 0.5m 未満）</li>
                  <li>土砂災害: リスクなし</li>
                  <li>津波: リスクなし</li>
                  <li>公示地価: 385,000 円/㎡（前年比 +2.3%）</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* link back */}
        <section className="rounded-xl border border-brand-200 bg-brand-50 p-6 text-center space-y-3">
          <h2 className="text-lg font-bold text-brand-900">
            REST API も利用可能
          </h2>
          <p className="text-sm text-brand-700">
            MCP 以外にも、REST API / Python SDK で直接連携できます。
          </p>
          <Link
            href="/docs"
            className="inline-block bg-brand-900 hover:bg-brand-800 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition"
          >
            API ドキュメントを見る →
          </Link>
        </section>

        <footer className="text-xs text-gray-400 pt-4 border-t border-gray-100">
          © {new Date().getFullYear()} PropAPI — 土地調査統合 API プラットフォーム
        </footer>
      </div>
    </main>
  );
}
