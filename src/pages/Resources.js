// src/pages/Resources.js
import React from "react";

export default function Resources() {
  const items = [
    {
      title: "WCAG Guidelines (W3C)",
      url: "https://www.w3.org/WAI/standards-guidelines/wcag/",
      desc: "Authoritative accessibility success criteria and techniques."
    },
    {
      title: "Accessibility Developer Guide",
      url: "https://www.accessibility-developer-guide.com/",
      desc: "Practical, developer-focused accessibility techniques."
    },
    {
      title: "WAVE – Web Accessibility Evaluation Tool",
      url: "https://wave.webaim.org/",
      desc: "Quick visual evaluation of page accessibility issues."
    }
  ];

  return (
    <section aria-labelledby="resources-heading" className="page-section">
      <h1 id="resources-heading">Accessibility Resources</h1>
      <ul role="list" className="resource-list">
        {items.map((it) => (
          <li key={it.url} className="resource-item">
            <a href={it.url} target="_blank" rel="noopener noreferrer">
              {it.title}
            </a>
            <p className="resource-desc">{it.desc}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
