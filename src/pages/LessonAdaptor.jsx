import React from "react";
import useClassroomProfile from "../hooks/useClassroomProfile";
import { STRATEGIES } from "../data/strategies";
import { Link } from "react-router-dom";

const MATERIALS = ["Slides", "Worksheet", "Verbal Instructions", "Group Work"];
const PHASES = ["Starter", "Main activity", "Plenary"];

function buildPrompts({ needs, material, phase }) {
  const matched = STRATEGIES.filter((s) =>
    needs.includes(s.category)
  );

  // If no needs selected, give generic prompts
  if (needs.length === 0) {
    return [
      {
        title: "General inclusive adaptation",
        text: `For your ${phase.toLowerCase()} using ${material.toLowerCase()}, chunk instructions, provide visuals, and check understanding with quick prompts.`,
        source: "General UDL"
      }
    ];
  }

  // Generate prompts per need using top strategies
  const prompts = [];
  needs.forEach((need) => {
    const top = matched.filter((m) => m.category === need).slice(0, 2);

    top.forEach((s) => {
      prompts.push({
        title: `${need}: ${s.title}`,
        text: `While teaching the ${phase.toLowerCase()} with ${material.toLowerCase()}, apply: ${s.quickFix.join(
          "; "
        )}. Consider: ${s.classroomUse.join("; ")}.`,
        source: s.evidence
      });
    });

    if (top.length === 0) {
      prompts.push({
        title: `${need}: quick adaptation`,
        text: `For ${need} during the ${phase.toLowerCase()}, simplify language, add a visual model, and allow extra processing time.`,
        source: "General inclusive practice"
      });
    }
  });

  return prompts;
}

export default function LessonAdaptor() {
  const { profile } = useClassroomProfile();
  const [material, setMaterial] = React.useState(MATERIALS[0]);
  const [phase, setPhase] = React.useState(PHASES[1]);
  const [results, setResults] = React.useState([]);
  const [printBlock, setPrintBlock] = React.useState(null);

  const generate = () => {
    const prompts = buildPrompts({
      needs: profile.needs,
      material,
      phase,
    });
    setResults(prompts);
  };

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied!");
    } catch {
      alert("Copy failed — please copy manually.");
    }
  };

  const handlePrint = (prompt) => {
    setPrintBlock(prompt);
    setTimeout(() => window.print(), 50);
  };

  return (
    <div className="page-container">
      <header style={{ marginBottom: "1rem" }}>
        <h1 style={{ fontSize: "1.8rem", fontWeight: "700" }}>
          Lesson Adaptor
        </h1>
        <p style={{ marginTop: ".5rem", color: "gray" }}>
          Get instant adaptation prompts based on your Classroom Profile.
        </p>
      </header>

      <section className="card print-hidden" aria-label="Lesson adaptor controls">
        <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "1fr 1fr" }}>
          <div>
            <label style={{ fontWeight: 600 }}>Material type</label>
            <select
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              style={{
                width: "100%",
                marginTop: ".3rem",
                padding: ".5rem",
                borderRadius: "10px",
                border: "1px solid #cbd5e1",
              }}
            >
              {MATERIALS.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontWeight: 600 }}>Lesson phase</label>
            <select
              value={phase}
              onChange={(e) => setPhase(e.target.value)}
              style={{
                width: "100%",
                marginTop: ".3rem",
                padding: ".5rem",
                borderRadius: "10px",
                border: "1px solid #cbd5e1",
              }}
            >
              {PHASES.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ marginTop: "1rem", display: "flex", gap: ".6rem" }}>
          <button
            onClick={generate}
            style={{
              padding: ".6rem 1rem",
              borderRadius: "10px",
              background: "#16a34a",
              color: "white",
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
            }}
          >
            Generate Adaptations
          </button>

          <Link to="/profile" style={{ alignSelf: "center" }}>
            Edit Classroom Profile
          </Link>
        </div>

        {profile.needs.length > 0 && (
          <p style={{ marginTop: ".8rem", fontSize: ".95rem" }}>
            Active needs: <strong>{profile.needs.join(", ")}</strong>
          </p>
        )}
      </section>

      {/* Results */}
      <section style={{ marginTop: "1rem", display: "grid", gap: "1rem" }}>
        {results.map((r, idx) => (
          <div key={idx} className="card" role="article">
            <h2 style={{ fontSize: "1.1rem", fontWeight: "700" }}>{r.title}</h2>
            <p style={{ marginTop: ".5rem" }}>{r.text}</p>
            <p style={{ marginTop: ".5rem", fontSize: ".85rem", color: "gray" }}>
              Evidence note: {r.source}
            </p>

            <div style={{ marginTop: ".8rem", display: "flex", gap: ".5rem" }}>
              <button
                onClick={() => copyText(r.text)}
                style={{
                  padding: ".4rem .8rem",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                Copy
              </button>
              <button
                onClick={() => handlePrint(r)}
                style={{
                  padding: ".4rem .8rem",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                Print card
              </button>
              <Link to="/strategy-finder" style={{ alignSelf: "center" }}>
                Related strategies →
              </Link>
            </div>
          </div>
        ))}

        {results.length === 0 && (
          <p style={{ color: "gray" }}>
            Choose material + phase, then click “Generate Adaptations”.
          </p>
        )}
      </section>

      {/* Print-only block */}
      {printBlock && (
        <div className="print-only card" style={{ marginTop: "1rem" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: "800" }}>
            {printBlock.title}
          </h2>
          <p style={{ marginTop: ".4rem" }}>{printBlock.text}</p>
          <p style={{ marginTop: ".5rem", fontSize: ".85rem" }}>
            {material} • {phase}
          </p>
        </div>
      )}
    </div>
  );
}
