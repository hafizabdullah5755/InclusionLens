import React from "react";
import { STRATEGIES } from "../data/strategies";
import StrategyCard from "../components/StrategyCard";
import StrategyFilters from "../components/StrategyFilters";

export default function StrategyFinder() {
  const [category, setCategory] = React.useState("All");
  const [search, setSearch] = React.useState("");
  const [printStrategy, setPrintStrategy] = React.useState(null);

  const filtered = React.useMemo(() => {
    return STRATEGIES.filter((s) => {
      const matchesCategory =
        category === "All" || s.category.toLowerCase() === category.toLowerCase();

      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.barrier.toLowerCase().includes(q) ||
        s.tags.join(" ").toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  const handlePrint = (strategy) => {
    setPrintStrategy(strategy);
    setTimeout(() => window.print(), 50);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Strategy Finder</h1>
        <p className="text-slate-600 dark:text-slate-300 mt-2">
          Find instant, classroom-ready adaptations for common learner needs.
        </p>
      </header>

      {/* Filters */}
      <StrategyFilters
        category={category}
        setCategory={setCategory}
        search={search}
        setSearch={setSearch}
      />

      {/* Results */}
      <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.length === 0 ? (
          <p className="text-slate-600 dark:text-slate-300">
            No strategies match your search.
          </p>
        ) : (
          filtered.map((s) => (
            <StrategyCard key={s.id} strategy={s} onPrint={handlePrint} />
          ))
        )}
      </section>

      {/* Print-only Action Card */}
      {printStrategy && (
        <div className="print:block hidden mt-6 p-6 border">
          <h2 className="text-xl font-bold">{printStrategy.title}</h2>
          <p className="text-sm mt-2">
            <strong>Category:</strong> {printStrategy.category}
          </p>
          <p className="text-sm mt-2">
            <strong>Barrier:</strong> {printStrategy.barrier}
          </p>
          <div className="mt-3">
            <strong>Quick fixes</strong>
            <ul className="list-disc ml-6">
              {printStrategy.quickFix.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ul>
          </div>
          <div className="mt-3">
            <strong>Classroom use</strong>
            <ul className="list-disc ml-6">
              {printStrategy.classroomUse.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
