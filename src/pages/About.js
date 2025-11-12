// src/pages/About.js
import React from "react";

export default function About() {
  return (
    <section aria-labelledby="about-heading" className="page-section">
      <h1 id="about-heading">About InclusionLens</h1>
      <p>
        InclusionLens is a teacher-centred project to make inclusive pedagogy practical in day-to-day lessons.
        It was started from real experience working across mainstream and special needs schools as supply and support staff.
      </p>

      <h2>Who it’s for</h2>
      <ul className="bullets">
        <li>Supply TAs/teachers who need quick context and adaptations.</li>
        <li>SEND support staff working across multiple classrooms.</li>
        <li>Early-career teachers building inclusive routines.</li>
      </ul>

      <h2>What it does today</h2>
      <ul className="bullets">
        <li>Accessible UI (skip link, dark mode, font size, ARIA feedback).</li>
        <li>Resources hub with WCAG/ADG/WAVE references.</li>
        <li>Strategy Helper demo for instant adaptation ideas.</li>
      </ul>

      <h2>Roadmap (research-driven)</h2>
      <ul className="bullets">
        <li>Classroom “profiles” so strategies can be saved/printed for a group.</li>
        <li>Export strategy sets for sharing with parents/carers.</li>
        <li>Add a notes timeline to support reflective practice.</li>
      </ul>
    </section>
  );
}
