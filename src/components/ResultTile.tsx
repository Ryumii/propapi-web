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
      className={`bg-white border border-gray-200 rounded-xl transition-all ${
        expanded
          ? "sm:col-span-2 shadow-md border-brand-300"
          : "hover:border-brand-300 hover:shadow-md cursor-pointer"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-left p-5 focus:outline-none"
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">{icon}</span>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {expanded && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
              className="ml-auto text-gray-400 hover:text-gray-600 p-1"
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
        <div className="px-5 pb-4 text-xs text-brand-600 flex items-center gap-1">
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
        <div className="px-5 pb-5 border-t border-gray-100 pt-4 animate-in fade-in duration-300">
          {details}
        </div>
      )}
    </div>
  );
}
