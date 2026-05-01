"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY ?? "";

type ReportType = "sales" | "rental" | "full";
type ReportStatus = "idle" | "loading" | "done" | "error";

interface ReportResult {
  report_id: string;
  address_normalized: string;
  pdf?: {
    status: string;
    download_url: string | null;
  };
}

export default function ReportPage() {
  const [address, setAddress] = useState("");
  const [reportType, setReportType] = useState<ReportType>("full");
  const [companyName, setCompanyName] = useState("");
  const [agentName, setAgentName] = useState("");
  const [status, setStatus] = useState<ReportStatus>("idle");
  const [result, setResult] = useState<ReportResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    if (!address.trim()) return;
    setStatus("loading");
    setError(null);
    setResult(null);

    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (API_KEY) headers["X-API-Key"] = API_KEY;

      const body = {
        address: address.trim(),
        report_type: reportType,
        pdf_options: {
          generate_pdf: true,
          company_name: companyName || undefined,
          agent_name: agentName || undefined,
        },
      };

      const res = await fetch(`${API_BASE}/v2/report/generate`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => null);
        throw new Error(errBody?.error?.message ?? `エラーが発生しました (${res.status})`);
      }

      const data = await res.json();
      setResult(data);
      setStatus("done");

      // If PDF is generating, poll for completion
      if (data.pdf?.status === "generating") {
        pollPdfStatus(data.report_id);
      }
    } catch (e: any) {
      setError(e.message ?? "不明なエラー");
      setStatus("error");
    }
  }

  async function pollPdfStatus(reportId: string) {
    const headers: Record<string, string> = {};
    if (API_KEY) headers["X-API-Key"] = API_KEY;

    for (let i = 0; i < 20; i++) {
      await new Promise((r) => setTimeout(r, 3000));
      try {
        const res = await fetch(`${API_BASE}/v2/report/${reportId}`, { headers });
        if (res.ok) {
          const data = await res.json();
          if (data.pdf?.status === "ready") {
            setResult(data);
            return;
          }
        }
      } catch {
        // continue polling
      }
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-3xl mx-auto px-4 py-12">
          {/* Title */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              📄 物件レポート生成
            </h1>
            <p className="text-slate-500">
              住所を入力するだけで、ハザード・用途地域・地価・周辺施設の
              <br />
              統合レポートをPDFで生成します
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-5">
            {/* Address Input */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                住所
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="東京都渋谷区渋谷2-24-12"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              />
            </div>

            {/* Report Type */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                レポート種別
              </label>
              <div className="flex gap-3">
                {([
                  { value: "full", label: "全項目", icon: "📋" },
                  { value: "sales", label: "売買仲介用", icon: "🏠" },
                  { value: "rental", label: "賃貸仲介用", icon: "🏢" },
                ] as const).map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setReportType(opt.value)}
                    className={`flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition-all ${
                      reportType === opt.value
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    {opt.icon} {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Optional: Company / Agent */}
            <details className="text-sm">
              <summary className="cursor-pointer text-slate-500 hover:text-slate-700">
                📝 会社名・担当者名を追加（任意）
              </summary>
              <div className="mt-3 space-y-3">
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="会社名"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                />
                <input
                  type="text"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  placeholder="担当者名"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                />
              </div>
            </details>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!address.trim() || status === "loading"}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold rounded-lg transition-colors text-lg"
            >
              {status === "loading" ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  レポート生成中...
                </span>
              ) : (
                "レポートを生成"
              )}
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              ⚠️ {error}
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-bold text-slate-800 mb-2">
                ✅ レポート生成完了
              </h2>
              <div className="text-sm text-slate-600 space-y-1">
                <p>
                  <span className="font-medium">住所:</span>{" "}
                  {result.address_normalized}
                </p>
                <p>
                  <span className="font-medium">レポートID:</span>{" "}
                  <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">
                    {result.report_id}
                  </code>
                </p>
              </div>

              {/* PDF Download */}
              <div className="mt-4">
                {result.pdf?.status === "ready" && result.pdf.download_url ? (
                  <a
                    href={result.pdf.download_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors"
                  >
                    📥 PDFをダウンロード
                  </a>
                ) : result.pdf?.status === "generating" ? (
                  <div className="flex items-center gap-2 text-amber-600">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    PDF生成中... しばらくお待ちください
                  </div>
                ) : (
                  <p className="text-sm text-slate-400">PDFは生成されていません</p>
                )}
              </div>
            </div>
          )}

          {/* Info */}
          <div className="mt-8 text-center text-xs text-slate-400">
            <p>無料プラン: 月3レポートまで（ウォーターマーク付き）</p>
            <p className="mt-1">
              このサービスは、国土交通省の不動産情報ライブラリのAPI機能を使用しています
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
