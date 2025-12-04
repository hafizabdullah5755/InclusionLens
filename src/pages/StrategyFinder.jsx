// src/pages/StrategyFinder.js
import React, { useEffect, useState } from "react";
import {
  loadProfile,
  ensureDemoProfile,
} from "../utils/profileStorage";
import "./StrategyFinder.css";

const API_URL = "https://inclusionlens-clean.vercel.app/api/adapt";

const DEFAULT_CONTEXTS = [
  "Whole class",
  "Independent work",
  "Group work",
  "Practical task",
];

const DEFAULT_NOISE = ["Low", "Medium", "High"];
const DEFAULT_TIME = ["Low", "Normal", "High"];

export default function StrategyFinder() {
  const [profile, setProfile] = useState({ classes: [] });
  const [selectedClassId, setSelectedClassId] = useState("");
  const [selectedLearnerId, setSelectedLearnerId] = useState("");

  const [need, setNeed] = useState("ADHD");
  const [context, setContext] = useState("Whole class");
  const [noise, setNoise] = useState("Medium");
  const [time, setTime] = useState("Normal");

  const [extraNotes, setExtraNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [rawText, setRawText] = useState("");

  // Load anonymised classroom profile
  useEffect(() => {
    const loaded = ensureDemoProfile(loadProfile());
    setProfile(loaded);
    if (loaded.classes.length > 0) {
      setSelectedClassId(loaded.classes[0].id);
    }
  }, []);

  const selectedClass =
    profile.classes.find((c) => c.id === selectedClassId) || null;

  const learners = selectedClass?.learners || [];
  const selectedLearner =
    learners.find((l) => l.id === selectedLearnerId) || null;

  // When learner changes, auto-fill need and notes (but remain anonymised)
  useEffect(() => {
    if (!selectedLearner) return;
    if (selectedLearner.needs?.length) {
      setNeed(selectedLearner.needs[0]); // use first tagged need as primary
    }
    // Pre-fill extraNotes with SAFE, classroom-only info
    const safeLines = [];
    if (selectedLearner.needs?.length) {
      safeLines.push(
        `Needs: ${selectedLearner.needs.join(", ")} (anonymised tags).`
      );
    }
    if (selectedLearner.keySupports?.length) {
      safeLines.push(
        `Strategies that have helped previously: ${selectedLearner.keySupports.join(
          "; "
        )}.`
      );
    }
    if (selectedLearner.notes) {
      safeLines.push(
        `Classroom notes (non-identifiable): ${selectedLearner.notes}`
      );
    }
    setExtraNotes(safeLines.join("\n"));
  }, [selectedLearner]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuggestions([]);
    setRawText("");

    try {
      const payload = {
        need,
        context,
        noise,
        time,
        // anonymised learner info – NO real names
        learnerAlias: selectedLearner ? selectedLearner.alias : null,
        learnerNeeds: selectedLearner?.needs || [],
        learnerSupports: selectedLearner?.keySupports || [],
        learnerNotes: selectedLearner?.notes || "",
        extraNotes,
      };

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        const msg =
          data?.message ||
          data?.error ||
          "The AI service could not generate strategies right now.";
        setError(msg);
        return;
      }

      setSuggestions(data.suggestions || []);
      setRawText(data.rawText || "");
    } catch (err) {
      console.error(err);
      setError(
        "Network error while contacting the AI service. This may be due to API limits. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="sf-page">
      <section className="sf-header">
        <h1>Strategy Finder (anonymised)</h1>
        <p>
          Generate classroom-ready, evidence-informed strategies using{" "}
          <strong>only anonymised learner profiles</strong>. No real names or
          personal data are processed by the AI.
        </p>
        <p className="sf-ethics-note">
          ⚠️ <strong>Ethics note:</strong> Learners are referenced only as{" "}
          <em>Learner A</em>, <em>Student 1</em>, etc. The mapping to real
          pupils (if any) must stay inside the school or teacher&apos;s own
          notes, not in this tool.
        </p>
      </section>

      <section
        className="sf-layout"
        aria-label="Strategy Finder with class and learner selection"
      >
        <form className="sf-form" onSubmit={handleSubmit}>
          {/* Class & Learner selection */}
          <fieldset className="sf-fieldset">
            <legend>Step 1 – Select class & anonymised learner (optional)</legend>

            <div className="sf-grid">
              <label>
                Class
                <select
                  value={selectedClassId || ""}
                  onChange={(e) => {
                    setSelectedClassId(e.target.value);
                    setSelectedLearnerId("");
                  }}
                >
                  {profile.classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.label}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Learner alias (optional)
                <select
                  value={selectedLearnerId || ""}
                  onChange={(e) => setSelectedLearnerId(e.target.value)}
                >
                  <option value="">None / whole-class focus</option>
                  {learners.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.alias}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {selectedLearner && (
              <p className="sf-learner-summary">
                Generating strategies for{" "}
                <strong>{selectedLearner.alias}</strong> using anonymised tags
                only.
              </p>
            )}
          </fieldset>

          {/* Core scenario controls */}
          <fieldset className="sf-fieldset">
            <legend>Step 2 – Describe the teaching situation</legend>

            <div className="sf-grid">
              <label>
                Primary need (anonymised)
                <select
                  value={need}
                  onChange={(e) => setNeed(e.target.value)}
                >
                  <option>ADHD</option>
                  <option>Autism</option>
                  <option>Dyslexia</option>
                  <option>EAL</option>
                  <option>SLCN</option>
                  <option>SEMH</option>
                  <option>Visual impairment</option>
                  <option>Hearing impairment</option>
                </select>
              </label>

              <label>
                Activity context
                <select
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                >
                  {DEFAULT_CONTEXTS.map((ctx) => (
                    <option key={ctx}>{ctx}</option>
                  ))}
                </select>
              </label>

              <label>
                Noise level
                <select
                  value={noise}
                  onChange={(e) => setNoise(e.target.value)}
                >
                  {DEFAULT_NOISE.map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </label>

              <label>
                Time pressure
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                >
                  {DEFAULT_TIME.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </label>
            </div>
          </fieldset>

          {/* Extra anonymised notes */}
          <fieldset className="sf-fieldset">
            <legend>Step 3 – Optional anonymised context</legend>
            <p className="sf-help">
              Add brief, classroom-focused details only.{" "}
              <strong>Do not include names, addresses, dates of birth, or any
              identifying information.</strong>
            </p>
            <textarea
              value={extraNotes}
              onChange={(e) => setExtraNotes(e.target.value)}
              rows={4}
              placeholder={
                "E.g. Learner finds transitions difficult and benefits from advance warning.\nAvoids reading aloud but responds well to paired reading."
              }
            />
          </fieldset>

          <button
            type="submit"
            className="sf-submit"
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? "Generating strategies…" : "Generate strategies"}
          </button>

          {error && (
            <div className="sf-error" role="alert">
              {error}
            </div>
          )}
        </form>

        {/* Results */}
        <section className="sf-results" aria-label="Strategy suggestions">
          <h2>Suggested strategies</h2>

          {!loading && !error && suggestions.length === 0 && !rawText && (
            <p className="sf-placeholder">
              Strategies will appear here once you run a search. When AI
              credits are unavailable, you can still use this area to paste or
              record strategies manually during observations.
            </p>
          )}

          {suggestions.length > 0 && (
            <ol className="sf-list">
              {suggestions.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ol>
          )}

          {rawText && (
            <details className="sf-raw">
              <summary>View full AI response (for research notes)</summary>
              <pre>{rawText}</pre>
            </details>
          )}

          <p className="sf-footnote">
            Note: This tool is a <strong>prototype</strong>. Strategies should
            always be checked against school policy, professional judgement, and
            the individual learner&apos;s context.
          </p>
        </section>
      </section>
    </div>
  );
}
