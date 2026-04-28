"use client";

import type { SchoolDistrictResponse } from "@/lib/types";
import ResultTile from "./ResultTile";

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  if (value == null) return null;
  return (
    <div className="flex justify-between gap-4 py-2 border-b border-divider-soft last:border-0">
      <span className="text-caption text-ink-muted-48">{label}</span>
      <span className="text-caption-strong text-ink text-right">{value}</span>
    </div>
  );
}

interface SchoolDistrictTileProps {
  schoolDistrict: SchoolDistrictResponse;
  expanded: boolean;
  onToggle: () => void;
}

export default function SchoolDistrictTile({
  schoolDistrict,
  expanded,
  onToggle,
}: SchoolDistrictTileProps) {
  const el = schoolDistrict.elementary;
  const jh = schoolDistrict.junior_high;

  if (!el && !jh) {
    return (
      <ResultTile
        icon="🏫"
        title="学区"
        expanded={expanded}
        onToggle={onToggle}
        summary={
          <p className="text-caption text-ink-muted-48">
            学区情報は検索地点に対応するデータがありません
          </p>
        }
        details={<div />}
      />
    );
  }

  return (
    <ResultTile
      icon="🏫"
      title="学区"
      expanded={expanded}
      onToggle={onToggle}
      summary={
        <div className="space-y-1">
          {el && (
            <p className="text-caption text-ink">
              <span className="text-ink-muted-48">小:</span>{" "}
              <span className="text-caption-strong">{el.school_name}</span>
            </p>
          )}
          {jh && (
            <p className="text-caption text-ink">
              <span className="text-ink-muted-48">中:</span>{" "}
              <span className="text-caption-strong">{jh.school_name}</span>
            </p>
          )}
        </div>
      }
      details={
        <div className="space-y-0">
          {el && (
            <>
              <Row label="小学校名" value={el.school_name} />
              <Row label="設置者" value={el.administrator} />
              <Row label="小学校住所" value={el.address} />
            </>
          )}
          {jh && (
            <>
              <Row label="中学校名" value={jh.school_name} />
              <Row label="設置者" value={jh.administrator} />
              <Row label="中学校住所" value={jh.address} />
            </>
          )}
        </div>
      }
    />
  );
}
