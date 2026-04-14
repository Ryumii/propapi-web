"use client";

import type { ZoningResponse } from "@/lib/types";
import ResultTile from "./ResultTile";

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  if (value == null) return null;
  return (
    <div className="flex justify-between gap-4 py-2 border-b border-gray-100 last:border-0">
      <span className="text-gray-500 text-sm">{label}</span>
      <span className="font-medium text-sm text-right">{value}</span>
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
      icon="🏙️"
      title="用途地域"
      expanded={expanded}
      onToggle={onToggle}
      summary={
        <>
          <p className="text-lg font-bold text-brand-900">
            {zoning.use_district}
          </p>
          <div className="flex gap-4 text-sm text-gray-600">
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
