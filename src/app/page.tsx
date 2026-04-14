"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Metadata } from "next";
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

export default function Home() {
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
              <div className="animate-spin h-8 w-8 border-4 border-brand-700 border-t-transparent rounded-full" />
              <span className="ml-3 text-gray-500">分析中…</span>
            </div>
          )}

          {error && (
            <div className="max-w-3xl mx-auto px-4 py-8">
              <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-red-700 text-sm">
                <p className="font-semibold">エラー</p>
                <p>{error}</p>
              </div>
            </div>
          )}

          {data && <SerpSection data={data} query={query} />}
        </div>

        <FeatureSection />
      </main>

      <Footer />
      <FeedbackFab />
    </div>
  );
}
