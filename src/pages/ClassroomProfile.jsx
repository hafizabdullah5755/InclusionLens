import React from "react";
import { Link } from "react-router-dom";
import useClassroomProfile from "../hooks/useClassroomProfile";

const NEEDS = ["Dyslexia", "ADHD", "Autism", "EAL", "Sensory", "Motor", "SEMH"];

export default function ClassroomProfile() {
  const { profile, toggleNeed, setProfile, clearProfile } =
    useClassroomProfile();

  return (
    <div className="page-container">
      <header style={{ marginBottom: "1rem" }}>
        <h1 style={{ fontSize: "1.8rem", fontWeight: "700" }}>
          Classroom Profile
        </h1>
        <p style={{ marginTop: ".5rem", color: "gray" }}>
          Select learner needs for this class. This stays on your device only.
        </p>
      </header>

      <section className="card" aria-label="Learner needs selection">
        <h2 style={{ fontSize: "1.1rem", fontWeight: "600" }}>
          Learner needs
        </h2>

        <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem", marginTop: ".75rem" }}>
          {NEEDS.map((need) => {
            const active = profile.needs.includes(need);
            return (
              <button
                key={need}
                onClick={() => toggleNeed(need)}
                aria-pressed={active}
                style={{
                  padding: ".4rem .8rem",
                  borderRadius: "999px",
                  border: "1px solid #cbd5e1",
                  background: active ? "#0f172a" : "white",
                  color: active ? "white" : "black",
                  cursor: "pointer",
                  fontSize: ".9rem",
                }}
              >
                {need}
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: "1rem" }}>
          <label
            htmlFor="notes"
            style={{ display: "block", fontWeight: 600, marginBottom: ".4rem" }}
          >
            Context notes (optional)
          </label>
          <textarea
            id="notes"
            rows={3}
            value={profile.notes}
            onChange={(e) =>
              setProfile((p) => ({ ...p, notes: e.target.value }))
            }
            placeholder="e.g., Year 8 cover class, low reading stamina, short lesson..."
            style={{
              width: "100%",
              padding: ".6rem",
              borderRadius: "12px",
              border: "1px solid #cbd5e1",
              fontSize: "1rem",
            }}
          />
        </div>

        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            gap: ".5rem",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={clearProfile}
            style={{
              padding: ".5rem .9rem",
              borderRadius: "10px",
              border: "1px solid #cbd5e1",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            Clear
          </button>

          <Link
            to="/strategy-finder"
            style={{
              padding: ".5rem .9rem",
              borderRadius: "10px",
              background: "#2563eb",
              color: "white",
              fontWeight: 600,
              display: "inline-block",
            }}
          >
            Use profile in Strategy Finder →
          </Link>
        </div>
      </section>

      {profile.needs.length > 0 && (
        <section
          className="card"
          style={{ marginTop: "1rem" }}
          aria-label="Current profile summary"
        >
          <h2 style={{ fontSize: "1.1rem", fontWeight: "600" }}>
            Current selection
          </h2>
          <p style={{ marginTop: ".5rem" }}>
            Needs: <strong>{profile.needs.join(", ")}</strong>
          </p>
          {profile.notes && (
            <p style={{ marginTop: ".5rem" }}>
              Notes: <em>{profile.notes}</em>
            </p>
          )}

          <div style={{ marginTop: ".8rem" }}>
            <Link to="/lesson-adaptor" style={{ fontWeight: 600 }}>
              Go to Lesson Adaptor →
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
