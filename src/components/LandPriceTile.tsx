"use client";

import type { LandPriceResponse, NearbyLandPrice } from "@/lib/types";
import ResultTile from "./ResultTile";

const LandPriceIcon = () => (
  <svg className="w-6 h-6 text-ink-muted-48 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18" />
    <path d="M7 16v-3M11 16V9M15 16v-5M19 16V7" />
  </svg>
);

function formatPrice(price: number): string {
  if (price >= 10000) {
    return `${(price / 10000).toFixed(1)}万円/㎡`;
  }
  return `${price.toLocaleString()}円/㎡`;
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  if (value == null) return null;
  return (
    <div className="flex justify-between gap-4 py-2 border-b border-divider-soft last:border-0">
      <span className="text-caption text-ink-muted-48">{label}</span>
      <span className="text-caption-strong text-ink text-right">{value}</span>
    </div>
  );
}

function YoyBadge({ pct }: { pct: number | null }) {
  if (pct == null) return null;
  const color =
    pct > 0
      ? "text-red-600 bg-red-50"
      : pct < 0
        ? "text-blue-600 bg-blue-50"
        : "text-gray-500 bg-gray-100";
  return (
    <span className={`text-sm font-semibold px-2 py-0.5 rounded-full ${color}`}>
      {pct > 0 ? "+" : ""}
      {pct.toFixed(1)}%
    </span>
  );
}

interface LandPriceTileProps {
  landPrice: LandPriceResponse;
  expanded: boolean;
  onToggle: () => void;
}

export default function LandPriceTile({
  landPrice,
  expanded,
  onToggle,
}: LandPriceTileProps) {
  const nearest = landPrice.nearest;

  if (!nearest) {
    return (
      <ResultTile
        icon={<LandPriceIcon />}
        title="公示地価"
        expanded={expanded}
        onToggle={onToggle}
        summary={
          <p className="text-caption text-ink-muted-48">
            2km 圏内に公示地価ポイントが見つかりませんでした
          </p>
        }
        details={<div />}
      />
    );
  }

  return (
    <ResultTile
      icon={<LandPriceIcon />}
      title="公示地価"
      expanded={expanded}
      onToggle={onToggle}
      summary={
        <>
          <div className="flex items-center gap-2">
            <span className="text-[28px] font-semibold text-primary">
              {formatPrice(nearest.price_per_sqm)}
            </span>
            <YoyBadge pct={nearest.yoy_change_pct} />
          </div>
          {nearest.address && (
            <p className="text-caption text-ink-muted-48 truncate">{nearest.address}</p>
          )}
        </>
      }
      details={
        <div className="space-y-0">
          <Row label="所在地" value={nearest.address} />
          <Row label="利用現況" value={nearest.land_use} />
          <Row
            label="地積"
            value={nearest.area_sqm ? `${nearest.area_sqm} ㎡` : null}
          />
          <Row label="建物構造" value={nearest.structure} />
          <Row
            label="最寄駅"
            value={
              nearest.nearest_station
                ? `${nearest.nearest_station}${nearest.station_distance_m ? ` (${nearest.station_distance_m}m)` : ""}`
                : null
            }
          />
          <Row label="検索地点からの距離" value={`${nearest.distance_m}m`} />

          {landPrice.nearby.length > 1 && (
            <div className="mt-4">
              <h4 className="text-caption-strong text-ink-muted-80 mb-2">
                近隣の公示地価（{landPrice.nearby.length}件）
              </h4>
              {landPrice.nearby.slice(0, 5).map((p: NearbyLandPrice, i: number) => (
                <div
                  key={i}
                  className="flex items-center gap-3 py-2 border-b border-divider-soft last:border-0 text-caption"
                >
                  <span className="text-ink-muted-48 w-5 text-right">{i + 1}</span>
                  <span className="text-caption-strong text-ink flex-1">
                    {formatPrice(p.price_per_sqm)}
                    {p.yoy_change_pct != null && (
                      <span
                        className={`ml-1 text-xs ${p.yoy_change_pct > 0 ? "text-red-500" : p.yoy_change_pct < 0 ? "text-blue-500" : "text-gray-400"}`}
                      >
                        ({p.yoy_change_pct > 0 ? "+" : ""}
                        {p.yoy_change_pct.toFixed(1)}%)
                      </span>
                    )}
                  </span>
                  <span className="text-caption text-ink-muted-48">
                    {p.land_use ?? "—"}
                  </span>
                  <span className="text-caption text-ink-muted-48 w-16 text-right">
                    {p.distance_m}m
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      }
    />
  );
}
