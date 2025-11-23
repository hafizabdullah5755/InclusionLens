import React from "react";

const CATEGORIES = ["All", "Dyslexia", "ADHD", "Autism", "EAL", "Sensory"];

export default function StrategyFilters({
  category,
  setCategory,
  search,
  setSearch,
}) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 shadow-sm">
      <label className="block text-sm font-semibold mb-2">
        Search strategies
      </label>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="e.g., instructions, reading, anxiety…"
        className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-950"
        aria-label="Search strategies"
      />

      <label className="block text-sm font-semibold mt-4 mb-2">
        Learner need
      </label>
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`text-sm px-3 py-1 rounded-full border transition ${
              category === c
                ? "bg-slate-900 text-white dark:bg-white dark:text-black"
                : "border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
            aria-pressed={category === c}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
