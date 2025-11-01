import React from "react";

export default function SkipLink() {
  const handleSkip = (e) => {
    e.preventDefault();
    const el = document.getElementById("main-content");
    if (el) {
      // Ensure it can receive focus, then focus it
      el.setAttribute("tabindex", "-1");
      el.focus();
      // Optional: jump without changing hash
      window.scrollTo({ top: el.offsetTop, behavior: "instant" });
    }
  };

  return (
    <a
      href="#main-content"
      onClick={handleSkip}
      className="skip-link"
    >
      Skip to main content
    </a>
  );
}
