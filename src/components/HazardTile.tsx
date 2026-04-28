"use client";

import type { HazardResponse } from "@/lib/types";
import ResultTile from "./ResultTile";

const LEVEL_META: Record<string, { bar: string; badge: string; label: string }> = {
  very_high: { bar: "bg-red-600", badge: "bg-red-100 text-red-700", label: "非常に高い" },
  high: { bar: "bg-orange-500", badge: "bg-orange-100 text-orange-700", label: "高い" },
  medium: { bar: "bg-yellow-500", badge: "bg-yellow-100 text-yellow-700", label: "中程度" },
  low: { bar: "bg-lime-500", badge: "bg-lime-100 text-lime-700", label: "低い" },
  very_low: { bar: "bg-green-500", badge: "bg-green-100 text-green-700", label: "非常に低い" },
  none: { bar: "bg-gray-400", badge: "bg-gray-100 text-gray-600", label: "リスクなし" },
  unavailable: { bar: "bg-gray-300", badge: "bg-gray-100 text-gray-400", label: "データなし" },
};

function meta(level: string) {
  return LEVEL_META[level] ?? LEVEL_META.none;
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  if (value == null) return null;
  return (
    <div className="flex justify-between gap-4 py-1.5">
      <span className="text-caption text-ink-muted-48">{label}</span>
      <span className="text-caption-strong text-ink text-right">{value}</span>
    </div>
  );
}

interface HazardTileProps {
  hazard: HazardResponse;
  expanded: boolean;
  onToggle: () => void;
}

export default function HazardTile({
  hazard,
  expanded,
  onToggle,
}: HazardTileProps) {
  const { composite_score, flood, landslide, tsunami } = hazard;
  const m = meta(composite_score.level);
  const pct = Math.min(100, (composite_score.score / 5) * 100);

  return (
    <ResultTile
      icon="⚠️"
      title="ハザード"
      expanded={expanded}
      onToggle={onToggle}
      summary={
        <>
          <div className="flex items-center gap-3">
            <span className="text-[28px] font-semibold text-ink">
              {composite_score.score.toFixed(1)}
            </span>
            <span className="text-ink-muted-48">/ 5</span>
            <span
              className={`inline-flex items-center px-3 py-0.5 rounded-pill text-caption ${m.badge}`}
            >
              {m.label}
            </span>
          </div>
          <div className="w-full bg-divider-soft rounded-pill h-2 mt-1">
            <div
              className={`h-2 rounded-pill ${m.bar} transition-all`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </>
      }
      details={
        <div className="space-y-4">
          {/* Flood */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span>🌊</span>
              <span className="font-semibold text-sm">洪水浸水</span>
              <span
                className={`ml-auto text-xs px-2 py-0.5 rounded-full ${meta(flood.risk_level).badge}`}
              >
                {meta(flood.risk_level).label}
              </span>
            </div>
            <Row label="浸水深" value={flood.depth_range} />
            <Row
              label="再現期間"
              value={
                flood.return_period_years
                  ? `${flood.return_period_years} 年`
                  : null
              }
            />
            <Row label="出典" value={flood.source} />
          </div>

          {/* Landslide */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span>⛰️</span>
              <span className="font-semibold text-sm">土砂災害</span>
              <span
                className={`ml-auto text-xs px-2 py-0.5 rounded-full ${meta(landslide.risk_level).badge}`}
              >
                {meta(landslide.risk_level).label}
              </span>
            </div>
            <Row label="区域区分" value={landslide.zone_type} />
            <Row label="出典" value={landslide.source} />
          </div>

          {/* Tsunami */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span>🌊</span>
              <span className="font-semibold text-sm">津波浸水</span>
              <span
                className={`ml-auto text-xs px-2 py-0.5 rounded-full ${meta(tsunami.risk_level).badge}`}
              >
                {meta(tsunami.risk_level).label}
              </span>
            </div>
            {tsunami.depth_m != null && (
              <Row label="浸水深" value={`${tsunami.depth_m} m`} />
            )}
            <Row label="出典" value={tsunami.source} />
          </div>


        </div>
      }
    />
  );
}
