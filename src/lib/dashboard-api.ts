/** Dashboard API client — calls auth & dashboard endpoints. */

import { getToken } from "./auth";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "https://api.propapi.jp";

class DashboardApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function authFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const token = getToken();
  if (!token) throw new DashboardApiError(401, "ログインが必要です");

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ detail: res.statusText }));
    throw new DashboardApiError(res.status, body.detail ?? res.statusText);
  }
  return res;
}

// ---------- Auth ---------------------------------------------------------

export async function register(email: string, password: string, companyName?: string) {
  const res = await fetch(`${API_BASE}/v1/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, company_name: companyName || null }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({ detail: res.statusText }));
    throw new DashboardApiError(res.status, body.detail ?? res.statusText);
  }
  return res.json();
}

export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE}/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({ detail: res.statusText }));
    throw new DashboardApiError(res.status, body.detail ?? res.statusText);
  }
  return res.json();
}

// ---------- Dashboard ----------------------------------------------------

export interface OverviewData {
  user: { id: number; email: string; plan: string; company_name: string | null; stripe_subscription_id: string | null };
  plan: { name: string; monthly_limit: number; rate_per_sec: number; burst: number; overage_price_yen: number };
  usage: { month_total: number; monthly_limit: number; percent_used: number };
  keys: ApiKeyInfo[];
}

export interface ApiKeyInfo {
  id: number;
  key_prefix: string;
  plan: string;
  monthly_limit: number;
  rate_per_sec: number;
  is_active: boolean;
  created_at: string;
}

export interface CreateKeyResult {
  api_key: string;
  key_info: ApiKeyInfo;
}

export interface DailyUsage {
  date: string;
  count: number;
}

export interface UsageChartData {
  daily: DailyUsage[];
  total: number;
  monthly_limit: number;
}

export interface PlanInfo {
  name: string;
  monthly_limit: number;
  rate_per_sec: number;
  burst: number;
  overage_price_yen: number;
  price_id: string;
}

export async function getOverview(): Promise<OverviewData> {
  const res = await authFetch("/v1/dashboard/overview");
  return res.json();
}

export async function getKeys(): Promise<ApiKeyInfo[]> {
  const res = await authFetch("/v1/dashboard/keys");
  return res.json();
}

export async function createKey(): Promise<CreateKeyResult> {
  const res = await authFetch("/v1/dashboard/keys", { method: "POST" });
  return res.json();
}

export async function revokeKey(keyId: number): Promise<void> {
  await authFetch(`/v1/dashboard/keys/${keyId}`, { method: "DELETE" });
}

export async function getUsageChart(days = 30): Promise<UsageChartData> {
  const res = await authFetch(`/v1/dashboard/usage?days=${days}`);
  return res.json();
}

export async function getPlans(): Promise<Record<string, PlanInfo>> {
  const res = await fetch(`${API_BASE}/v1/billing/plans`);
  const data = await res.json();
  return data.plans;
}

export async function createCheckout(plan: string): Promise<string> {
  const res = await authFetch("/v1/billing/checkout", {
    method: "POST",
    body: JSON.stringify({
      plan,
      success_url: `${window.location.origin}/dashboard?upgraded=true`,
      cancel_url: `${window.location.origin}/dashboard`,
    }),
  });
  const data = await res.json();
  return data.checkout_url;
}

export { DashboardApiError };
