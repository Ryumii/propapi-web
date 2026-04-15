"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { isLoggedIn, getUser, clearAuth, type AuthUser } from "@/lib/auth";
import {
  getOverview,
  createKey,
  revokeKey,
  getUsageChart,
  getPlans,
  createCheckout,
  type OverviewData,
  type UsageChartData,
  type PlanInfo,
  type CreateKeyResult,
} from "@/lib/dashboard-api";

// ---------- Plan display helpers -----------------------------------------

const PLAN_COLORS: Record<string, string> = {
  flex: "bg-gray-100 text-gray-700",
  light: "bg-blue-100 text-blue-700",
  pro: "bg-purple-100 text-purple-700",
  max: "bg-amber-100 text-amber-700",
};

const PLAN_PRICES: Record<string, string> = {
  flex: "従量制",
  light: "¥500/月",
  pro: "¥2,980/月",
  max: "¥9,800/月",
};

function PlanBadge({ plan }: { plan: string }) {
  return (
    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${PLAN_COLORS[plan] ?? "bg-gray-100 text-gray-700"}`}>
      {plan.toUpperCase()}
    </span>
  );
}

// ---------- Main page ----------------------------------------------------

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [overview, setOverview] = useState<OverviewData | null>(null);
  const [usageChart, setUsageChart] = useState<UsageChartData | null>(null);
  const [plans, setPlans] = useState<Record<string, PlanInfo> | null>(null);
  const [newKey, setNewKey] = useState<CreateKeyResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"overview" | "keys" | "usage" | "plan">("overview");

  const loadData = useCallback(async () => {
    try {
      const [ov, chart, pl] = await Promise.all([
        getOverview(),
        getUsageChart(30),
        getPlans(),
      ]);
      setOverview(ov);
      setUsageChart(chart);
      setPlans(pl);
    } catch (err: unknown) {
      if (err instanceof Error && "status" in err && (err as { status: number }).status === 401) {
        clearAuth();
        router.push("/login");
        return;
      }
      setError(err instanceof Error ? err.message : "データの取得に失敗しました");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login");
      return;
    }
    setUser(getUser());
    loadData();
  }, [router, loadData]);

  function handleLogout() {
    clearAuth();
    router.push("/login");
  }

  async function handleCreateKey() {
    try {
      const result = await createKey();
      setNewKey(result);
      await loadData();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "キーの作成に失敗しました");
    }
  }

  async function handleRevokeKey(keyId: number) {
    if (!confirm("この API Key を無効化しますか？")) return;
    try {
      await revokeKey(keyId);
      await loadData();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "キーの無効化に失敗しました");
    }
  }

  async function handleUpgrade(plan: string) {
    try {
      const url = await createCheckout(plan);
      window.location.href = url;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "チェックアウトの作成に失敗しました");
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-gray-400">読み込み中...</div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Header bar */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">開発者ダッシュボード</h1>
              <p className="text-sm text-gray-500 mt-1">
                {user?.email} · <PlanBadge plan={overview?.user.plan ?? "flex"} />
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-500 hover:text-gray-700 transition"
            >
              ログアウト
            </button>
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 rounded-lg px-4 py-3 text-sm mb-6">
              {error}
              <button onClick={() => setError("")} className="ml-2 underline">閉じる</button>
            </div>
          )}

          {/* New key notice */}
          {newKey && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <p className="text-sm font-medium text-amber-800 mb-2">
                ⚠️ 新しい API Key が作成されました。一度だけ表示されます:
              </p>
              <code className="block bg-white border border-amber-200 rounded px-3 py-2 text-sm font-mono break-all select-all">
                {newKey.api_key}
              </code>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => navigator.clipboard.writeText(newKey.api_key)}
                  className="text-xs bg-amber-100 hover:bg-amber-200 text-amber-700 px-3 py-1 rounded transition"
                >
                  📋 コピー
                </button>
                <button
                  onClick={() => setNewKey(null)}
                  className="text-xs text-amber-600 hover:underline"
                >
                  閉じる
                </button>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-8 w-fit">
            {(["overview", "keys", "usage", "plan"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  tab === t
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {{ overview: "概要", keys: "API Keys", usage: "利用量", plan: "プラン" }[t]}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {tab === "overview" && overview && <OverviewTab overview={overview} />}
          {tab === "keys" && overview && (
            <KeysTab
              keys={overview.keys}
              onCreateKey={handleCreateKey}
              onRevokeKey={handleRevokeKey}
            />
          )}
          {tab === "usage" && usageChart && <UsageTab chart={usageChart} />}
          {tab === "plan" && plans && overview && (
            <PlanTab
              plans={plans}
              currentPlan={overview.user.plan}
              onUpgrade={handleUpgrade}
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

// ---------- Tab: Overview ------------------------------------------------

function OverviewTab({ overview }: { overview: OverviewData }) {
  const { usage, plan, keys } = overview;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        title="今月のリクエスト"
        value={usage.month_total.toLocaleString()}
        sub={plan.monthly_limit > 0 ? `/ ${plan.monthly_limit.toLocaleString()} (${usage.percent_used}%)` : "従量制（上限なし）"}
        color={usage.percent_used > 80 ? "text-red-600" : "text-brand-700"}
      />
      <StatCard
        title="プラン"
        value={plan.name}
        sub={PLAN_PRICES[overview.user.plan] ?? ""}
        color="text-gray-900"
      />
      <StatCard
        title="API Keys"
        value={`${keys.filter((k) => k.is_active).length}`}
        sub={`/ ${keys.length} 件`}
        color="text-gray-900"
      />
      {plan.monthly_limit > 0 && (
        <div className="md:col-span-3">
          <UsageBar used={usage.month_total} limit={plan.monthly_limit} />
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, sub, color }: { title: string; value: string; sub: string; color: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
      <p className="text-sm text-gray-400 mt-1">{sub}</p>
    </div>
  );
}

function UsageBar({ used, limit }: { used: number; limit: number }) {
  const pct = Math.min((used / limit) * 100, 100);
  const barColor = pct > 80 ? "bg-red-500" : pct > 50 ? "bg-amber-500" : "bg-brand-600";
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <span>月間利用量</span>
        <span>{used.toLocaleString()} / {limit.toLocaleString()}</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-3">
        <div className={`${barColor} h-3 rounded-full transition-all`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

// ---------- Tab: Keys ----------------------------------------------------

function KeysTab({
  keys,
  onCreateKey,
  onRevokeKey,
}: {
  keys: OverviewData["keys"];
  onCreateKey: () => void;
  onRevokeKey: (id: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">API Keys</h2>
        <button
          onClick={onCreateKey}
          className="bg-brand-700 hover:bg-brand-800 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
        >
          + 新しいキーを作成
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 text-left text-xs text-gray-500 uppercase tracking-wider">
              <th className="px-6 py-3">プレフィックス</th>
              <th className="px-6 py-3">プラン</th>
              <th className="px-6 py-3">レート</th>
              <th className="px-6 py-3">状態</th>
              <th className="px-6 py-3">作成日</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {keys.map((k) => (
              <tr key={k.id}>
                <td className="px-6 py-4 font-mono text-sm">{k.key_prefix}...</td>
                <td className="px-6 py-4"><PlanBadge plan={k.plan} /></td>
                <td className="px-6 py-4 text-sm text-gray-500">{k.rate_per_sec} req/s</td>
                <td className="px-6 py-4">
                  {k.is_active ? (
                    <span className="text-green-600 text-xs font-medium">有効</span>
                  ) : (
                    <span className="text-gray-400 text-xs">無効</span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">
                  {new Date(k.created_at).toLocaleDateString("ja-JP")}
                </td>
                <td className="px-6 py-4 text-right">
                  {k.is_active && (
                    <button
                      onClick={() => onRevokeKey(k.id)}
                      className="text-red-500 hover:text-red-700 text-xs"
                    >
                      無効化
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {keys.length === 0 && (
          <p className="text-center text-gray-400 py-8 text-sm">API Key がありません</p>
        )}
      </div>
    </div>
  );
}

// ---------- Tab: Usage ---------------------------------------------------

function UsageTab({ chart }: { chart: UsageChartData }) {
  const maxCount = Math.max(...chart.daily.map((d) => d.count), 1);
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        過去30日の利用量
        <span className="text-sm font-normal text-gray-400 ml-2">
          合計 {chart.total.toLocaleString()} リクエスト
        </span>
      </h2>
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        {chart.daily.length === 0 ? (
          <p className="text-center text-gray-400 py-12 text-sm">まだ利用データがありません</p>
        ) : (
          <div className="flex items-end gap-1 h-48">
            {chart.daily.map((d) => {
              const h = Math.max((d.count / maxCount) * 100, 2);
              return (
                <div key={d.date} className="flex-1 flex flex-col items-center group relative">
                  <div
                    className="w-full bg-brand-500 rounded-t hover:bg-brand-600 transition cursor-default"
                    style={{ height: `${h}%` }}
                  />
                  <div className="absolute -top-8 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap">
                    {d.date}: {d.count.toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- Tab: Plan ----------------------------------------------------

function PlanTab({
  plans,
  currentPlan,
  onUpgrade,
}: {
  plans: Record<string, PlanInfo>;
  currentPlan: string;
  onUpgrade: (plan: string) => void;
}) {
  const order = ["flex", "light", "pro", "max"];
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">プラン変更</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {order.map((key) => {
          const p = plans[key];
          if (!p) return null;
          const isCurrent = key === currentPlan;
          return (
            <div
              key={key}
              className={`bg-white rounded-xl border-2 p-6 ${
                isCurrent ? "border-brand-500" : "border-gray-100"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">{p.name}</h3>
                {isCurrent && (
                  <span className="text-xs bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full font-medium">
                    現在
                  </span>
                )}
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">
                {PLAN_PRICES[key]}
              </p>
              <ul className="space-y-2 text-sm text-gray-500 mt-4 mb-6">
                <li>
                  {p.monthly_limit > 0
                    ? `月間 ${p.monthly_limit.toLocaleString()} リクエスト`
                    : "上限なし（従量制）"}
                </li>
                <li>{p.rate_per_sec} req/s</li>
                <li>超過 ¥{p.overage_price_yen}/req</li>
              </ul>
              {!isCurrent && key !== "flex" && (
                <button
                  onClick={() => onUpgrade(key)}
                  className="w-full bg-brand-700 hover:bg-brand-800 text-white text-sm font-medium py-2 rounded-lg transition"
                >
                  {order.indexOf(key) > order.indexOf(currentPlan) ? "アップグレード" : "変更"}
                </button>
              )}
              {isCurrent && (
                <p className="text-center text-sm text-gray-400">現在のプラン</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
