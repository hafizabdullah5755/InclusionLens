// src/pages/Home.js
import React from "react";
import StrategyHelper from "../components/StrategyHelper";

export default function Home() {
  return (
    <section aria-labelledby="home-heading">
      <header className="hero" id="top">
        <h1 id="home-heading">InclusionLens</h1>
        <p className="hero-tagline">
          Quick, practical inclusive strategies for real classrooms — built for SEND, supply and support staff.
        </p>
        <div className="hero-actions">
          <a className="button-cta" href="#demo">Try the demo</a>
          <a className="button-secondary" href="#learn-more">Learn more</a>
        </div>
      </header>

      <div className="features">
        <article className="feature-card">
          <h3>Accessibility-first</h3>
          <p>Keyboard-friendly, dark mode, font resize, and clear ARIA feedback for forms and navigation.</p>
        </article>
        <article className="feature-card">
          <h3>Teacher-centred</h3>
          <p>Made for the reality of cover/SEND work — fast, focused adaptations you can apply immediately.</p>
        </article>
        <article className="feature-card">
          <h3>Open & extendable</h3>
          <p>Simple architecture so schools and researchers can adapt it to their local needs.</p>
        </article>
      </div>

      <div id="demo">
        <StrategyHelper />
      </div>

      <section id="learn-more" className="learn-more">
        <h2>What is InclusionLens?</h2>
        <p>
          A lightweight toolkit that turns inclusive pedagogy into classroom-ready actions. It supports staff with
          quick strategy lookups, accessible UX patterns, and a structure we can extend through research partnerships.
        </p>
      </section>
    </section>
  );
}
