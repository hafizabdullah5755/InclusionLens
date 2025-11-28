// src/App.js
import React, { Suspense, lazy } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SkipLink from "./components/SkipLink";
import "./App.css";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Resources = lazy(() => import("./pages/Resources"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

// ✅ NEW PAGES
const ClassroomProfile = lazy(() => import("./pages/ClassroomProfile"));
const StrategyFinder = lazy(() => import("./pages/StrategyFinder"));
const LessonAdaptor = lazy(() => import("./pages/LessonAdaptor"));

function App() {
  return (
    <Router>
      <SkipLink />

      <header role="banner">
        <Navbar />
      </header>

      <main id="main-content" role="main" tabIndex="-1" className="main-content">
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
            {/* Core pages */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/contact" element={<Contact />} />

            {/* ✅ Features */}
            <Route path="/classroom-profile" element={<ClassroomProfile />} />
            <Route path="/strategy-finder" element={<StrategyFinder />} />
            <Route path="/lesson-adaptor" element={<LessonAdaptor />} />

            {/* ✅ Alias routes (prevents 404 if old paths used anywhere) */}
            <Route
              path="/classroomProfile"
              element={<Navigate to="/classroom-profile" replace />}
            />
            <Route
              path="/strategyFinder"
              element={<Navigate to="/strategy-finder" replace />}
            />
            <Route
              path="/lessonAdaptor"
              element={<Navigate to="/lesson-adaptor" replace />}
            />

            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <footer role="contentinfo">
        <Footer />
      </footer>
    </Router>
  );
}

export default App;
