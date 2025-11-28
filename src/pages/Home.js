// src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      {/* HERO */}
      <section className="hero reveal" aria-labelledby="hero-title">
        {/* AI banner pill */}
        <div className="ai-pill" role="status" aria-live="polite">
          ✨ AI-powered lesson adaptation coming soon
        </div>

        <div className="hero-content">
          <p className="hero-eyebrow">Teacher-centred inclusive support</p>

          <h1 id="hero-title" className="hero-title">
            InclusionLens
          </h1>

          <p className="hero-subtitle">
            Quick, practical inclusive strategies for real classrooms — built for SEND,
            supply, and support staff.
          </p>

          <div className="hero-actions" role="group" aria-label="Primary actions">
            <Link className="btn btn-primary" to="/classroom-profile">
              Start Classroom Profile
            </Link>
            <Link className="btn btn-ghost" to="/strategy-finder">
              Explore Strategies
            </Link>
          </div>

          <ul className="hero-badges" aria-label="Project highlights">
            <li>WCAG 2.2 AA aligned</li>
            <li>Designed for real-time use</li>
            <li>Open-source EdTech prototype</li>
          </ul>
        </div>

        {/* Right panel cards */}
        <div className="hero-panel" aria-label="Feature highlights">
          <div className="panel-card">
            <div className="panel-title">Real-time Adaptation</div>
            <p>
              Enter classroom needs and get usable strategies instantly — no heavy planning.
            </p>
          </div>

          <div className="panel-card">
            <div className="panel-title">Accessibility-first UI</div>
            <p>
              Dark mode, font controls, skip link, keyboard navigation, ARIA feedback.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURE STRIP */}
      <section className="strip reveal" aria-label="Key values">
        <div className="strip-grid">
          <div className="strip-item">
            <h2>Accessibility-first</h2>
            <p>
              Keyboard-friendly, screen-reader aligned, contrast-safe, and designed for
              sensory comfort.
            </p>
          </div>

          <div className="strip-item">
            <h2>Teacher-centred</h2>
            <p>
              Built around classroom reality — rapid adaptations that reduce workload under
              pressure.
            </p>
          </div>

          <div className="strip-item">
            <h2>Open & extendable</h2>
            <p>
              Lightweight architecture so schools/researchers can adapt it to local needs.
            </p>
          </div>
        </div>
      </section>

      {/* QUICK ADAPTATION DEMO */}
      <section className="quick-demo reveal" aria-labelledby="quick-demo-title">
        <div className="quick-demo-head">
          <h2 id="quick-demo-title">Try a quick adaptation</h2>
          <p>
            A fast preview of the strategy engine. For full behaviour-aware results,
            complete a Classroom Profile first.
          </p>
        </div>

        <div className="quick-demo-card">
          <form className="quick-form" aria-label="Quick adaptation form">
            <label>
              Learner need
              <select defaultValue="ADHD">
                <option>ADHD</option>
                <option>Autism</option>
                <option>Dyslexia</option>
                <option>EAL</option>
                <option>SLCN</option>
                <option>SEMH</option>
              </select>
            </label>

            <label>
              Activity context
              <select defaultValue="Whole class">
                <option>Whole class</option>
                <option>Independent work</option>
                <option>Group work</option>
                <option>Practical task</option>
              </select>
            </label>

            <label>
              Noise level
              <select defaultValue="Medium">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </label>

            <label>
              Time pressure
              <select defaultValue="Normal">
                <option>Low</option>
                <option>Normal</option>
                <option>High</option>
              </select>
            </label>

            <Link className="btn btn-secondary" to="/strategy-finder">
              Generate strategies
            </Link>
          </form>

          <div className="quick-demo-note" role="note">
            <strong>Tip:</strong> The Strategy Finder page supports filtering, searching,
            and print-ready strategy packs.
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how reveal" aria-labelledby="how-title">
        <h2 id="how-title">How InclusionLens works</h2>

        <div className="how-grid">
          <article className="how-step">
            <div className="how-num">1</div>
            <h3>Profile your classroom</h3>
            <p>Identify student needs and context in under two minutes.</p>
          </article>

          <article className="how-step">
            <div className="how-num">2</div>
            <h3>Get instant strategies</h3>
            <p>
              Evidence-aligned recommendations matched to needs like ADHD, dyslexia, autism,
              SEMH, and EAL.
            </p>
          </article>

          <article className="how-step">
            <div className="how-num">3</div>
            <h3>Adapt during delivery</h3>
            <p>
              Apply strategies live, reduce barriers quickly, and keep inclusion consistent.
            </p>
          </article>
        </div>
      </section>

      {/* TESTIMONIALS / USE CASES */}
      <section className="testimonials reveal" aria-labelledby="testimonials-title">
        <h2 id="testimonials-title">Who this helps</h2>

        <div className="testimonials-grid">
          <figure className="testimonial-card">
            <blockquote>
              “As a supply teacher, I often walk into unfamiliar classrooms. InclusionLens
              gives me instant ideas I can apply confidently.”
            </blockquote>
            <figcaption>— Supply Teacher (KS3/KS4)</figcaption>
          </figure>

          <figure className="testimonial-card">
            <blockquote>
              “The quick adaptation tool helps me support SEND learners without slowing the
              lesson down.”
            </blockquote>
            <figcaption>— SEN Support Assistant</figcaption>
          </figure>

          <figure className="testimonial-card">
            <blockquote>
              “It’s simple enough for daily use, but still grounded in evidence-based
              strategies.”
            </blockquote>
            <figcaption>— Classroom Teacher</figcaption>
          </figure>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="cta reveal" aria-labelledby="cta-title">
        <div className="cta-box">
          <h2 id="cta-title">Ready to test InclusionLens in your classroom?</h2>
          <p>Start with a Classroom Profile or go straight into Strategy Finder.</p>

          <div className="cta-actions" role="group" aria-label="Get started actions">
            <Link className="btn btn-primary" to="/classroom-profile">
              Create a Profile
            </Link>
            <Link className="btn btn-ghost" to="/lesson-adaptor">
              Open Lesson Adaptor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
