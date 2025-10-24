import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <section className="home">
      <h1>
        Welcome to <span className="brand">InclusionLens 🌈</span>
      </h1>
      <p>
        AI-powered tools to help you build inclusive, accessible digital
        experiences for everyone.
      </p>
      <button onClick={() => navigate("/resources")}>Learn More</button>
    </section>
  );
}
