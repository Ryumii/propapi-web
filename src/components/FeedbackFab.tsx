"use client";

export default function FeedbackFab() {
  return (
    <a
      href="mailto:feedback@propapi.jp"
      className="fixed bottom-6 right-6 z-40 bg-brand-900 hover:bg-brand-800 text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center group"
      aria-label="フィードバックを送る"
    >
      <svg
        className="w-6 h-6 group-hover:scale-110 transition-transform"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
        />
      </svg>
    </a>
  );
}
