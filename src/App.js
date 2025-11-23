// src/App.js
import React, { Suspense, lazy } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SkipLink from "./components/SkipLink";
import "./App.css";

// ✅ Lazy load pages for performance
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Resources = lazy(() => import("./pages/Resources"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

// ✅ NEW: Lazy-loaded Day 13 + Day 14 pages
const StrategyFinder = lazy(() => import("./pages/StrategyFinder"));
const ClassroomProfile = lazy(() => import("./pages/ClassroomProfile"));
const LessonAdaptor = lazy(() => import("./pages/LessonAdaptor"));

function App() {
  return (
    <Router>
      {/* Accessible Skip Link */}
      <SkipLink />

      {/* Global Header */}
      <header role="banner">
        <Navbar />
      </header>

      {/* Main Content Area */}
      <main
        id="main-content"
        role="main"
        tabIndex="-1"
        className="main-content"
      >
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
            {/* Core Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/contact" element={<Contact />} />

            {/* === NEW PAGES (Day 13 & Day 14) === */}
            <Route path="/strategy-finder" element={<StrategyFinder />} />
            <Route path="/profile" element={<ClassroomProfile />} />
            <Route path="/lesson-adaptor" element={<LessonAdaptor />} />

            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      {/* Global Footer */}
      <footer role="contentinfo">
        <Footer />
      </footer>
    </Router>
  );
}

export default App;
