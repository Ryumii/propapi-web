"use client";

import { type ReactNode } from "react";

interface ResultTileProps {
  icon: string;
  title: string;
  expanded: boolean;
  onToggle: () => void;
  summary: ReactNode;
  details: ReactNode;
}

export default function ResultTile({
  icon,
  title,
  expanded,
  onToggle,
  summary,
  details,
}: ResultTileProps) {
  return (
    <div
      className={`bg-canvas border border-hairline rounded-lg transition-all ${
        expanded
          ? "sm:col-span-2 border-primary/30"
          : "hover:border-primary/20 cursor-pointer"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-left p-6 focus:outline-none"
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">{icon}</span>
          <h3 className="text-body-strong text-ink">{title}</h3>
          {expanded && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
              className="ml-auto text-ink-muted-48 hover:text-ink p-1 transition-colors"
              aria-label="閉じる"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
        <div className="space-y-2">{summary}</div>
      </button>

      {!expanded && (
        <div className="px-6 pb-4 text-caption text-primary flex items-center gap-1">
          <svg
            className="w-3 h-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
          詳細を見る
        </div>
      )}

      {expanded && (
        <div className="px-6 pb-6 border-t border-divider-soft pt-4">
          {details}
        </div>
      )}
    </div>
  );
}
