// src/pages/StrategyFinder.jsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { STRATEGIES } from "../data/strategies";
import "./StrategyFinder.css";
import { askAdaptation } from "../api/adaptClient";

export default function StrategyFinder() {
  // Filters for the static strategy library
  const [need, setNeed] = useState("ADHD");
  const [context, setContext] = useState("Whole class");
  const [noise, setNoise] = useState("Medium");
  const [time, setTime] = useState("Normal");
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState("All");

  // AI integration state
  const [aiStatus, setAiStatus] = useState("idle"); // idle | loading | success | error
  const [aiError, setAiError] = useState("");
  const [aiStrategies, setAiStrategies] = useState([]);

  // Filter static strategies from strategies.js
  const filteredStaticStrategies = useMemo(() => {
    return STRATEGIES.filter((s) => {
      // Basic matching rules (adjust if your schema is different)
      const matchesNeed =
        !need || need === "Any" || s.needs?.includes?.(need) || false;

      const matchesContext =
        !context ||
        context === "Any" ||
        s.contexts?.includes?.(context) ||
        false;

      const matchesTag =
        tagFilter === "All" ||
        s.tags?.some?.((t) => t.toLowerCase() === tagFilter.toLowerCase()) ||
        false;

      const matchesSearch =
        !search ||
        s.title?.toLowerCase().includes(search.toLowerCase()) ||
        s.summary?.toLowerCase().includes(search.toLowerCase()) ||
        false;

      return matchesNeed && matchesContext && matchesTag && matchesSearch;
    });
  }, [need, context, tagFilter, search]);

  async function handleAskAI(e) {
    e.preventDefault();
    setAiStatus("loading");
    setAiError("");
    setAiStrategies([]);

    try {
      const suggestions = await askAdaptation({
        need,
        context,
        noise,
        time,
      });

      setAiStrategies(suggestions);
      setAiStatus("success");
    } catch (err) {
      setAiError(
        err?.message ||
          "Network error while contacting the AI service. Please check your connection and try again."
      );
      setAiStatus("error");
    }
  }

  return (
    <div className="sf-page">
      {/* HEADER */}
      <header className="sf-header">
        <div>
          <h1>Strategy Finder</h1>
          <p className="sf-subtitle">
            Browse a library of classroom strategies and optionally ask the AI
            for extra ideas &ndash; using anonymised learner needs only.
          </p>
        </div>
        <Link className="sf-link" to="/classroom-profile">
          ← Back to Classroom Profile
        </Link>
      </header>

      {/* LAYOUT: filters + results */}
      <div className="sf-layout">
        {/* LEFT: filters + AI trigger */}
        <section
          className="sf-panel sf-filters"
          aria-label="Filter strategies and ask AI"
        >
          <h2>Filter by learner context</h2>

          <form className="sf-form" onSubmit={handleAskAI}>
            <label className="sf-field">
              Learner need
              <select
                value={need}
                onChange={(e) => setNeed(e.target.value)}
                aria-label="Learner need"
              >
                <option>ADHD</option>
                <option>Autism</option>
                <option>Dyslexia</option>
                <option>EAL</option>
                <option>SLCN</option>
                <option>SEMH</option>
                <option>Any</option>
              </select>
            </label>

            <label className="sf-field">
              Activity context
              <select
                value={context}
                onChange={(e) => setContext(e.target.value)}
                aria-label="Activity context"
              >
                <option>Whole class</option>
                <option>Independent work</option>
                <option>Group work</option>
                <option>Practical task</option>
                <option>Any</option>
              </select>
            </label>

            <label className="sf-field">
              Noise level
              <select
                value={noise}
                onChange={(e) => setNoise(e.target.value)}
                aria-label="Noise level"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </label>

            <label className="sf-field">
              Time pressure
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                aria-label="Time pressure"
              >
                <option>Low</option>
                <option>Normal</option>
                <option>High</option>
              </select>
            </label>

            <hr className="sf-separator" />

            <label className="sf-field">
              Search strategies
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by keyword…"
              />
            </label>

            <label className="sf-field">
              Tag filter
              <select
                value={tagFilter}
                onChange={(e) => setTagFilter(e.target.value)}
              >
                <option value="All">All</option>
                <option value="environment">Environment</option>
                <option value="communication">Communication</option>
                <option value="routines">Routines</option>
                <option value="sensory">Sensory</option>
                <option value="assessment">Assessment</option>
              </select>
            </label>

            <div className="sf-ai-hint">
              <strong>AI demo mode:</strong> When you click{" "}
              <em>Ask AI for extra ideas</em>, only anonymised data (need,
              context, noise, time) is sent to the AI service. No pupil names or
              identifiers are ever sent.
            </div>

            <button
              type="submit"
              className="sf-ai-button"
              disabled={aiStatus === "loading"}
            >
              {aiStatus === "loading" ? "Asking AI…" : "Ask AI for extra ideas"}
            </button>
          </form>
        </section>

        {/* RIGHT: results (static + AI) */}
        <section
          className="sf-panel sf-results"
          aria-label="Strategy results"
        >
          {/* STATIC STRATEGIES */}
          <div className="sf-section">
            <h2>Library strategies</h2>
            <p className="sf-section-note">
              These strategies come from your static InclusionLens library and
              are always available, even without AI credits.
            </p>

            {filteredStaticStrategies.length === 0 ? (
              <p className="sf-empty">
                No strategies match these filters yet. Try changing the need,
                context, or removing the search term.
              </p>
            ) : (
              <ul className="sf-strategy-list">
                {filteredStaticStrategies.map((s) => (
                  <li key={s.id} className="sf-strategy-card">
                    <h3>{s.title}</h3>
                    {s.summary && <p>{s.summary}</p>}
                    {Array.isArray(s.tags) && s.tags.length > 0 && (
                      <p className="sf-tags">
                        {s.tags.map((t) => (
                          <span key={t} className="sf-tag">
                            {t}
                          </span>
                        ))}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* AI STRATEGIES */}
          <div className="sf-section">
            <h2>AI-suggested strategies (demo)</h2>
            <p className="sf-section-note">
              These ideas are generated on demand using anonymised learner
              profiles. For real schools, treat them as professional prompts,
              not automatic instructions.
            </p>

            {aiStatus === "idle" && (
              <p className="sf-empty">
                Click <strong>Ask AI for extra ideas</strong> to see suggestions
                based on the current learner need and context.
              </p>
            )}

            {aiStatus === "loading" && (
              <p className="sf-empty">Asking the AI for suggestions…</p>
            )}

            {aiStatus === "error" && (
              <div className="sf-error" role="alert">
                {aiError ||
                  "Network error while contacting the AI service. Please check your connection and try again."}
              </div>
            )}

            {aiStatus === "success" && aiStrategies.length === 0 && (
              <p className="sf-empty">
                The AI did not return any strategies for this combination. Try a
                different learner need or context.
              </p>
            )}

            {aiStatus === "success" && aiStrategies.length > 0 && (
              <ul className="sf-strategy-list">
                {aiStrategies.map((s, index) => (
                  <li key={index} className="sf-strategy-card sf-ai-card">
                    <h3>{s.title || "Suggested strategy"}</h3>
                    {s.description && <p>{s.description}</p>}
                    {s.timeframe && (
                      <p className="sf-timeframe">
                        Suggested timeframe: <strong>{s.timeframe}</strong>
                      </p>
                    )}
                    {Array.isArray(s.tags) && s.tags.length > 0 && (
                      <p className="sf-tags">
                        {s.tags.map((t) => (
                          <span key={t} className="sf-tag sf-tag-ai">
                            {t}
                          </span>
                        ))}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
