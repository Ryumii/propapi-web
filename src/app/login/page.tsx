"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { login } from "@/lib/dashboard-api";
import { setAuth } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await login(email, password);
      setAuth(data.token, data.user);
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "ログインに失敗しました");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
              ログイン
            </h1>
            <p className="text-sm text-gray-500 text-center mb-8">
              PropAPI 開発者ダッシュボード
            </p>

            {error && (
              <div className="bg-red-50 text-red-700 rounded-lg px-4 py-3 text-sm mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  メールアドレス
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
                  パスワード
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

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-700 hover:bg-brand-800 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-50"
              >
                {loading ? "ログイン中..." : "ログイン"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
              アカウントをお持ちでない方は{" "}
              <Link
                href="/register"
                className="text-brand-700 hover:text-brand-900 font-medium"
              >
                新規登録
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
