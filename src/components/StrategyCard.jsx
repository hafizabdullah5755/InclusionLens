import React from "react";
import { motion } from "framer-motion";

export default function StrategyCard({ strategy, onPrint }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-sm"
      role="article"
      aria-label={`${strategy.category} strategy: ${strategy.title}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800">
          {strategy.category}
        </div>
        {strategy.printable && (
          <button
            onClick={() => onPrint(strategy)}
            className="text-xs px-3 py-1 rounded-full border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            Print card
          </button>
        )}
      </div>

      <h3 className="text-lg font-semibold mt-3">{strategy.title}</h3>

      <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
        <strong>Barrier:</strong> {strategy.barrier}
      </p>

      <div className="mt-3">
        <p className="text-sm font-semibold">Quick fixes</p>
        <ul className="list-disc ml-6 text-sm text-slate-700 dark:text-slate-200">
          {strategy.quickFix.map((q, i) => (
            <li key={i}>{q}</li>
          ))}
        </ul>
      </div>

      <div className="mt-3">
        <p className="text-sm font-semibold">Classroom use</p>
        <ul className="list-disc ml-6 text-sm text-slate-700 dark:text-slate-200">
          {strategy.classroomUse.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
        Evidence note: {strategy.evidence}
      </p>

      <div className="flex flex-wrap gap-2 mt-3">
        {strategy.tags.map((t) => (
          <span
            key={t}
            className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800"
          >
            #{t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
