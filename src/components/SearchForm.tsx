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
        {/* Search icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted-48 ${
            compact ? "h-4 w-4" : "h-5 w-5"
          }`}
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
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="住所を入力（例: 東京都江東区海の森3-3）"
          className={`w-full border border-hairline bg-canvas rounded-pill font-body
            focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-focus/30
            transition placeholder:text-ink-muted-48 ${
              compact
                ? "pl-10 pr-12 py-2 text-caption h-10"
                : "pl-12 pr-16 py-3 text-body h-11"
            }`}
          aria-label="住所検索"
        />
        <button
          type="submit"
          disabled={!address.trim()}
          className={`absolute right-2 top-1/2 -translate-y-1/2
            bg-primary disabled:bg-ink-muted-48 text-white rounded-pill
            transition-transform active:scale-95 ${
              compact ? "px-3 py-1" : "px-4 py-1.5"
            }`}
          aria-label="検索"
        >
          <span className="text-button-utility">検索</span>
        </button>
      </div>
    </form>
  );
}
