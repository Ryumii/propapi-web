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

const LEVEL_SEVERITY: Record<string, number> = {
  very_high: 5,
  high: 4,
  medium: 3,
  low: 2,
  very_low: 1,
  none: 0,
  unavailable: -1,
};

function meta(level: string) {
  return LEVEL_META[level] ?? LEVEL_META.none;
}

function severity(level: string) {
  return LEVEL_SEVERITY[level] ?? 0;
}

const HazardIcon = () => (
  <svg className="w-6 h-6 text-ink-muted-48 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M12 8v4M12 16h.01" />
  </svg>
);

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
  const { flood, landslide, tsunami } = hazard;

  // Build list of notable hazard items (medium or above), sorted by severity
  const items: { name: string; level: string }[] = [
    { name: "洪水浸水リスク", level: flood.risk_level },
    { name: "土砂災害リスク", level: landslide.risk_level },
    { name: "津波浸水リスク", level: tsunami.risk_level },
  ]
    .filter((i) => severity(i.level) >= 2) // low以上を表示対象
    .sort((a, b) => severity(b.level) - severity(a.level));

  const topItem = items[0];
  const remaining = items.length - 1;

  return (
    <ResultTile
      icon={<HazardIcon />}
      title="ハザード"
      expanded={expanded}
      onToggle={onToggle}
      summary={
        topItem ? (
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-body-strong text-ink">{topItem.name}</span>
              <span
                className={`inline-flex items-center px-3 py-0.5 rounded-pill text-caption ${meta(topItem.level).badge}`}
              >
                {meta(topItem.level).label}
              </span>
            </div>
            {remaining > 0 && (
              <p className="text-caption text-primary">
                ほか{remaining}項目 →
              </p>
            )}
          </div>
        ) : (
          <p className="text-caption text-ink-muted-48">
            検出されたリスクはありません
          </p>
        )
      }
      details={
        <div className="space-y-4">
          {/* Flood */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-caption-strong text-ink">洪水浸水</span>
              <span
                className={`ml-auto text-caption px-2 py-0.5 rounded-pill ${meta(flood.risk_level).badge}`}
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
              <span className="text-caption-strong text-ink">土砂災害</span>
              <span
                className={`ml-auto text-caption px-2 py-0.5 rounded-pill ${meta(landslide.risk_level).badge}`}
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
              <span className="text-caption-strong text-ink">津波浸水</span>
              <span
                className={`ml-auto text-caption px-2 py-0.5 rounded-pill ${meta(tsunami.risk_level).badge}`}
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
