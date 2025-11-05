// src/App.js
import React, { Suspense, lazy } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SkipLink from "./components/SkipLink";
import "./App.css";

// ✅ Lazy load pages to improve performance
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Resources = lazy(() => import("./pages/Resources"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <Router>
      {/* ✅ Skip link for keyboard users */}
      <SkipLink />

      {/* ✅ Header Navigation */}
      <header role="banner">
        <Navbar />
      </header>

      {/* ✅ Main Content with accessible landmark */}
      <main id="main-content" role="main" tabIndex="-1" className="main-content">
        {/* Suspense fallback ensures accessibility during lazy loading */}
        <Suspense
          fallback={
            <div
              role="status"
              aria-live="polite"
              style={{ padding: "2rem", textAlign: "center" }}
            >
              Loading content…
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      {/* ✅ Footer */}
      <footer role="contentinfo">
        <Footer />
      </footer>
    </Router>
  );
}

export default App;
