"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

interface SearchFormProps {
  compact?: boolean;
  defaultValue?: string;
  /** When provided, call this instead of navigating to /search */
  onSearch?: (query: string) => void;
}

export default function SearchForm({
  compact = false,
  defaultValue = "",
  onSearch,
}: SearchFormProps) {
  const [address, setAddress] = useState(defaultValue);
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = address.trim();
    if (!trimmed) return;
    if (onSearch) {
      onSearch(trimmed);
    } else {
      router.push(`/search?address=${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full" role="search">
      <div className="relative">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="住所を入力（例: 東京都江東区海の森3-3）"
          className={`w-full border-2 border-gray-200 rounded-xl focus:border-brand-600 focus:ring-2 focus:ring-brand-600 focus:ring-offset-2 transition ${
            compact
              ? "px-4 py-2 pr-12 text-sm shadow-sm"
              : "px-5 py-4 pr-16 text-lg shadow-lg"
          }`}
          aria-label="住所検索"
        />
        <button
          type="submit"
          disabled={!address.trim()}
          className={`absolute right-2 top-1/2 -translate-y-1/2 bg-brand-900 hover:bg-brand-800 disabled:bg-gray-300 text-white rounded-lg transition-colors ${
            compact ? "px-2 py-1" : "px-4 py-2"
          }`}
          aria-label="検索"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={compact ? "h-4 w-4" : "h-5 w-5"}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}
