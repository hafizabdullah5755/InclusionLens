import React from "react";
import "./Resources.css";

function Resources() {
  const resources = [
    {
      title: "WCAG 2.2 Guidelines",
      description: "Official W3C accessibility standards that help make web content usable for everyone.",
      link: "https://www.w3.org/WAI/standards-guidelines/wcag/",
    },
    {
      title: "WebAIM (Web Accessibility In Mind)",
      description: "Trusted resource offering articles, training, and tools to improve web accessibility.",
      link: "https://webaim.org/",
    },
    {
      title: "Microsoft Inclusive Design Toolkit",
      description: "A practical guide to design products and experiences that are inclusive of all users.",
      link: "https://inclusive.microsoft.design/",
    },
    {
      title: "WAVE Accessibility Evaluation Tool",
      description: "Free tool that helps you evaluate the accessibility of your web pages.",
      link: "https://wave.webaim.org/",
    },
  ];

  return (
    <section className="resources-section">
      <h2>Resources for Inclusive Design</h2>
      <div className="resources-grid">
        {resources.map((res, i) => (
          <div key={i} className="resource-card">
            <h3>{res.title}</h3>
            <p>{res.description}</p>
            <a href={res.link} target="_blank" rel="noopener noreferrer">
              Visit Resource →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Resources;
