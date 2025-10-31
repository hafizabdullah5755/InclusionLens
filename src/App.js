import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import SkipLink from "./components/SkipLink";
import "./App.css";

function App() {
  return (
    <Router>
      {/* Accessible skip link for keyboard users */}
      <SkipLink />

      <header role="banner">
        <Navbar />
      </header>

      {/* Main content area with accessible landmark */}
      <main id="main-content" role="main" tabIndex="-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer role="contentinfo">
        <Footer />
      </footer>
    </Router>
  );
}

export default App;
