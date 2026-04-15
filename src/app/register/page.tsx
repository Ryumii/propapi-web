"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { register } from "@/lib/dashboard-api";
import { setAuth } from "@/lib/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await register(email, password, companyName || undefined);
      setAuth(data.token, data.user);
      setApiKey(data.api_key);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "登録に失敗しました");
    } finally {
      setLoading(false);
    }
  }

  // After registration — show API key once
  if (apiKey) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="w-full max-w-lg">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">登録完了</h1>
                <p className="text-sm text-gray-500 mt-1">API Key が発行されました</p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <p className="text-sm font-medium text-amber-800 mb-2">
                  ⚠️ この API Key は一度だけ表示されます。必ずコピーしてください。
                </p>
                <code className="block bg-white border border-amber-200 rounded px-3 py-2 text-sm font-mono break-all select-all">
                  {apiKey}
                </code>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(apiKey);
                }}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 rounded-lg transition mb-3"
              >
                📋 コピー
              </button>

              <Link
                href="/dashboard"
                className="block w-full bg-brand-700 hover:bg-brand-800 text-white font-semibold py-2.5 rounded-lg transition text-center"
              >
                ダッシュボードへ
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
              新規登録
            </h1>
            <p className="text-sm text-gray-500 text-center mb-8">
              無料の Flex プランで始められます
            </p>

            {error && (
              <div className="bg-red-50 text-red-700 rounded-lg px-4 py-3 text-sm mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  パスワード <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition"
                  placeholder="8文字以上"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  会社名（任意）
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition"
                  placeholder="株式会社〇〇"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-700 hover:bg-brand-800 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-50"
              >
                {loading ? "登録中..." : "無料で始める"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
              既にアカウントをお持ちの方は{" "}
              <Link
                href="/login"
                className="text-brand-700 hover:text-brand-900 font-medium"
              >
                ログイン
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
