"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import SerpSection from "@/components/SerpSection";
import FeatureSection from "@/components/FeatureSection";
import FeedbackFab from "@/components/FeedbackFab";
import {
  inspect,
  inspectByCoords,
  parseCoordinates,
  ApiError,
} from "@/lib/api";
import type { InspectResponse } from "@/lib/types";

export default function HomeClient() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<InspectResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const serpRef = useRef<HTMLDivElement>(null);

  const fetchData = useCallback(async (addr: string) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const coords = parseCoordinates(addr);
      const res = coords
        ? await inspectByCoords(coords.lat, coords.lng)
        : await inspect(addr);
      setData(res);
    } catch (e) {
      if (e instanceof ApiError) {
        setError(e.message);
      } else {
        setError("サーバーとの通信に失敗しました。");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = useCallback(
    (q: string) => {
      setQuery(q);
      window.history.pushState({}, "", `?address=${encodeURIComponent(q)}`);
      fetchData(q);
    },
    [fetchData],
  );

  // Scroll to SERP when data loads
  useEffect(() => {
    if (data && serpRef.current) {
      serpRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [data]);

  // Handle initial URL with ?address= param
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const addr = params.get("address");
    if (addr) {
      setQuery(addr);
      fetchData(addr);
    }
  }, [fetchData]);

  // Handle browser back/forward
  useEffect(() => {
    const onPop = () => {
      const params = new URLSearchParams(window.location.search);
      const addr = params.get("address");
      if (addr) {
        setQuery(addr);
        fetchData(addr);
      } else {
        setQuery("");
        setData(null);
        setError(null);
      }
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [fetchData]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <HeroSection onSearch={handleSearch} />

        {/* SERP: inline search results */}
        <div ref={serpRef}>
          {loading && (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
              <span className="ml-3 text-caption text-ink-muted-48">分析中…</span>
            </div>
          )}

          {error && (
            <div className="max-w-[980px] mx-auto px-4 py-8">
              <div className="rounded-lg bg-canvas border border-hairline p-4 text-body">
                <p className="text-body-strong text-ink">エラー</p>
                <p className="text-caption text-ink-muted-48 mt-1">{error}</p>
              </div>
            </div>
          )}

          {data && <SerpSection data={data} query={query} />}
        </div>

        <FeatureSection />

        {/* FAQ — visible text for SEO & AI search */}
        <section className="bg-canvas py-section" aria-label="よくある質問">
          <div className="max-w-[980px] mx-auto px-4">
            <h2 className="font-display text-display-lg text-ink text-center mb-8">
              よくある質問
            </h2>
            <dl className="space-y-6 max-w-2xl mx-auto">
              <div>
                <dt className="text-body-strong text-ink mb-1">
                  ぷろぱぴ（PropAPI）とは何ですか？
                </dt>
                <dd className="text-body text-ink-muted-80">
                  ぷろぱぴ（PropAPI）は、住所を入力するだけで洪水・土砂災害・津波のハザードリスク、用途地域、公示地価、学区情報を一括取得できる不動産土地情報APIです。不動産仲介、保険査定、ローン審査の業務効率化に利用できます。
                </dd>
              </div>
              <div>
                <dt className="text-body-strong text-ink mb-1">
                  どのようなデータを取得できますか？
                </dt>
                <dd className="text-body text-ink-muted-80">
                  洪水・土砂災害・津波のハザードマップ情報、用途地域（建ぺい率・容積率・防火地域）、国土交通省の公示地価、小学校・中学校の学区情報、住所のジオコーディング（座標変換）が取得できます。
                </dd>
              </div>
              <div>
                <dt className="text-body-strong text-ink mb-1">
                  料金はかかりますか？
                </dt>
                <dd className="text-body text-ink-muted-80">
                  無料プランがあり、基本的な機能を無料で利用できます。大量のAPIコールが必要な場合は有料プランをご用意しています。
                </dd>
              </div>
              <div>
                <dt className="text-body-strong text-ink mb-1">
                  APIの利用方法を教えてください
                </dt>
                <dd className="text-body text-ink-muted-80">
                  REST APIとして提供しており、住所または緯度経度を指定してHTTPリクエストを送るだけで利用できます。また、MCP（Model Context Protocol）経由でClaude DesktopやChatGPTなどのLLMから直接利用することも可能です。
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </main>

      <Footer />
      <FeedbackFab />
    </div>
  );
}
