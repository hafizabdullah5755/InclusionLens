import React from "react";

const resources = [
  {
    title: "WCAG Guidelines",
    desc: "The global standard for making web content accessible to everyone.",
    link: "https://www.w3.org/WAI/standards-guidelines/wcag/",
  },
  {
    title: "ARIA Authoring Practices",
    desc: "How to use ARIA roles, states, and properties correctly.",
    link: "https://www.w3.org/TR/wai-aria-practices/",
  },
  {
    title: "Axe DevTools",
    desc: "A browser extension to find and fix accessibility issues fast.",
    link: "https://www.deque.com/axe/devtools/",
  },
  {
    title: "Inclusive Design Principles",
    desc: "Practical principles to design for everyone from the start.",
    link: "https://inclusivedesignprinciples.org/",
  },
];

export default function Resources() {
  return (
    <section style={{ padding: "50px 20px" }}>
      <h1>Accessibility Resources</h1>
      <p>Essential tools and guides for building inclusive products.</p>

      <div className="resources-grid" role="list">
        {resources.map((r, idx) => (
          <article className="resource-card" role="listitem" key={idx}>
            <h3>{r.title}</h3>
            <p>{r.desc}</p>
            <a
              href={r.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open resource: ${r.title}`}
            >
              Visit Resource →
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
