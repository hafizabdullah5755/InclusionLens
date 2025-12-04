// src/pages/ClassroomProfile.js
import React, { useEffect, useState } from "react";
import {
  loadProfile,
  saveProfile,
  ensureDemoProfile,
} from "../utils/profileStorage";
import "./ClassroomProfile.css";

const NEED_OPTIONS = [
  "ADHD",
  "Autism",
  "Dyslexia",
  "EAL",
  "SLCN",
  "SEMH",
  "Visual impairment",
  "Hearing impairment",
];

// Very simple "looks like a real name" heuristic:
// Two words, both starting uppercase letter and followed by lowercase letters.
function looksLikeRealName(alias) {
  const trimmed = alias.trim();
  const namePattern = /^[A-Z][a-z]+ [A-Z][a-z]+$/;
  return namePattern.test(trimmed);
}

export default function ClassroomProfile() {
  const [profile, setProfile] = useState({ classes: [] });
  const [selectedClassId, setSelectedClassId] = useState(null);

  const [newAlias, setNewAlias] = useState("");
  const [newNeeds, setNewNeeds] = useState([]);
  const [newNotes, setNewNotes] = useState("");
  const [newSupports, setNewSupports] = useState("");
  const [aliasError, setAliasError] = useState("");

  const selectedClass =
    profile.classes.find((cls) => cls.id === selectedClassId) || null;

  useEffect(() => {
    const loaded = ensureDemoProfile(loadProfile());
    setProfile(loaded);
    if (loaded.classes.length > 0) {
      setSelectedClassId(loaded.classes[0].id);
    }
  }, []);

  const updateProfile = (updater) => {
    setProfile((prev) => {
      const next = updater(prev);
      saveProfile(next);
      return next;
    });
  };

  const handleAddClass = () => {
    const id = `class-${Date.now()}`;
    updateProfile((prev) => {
      const nextClasses = [
        ...prev.classes,
        {
          id,
          label: "New class (e.g. Year 4 – Demo)",
          phase: "Primary",
          year: "",
          learners: [],
        },
      ];
      return { ...prev, classes: nextClasses };
    });
    setSelectedClassId(id);
  };

  const handleClassLabelChange = (e) => {
    const label = e.target.value;
    const id = selectedClassId;
    if (!id) return;
    updateProfile((prev) => {
      const nextClasses = prev.classes.map((cls) =>
        cls.id === id ? { ...cls, label } : cls
      );
      return { ...prev, classes: nextClasses };
    });
  };

  const handlePhaseChange = (e) => {
    const phase = e.target.value;
    const id = selectedClassId;
    if (!id) return;
    updateProfile((prev) => {
      const nextClasses = prev.classes.map((cls) =>
        cls.id === id ? { ...cls, phase } : cls
      );
      return { ...prev, classes: nextClasses };
    });
  };

  const handleYearChange = (e) => {
    const year = e.target.value;
    const id = selectedClassId;
    if (!id) return;
    updateProfile((prev) => {
      const nextClasses = prev.classes.map((cls) =>
        cls.id === id ? { ...cls, year } : cls
      );
      return { ...prev, classes: nextClasses };
    });
  };

  const toggleNewNeed = (need) => {
    setNewNeeds((prev) =>
      prev.includes(need) ? prev.filter((n) => n !== need) : [...prev, need]
    );
  };

  const handleAliasChange = (value) => {
    setNewAlias(value);

    // Validation to discourage real names
    if (looksLikeRealName(value)) {
      setAliasError(
        "Please use an alias like “Learner A” or “Student 1”, not a real name."
      );
    } else if (value.length > 30) {
      setAliasError("Alias is too long. Keep it under 30 characters.");
    } else {
      setAliasError("");
    }
  };

  const handleAddLearner = (e) => {
    e.preventDefault();
    if (!selectedClassId) return;
    if (!newAlias.trim()) {
      setAliasError("Alias is required for anonymised learners.");
      return;
    }
    if (aliasError) {
      // Do not add if alias looks like a real name
      return;
    }

    const id = `learner-${Date.now()}`;
    const learner = {
      id,
      alias: newAlias.trim(),
      needs: [...newNeeds],
      notes: newNotes.trim(),
      keySupports: newSupports
        .split("\n")
        .map((s) => s.replace(/^[-•]\s*/, "").trim())
        .filter(Boolean),
    };

    updateProfile((prev) => {
      const nextClasses = prev.classes.map((cls) =>
        cls.id === selectedClassId
          ? { ...cls, learners: [...cls.learners, learner] }
          : cls
      );
      return { ...prev, classes: nextClasses };
    });

    setNewAlias("");
    setNewNeeds([]);
    setNewNotes("");
    setNewSupports("");
    setAliasError("");
  };

  const handleDeleteLearner = (learnerId) => {
    if (!selectedClassId) return;
    updateProfile((prev) => {
      const nextClasses = prev.classes.map((cls) =>
        cls.id === selectedClassId
          ? {
              ...cls,
              learners: cls.learners.filter((l) => l.id !== learnerId),
            }
          : cls
      );
      return { ...prev, classes: nextClasses };
    });
  };

  const classSummary = (() => {
    if (!selectedClass) return null;
    const counts = {};
    selectedClass.learners.forEach((learner) => {
      (learner.needs || []).forEach((n) => {
        counts[n] = (counts[n] || 0) + 1;
      });
    });
    return counts;
  })();

  return (
    <div className="cp-page">
      <section className="cp-banner" role="note">
        <h1 className="cp-title">Classroom Profile (Demo, anonymised)</h1>
        <p className="cp-banner-text">
          ⚠️ <strong>Important:</strong> This prototype is for{" "}
          <strong>demonstration and research only</strong>. Do not enter real
          pupil names or personal information. Use anonymous aliases instead
          (e.g. <em>Learner A</em>, <em>Student 1</em>). Data is stored locally
          in your browser only and is not sent to a server.
        </p>
      </section>

      <section className="cp-layout" aria-label="Classroom profile builder">
        <aside className="cp-sidebar">
          <div className="cp-sidebar-head">
            <h2>Classes</h2>
            <button type="button" onClick={handleAddClass}>
              + Add demo class
            </button>
          </div>

          {profile.classes.length === 0 && (
            <p className="cp-empty">
              No classes yet. Click &ldquo;Add demo class&rdquo; to begin.
            </p>
          )}

          <ul className="cp-class-list">
            {profile.classes.map((cls) => (
              <li key={cls.id}>
                <button
                  type="button"
                  className={
                    cls.id === selectedClassId
                      ? "cp-class-btn active"
                      : "cp-class-btn"
                  }
                  onClick={() => setSelectedClassId(cls.id)}
                >
                  <span className="cp-class-label">{cls.label}</span>
                  {cls.learners?.length ? (
                    <span className="cp-pill">
                      {cls.learners.length} learner
                      {cls.learners.length !== 1 ? "s" : ""}
                    </span>
                  ) : (
                    <span className="cp-pill cp-pill-empty">No learners</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <main className="cp-main">
          {!selectedClass && (
            <p className="cp-empty">
              Select a class on the left to view or edit its anonymised profile.
            </p>
          )}

          {selectedClass && (
            <>
              <section className="cp-class-panel">
                <h2>Class details</h2>
                <div className="cp-class-grid">
                  <label>
                    Class label
                    <input
                      type="text"
                      value={selectedClass.label}
                      onChange={handleClassLabelChange}
                      placeholder="e.g. Year 3 – Demo Class"
                    />
                  </label>

                  <label>
                    Phase
                    <select
                      value={selectedClass.phase || "Primary"}
                      onChange={handlePhaseChange}
                    >
                      <option>Primary</option>
                      <option>Secondary</option>
                      <option>Post-16</option>
                    </select>
                  </label>

                  <label>
                    Year (optional)
                    <input
                      type="text"
                      value={selectedClass.year || ""}
                      onChange={handleYearChange}
                      placeholder="e.g. 3, 8, 11"
                    />
                  </label>
                </div>

                {classSummary && Object.keys(classSummary).length > 0 && (
                  <div className="cp-summary">
                    <p>
                      <strong>Needs snapshot:</strong>{" "}
                      {Object.entries(classSummary).map(([need, count], idx) => (
                        <span key={need}>
                          {idx > 0 && ", "}
                          {need} × {count}
                        </span>
                      ))}
                    </p>
                  </div>
                )}
              </section>

              <section className="cp-learners-panel">
                <h2>Learners (aliases only)</h2>
                {selectedClass.learners?.length === 0 && (
                  <p className="cp-empty">
                    No learners yet. Add anonymised learners below using labels
                    like &ldquo;Learner A&rdquo; or &ldquo;Student 1&rdquo;.
                  </p>
                )}

                <ul className="cp-learner-list">
                  {selectedClass.learners?.map((learner) => (
                    <li key={learner.id} className="cp-learner-card">
                      <div className="cp-learner-head">
                        <span className="cp-learner-alias">
                          {learner.alias}
                        </span>
                        {learner.needs?.length ? (
                          <span className="cp-pill">
                            {learner.needs.join(", ")}
                          </span>
                        ) : (
                          <span className="cp-pill cp-pill-empty">
                            No needs tagged
                          </span>
                        )}
                      </div>
                      {learner.notes && (
                        <p className="cp-learner-notes">{learner.notes}</p>
                      )}
                      {learner.keySupports?.length > 0 && (
                        <ul className="cp-supports-list">
                          {learner.keySupports.map((s, i) => (
                            <li key={i}>{s}</li>
                          ))}
                        </ul>
                      )}
                      <button
                        type="button"
                        className="cp-delete-btn"
                        onClick={() => handleDeleteLearner(learner.id)}
                      >
                        Remove (demo)
                      </button>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="cp-add-learner">
                <h2>Add anonymised learner</h2>
                <form onSubmit={handleAddLearner} className="cp-add-form">
                  <label>
                    Alias (not a real name)
                    <input
                      type="text"
                      value={newAlias}
                      onChange={(e) => handleAliasChange(e.target.value)}
                      placeholder="e.g. Learner C, Student 4"
                      maxLength={30}
                      required
                    />
                    {aliasError && (
                      <span className="cp-alias-error" role="alert">
                        {aliasError}
                      </span>
                    )}
                  </label>

                  <fieldset className="cp-fieldset">
                    <legend>Primary needs (non-identifiable tags)</legend>
                    <div className="cp-needs-grid">
                      {NEED_OPTIONS.map((need) => (
                        <label key={need} className="cp-need-tag">
                          <input
                            type="checkbox"
                            checked={newNeeds.includes(need)}
                            onChange={() => toggleNewNeed(need)}
                          />
                          <span>{need}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <label>
                    Key notes (classroom-relevant only)
                    <textarea
                      value={newNotes}
                      onChange={(e) => setNewNotes(e.target.value)}
                      rows={3}
                      placeholder="E.g. benefits from clear routines, needs extra processing time. Do not include personal details."
                    />
                  </label>

                  <label>
                    Strategies that usually work (one per line)
                    <textarea
                      value={newSupports}
                      onChange={(e) => setNewSupports(e.target.value)}
                      rows={3}
                      placeholder={"E.g.\nVisual timetable\nChunked instructions\nMovement break after 10 minutes"}
                    />
                  </label>

                  <button type="submit" className="cp-save-btn">
                    Add learner (demo)
                  </button>
                </form>
              </section>
            </>
          )}
        </main>
      </section>
    </div>
  );
}
