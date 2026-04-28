"use client";

import type { ZoningResponse } from "@/lib/types";
import ResultTile from "./ResultTile";

const ZoningIcon = () => (
  <svg className="w-6 h-6 text-ink-muted-48 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4M9 9h.01M15 9h.01M9 13h.01M15 13h.01" />
  </svg>
);

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  if (value == null) return null;
  return (
    <div className="flex justify-between gap-4 py-2 border-b border-divider-soft last:border-0">
      <span className="text-caption text-ink-muted-48">{label}</span>
      <span className="text-caption-strong text-ink text-right">{value}</span>
    </div>
  );
}

interface ZoningTileProps {
  zoning: ZoningResponse;
  expanded: boolean;
  onToggle: () => void;
}

export default function ZoningTile({
  zoning,
  expanded,
  onToggle,
}: ZoningTileProps) {
  return (
    <ResultTile
      icon={<ZoningIcon />}
      title="用途地域"
      expanded={expanded}
      onToggle={onToggle}
      summary={
        <>
          <p className="text-body-strong text-primary">
            {zoning.use_district}
          </p>
          <div className="flex gap-4 text-caption text-ink-muted-80">
            {zoning.building_coverage_pct != null && (
              <span>建ぺい率 {zoning.building_coverage_pct}%</span>
            )}
            {zoning.floor_area_ratio_pct != null && (
              <span>容積率 {zoning.floor_area_ratio_pct}%</span>
            )}
          </div>
        </>
      }
      details={
        <div className="space-y-0">
          <Row
            label="建ぺい率"
            value={
              zoning.building_coverage_pct != null
                ? `${zoning.building_coverage_pct}%`
                : null
            }
          />
          <Row
            label="容積率"
            value={
              zoning.floor_area_ratio_pct != null
                ? `${zoning.floor_area_ratio_pct}%`
                : null
            }
          />
          <Row label="防火指定" value={zoning.fire_prevention} />
          <Row label="高度地区" value={zoning.height_district} />
          <Row label="風致地区" value={zoning.scenic_district} />
          <Row label="用途コード" value={zoning.use_district_code} />
          <Row label="出典" value={zoning.source} />
        </div>
      }
    />
  );
}
