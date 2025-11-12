// src/components/StrategyHelper.js
import React, { useState, useRef } from "react";

/**
 * Inclusion Strategy Helper
 * Quick demo: pick a learner need + activity context and get practical adaptations.
 * No external APIs. Accessible, screen-reader friendly, print-friendly.
 */

const STRATEGIES = {
  ADHD: [
    "Chunk instructions into 1–2 step tasks.",
    "Use timers and visible schedules for transitions.",
    "Offer movement breaks and fidget-friendly options.",
    "Seat away from high-traffic/noise areas."
  ],
  Dyslexia: [
    "Use dyslexia-friendly fonts/spaced text; avoid dense blocks.",
    "Offer audio or colored overlays; allow more time.",
    "Provide instructions verbally and in writing.",
    "Use bullet points and icons; reduce copying from the board."
  ],
  Autism: [
    "Provide clear routines and visual schedules.",
    "Pre-warn about changes and transitions.",
    "Offer low-sensory workspace and noise-reduction options.",
    "Use literal language; avoid idioms; check understanding."
  ],
  EAL: [
    "Use visuals and gestures with key vocabulary.",
    "Provide sentence starters and dual-language glossaries.",
    "Model tasks; pair with a supportive buddy.",
    "Allow responses in various modes (drawings, pointing, L1 where possible)."
  ],
  "Visual Impairment": [
    "Provide large print or high-contrast materials (14–18pt+).",
    "Read aloud important on-screen or board content.",
    "Seat close to the board with minimum glare.",
    "Ensure alt text/labels for any images in digital tasks."
  ]
};

const CONTEXT_BONUS = {
  Reading: [
    "Use reading rulers/overlays and guide strips.",
    "Pre-teach vocabulary with pictures/examples.",
    "Offer audio/paired reading options."
  ],
  Writing: [
    "Provide templates/frames to structure responses.",
    "Allow typing or speech-to-text where appropriate.",
    "Reduce copying; focus on content before spelling."
  ],
  Maths: [
    "Use manipulatives and visual models for new concepts.",
    "Break multi-step problems into small parts.",
    "Offer worked examples; check understanding often."
  ],
  WholeClass: [
    "State objectives in plain language and display them.",
    "Check for understanding with thumbs/mini-whiteboards.",
    "Allow flexible grouping and roles in activities."
  ]
};

export default function StrategyHelper() {
  const [need, setNeed] = useState("ADHD");
  const [context, setContext] = useState("WholeClass");
  const [noise, setNoise] = useState("Medium");
  const [time, setTime] = useState("Normal");
  const [results, setResults] = useState([]);
  const statusRef = useRef(null);

  const onGenerate = (e) => {
    e.preventDefault();

    // Merge base strategies + context extras
    let list = [...(STRATEGIES[need] || [])];
    list = list.concat(CONTEXT_BONUS[context] || []);

    // Environment adjustments
    if (noise === "High") {
      list.push("Offer headphones/noise-dampening options and quieter workspace.");
    }
    if (time === "Low") {
      list.push("Prioritise core objectives; shorten task length and reduce items.");
    }

    // De-duplicate & keep concise
    const unique = Array.from(new Set(list)).slice(0, 8);
    setResults(unique);

    // Move focus to the live region for SR users
    window.requestAnimationFrame(() => {
      statusRef.current?.focus();
    });
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(results.map((r) => `• ${r}`).join("\n"));
      alert("Strategies copied to clipboard.");
    } catch {
      alert("Could not copy. Please select and copy manually.");
    }
  };

  return (
    <section aria-labelledby="helper-heading" className="helper-section">
      <h2 id="helper-heading">Try a quick adaptation</h2>
      <p className="helper-subtitle">
        Choose a learner need and task context to get instant, practical ideas for inclusive delivery.
      </p>

      <form className="helper-form" onSubmit={onGenerate} noValidate>
        <div className="helper-grid">
          <div className="helper-field">
            <label htmlFor="need">Learner need</label>
            <select id="need" value={need} onChange={(e) => setNeed(e.target.value)}>
              {Object.keys(STRATEGIES).map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
          </div>

          <div className="helper-field">
            <label htmlFor="context">Activity context</label>
            <select id="context" value={context} onChange={(e) => setContext(e.target.value)}>
              {Object.keys(CONTEXT_BONUS).map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
          </div>

          <div className="helper-field">
            <label htmlFor="noise">Noise level</label>
            <select id="noise" value={noise} onChange={(e) => setNoise(e.target.value)}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div className="helper-field">
            <label htmlFor="time">Time pressure</label>
            <select id="time" value={time} onChange={(e) => setTime(e.target.value)}>
              <option>Normal</option>
              <option>Low</option>
            </select>
          </div>
        </div>

        <div className="helper-actions">
          <button type="submit">Generate strategies</button>
          {results.length > 0 && (
            <>
              <button type="button" onClick={copyToClipboard}>Copy</button>
              <button type="button" onClick={() => window.print()}>Print</button>
            </>
          )}
        </div>
      </form>

      <div
        className={results.length ? "helper-results" : "visually-hidden"}
        role="region"
        aria-live="polite"
        aria-atomic="true"
        tabIndex="-1"
        ref={statusRef}
      >
        <h3>Suggested adaptations</h3>
        <ul>
          {results.map((r, i) => <li key={i}>{r}</li>)}
        </ul>
      </div>
    </section>
  );
}
