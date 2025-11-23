🌍 InclusionLens — Inclusive & Accessible Classroom Support Tool

InclusionLens is a modern, accessibility-focused web application designed to support teachers in building inclusive classroom environments.
The platform offers classroom profiling, needs-based teaching strategies, accessibility-enhanced UI controls, and a scalable structure prepared for upcoming AI-driven personalization.

The goal is to bring together inclusive design, WCAG 2.2 AA accessibility standards, and practical educational tools into one intuitive interface.

🚀 Live Demo

🔗 https://hafizabdullah5755.github.io/InclusionLens/

✨ Key Features
🧩 Classroom Profiling & Strategy Recommendations

Create a classroom profile by selecting student needs (EAL, ADHD, Dyslexia, Autism, SEMH, etc.)

Automatically filtered teaching strategies based on selected needs

Search and category filtering for better navigation

Printable strategy pack for lesson planning

Clean, modular data design using structured JSON

♿ Full Accessibility Support (WCAG 2.2 AA)

Dark / Light mode toggle

Font size controls (A+, A-, Reset)

Skip to Main Content link for keyboard users

Semantic landmarks for screen readers (header, main, nav, footer)

ARIA roles, labels, aria-live updates

High-contrast, responsive layout for all devices

Keyboard operable, visible focus outlines, accessible navigation

🤖 Prepared for AI Integration (Next Phase)

InclusionLens is structured to support a backend AI service for:

Personalized strategies using LLMs

12-grade (Year 1–12) classroom profiles

Needs-aware adaptive recommendations

Teacher-facing automated lesson adaptations

A dedicated backend route will live in:

/api/adapt.js

📈 Performance & Optimization

The project has been optimized for speed and accessibility:

Category	Score
Accessibility	100
Best Practices	100
SEO	100
Performance	90+ (varies by system)

Optimizations include:

Lazy-loaded routes

Compressed media assets

Reduced unused CSS

Clean React rendering patterns

Improved layout shift stability

📂 Project Structure
InclusionLens/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── social-cover.webp
│
├── src/
│   ├── api/                      # (for AI backend integration)
│   │   └── adapt.js
│   │
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Footer.js
│   │   ├── SkipLink.jsx
│   │   ├── StrategyCard.jsx
│   │   ├── StrategyFilters.jsx
│   │   └── Accessibility Controls (built into Navbar)
│   │
│   ├── data/
│   │   └── strategies.js
│   │
│   ├── hooks/
│   │   └── useClassroomProfile.js
│   │
│   ├── pages/
│   │   ├── Home.js
│   │   ├── About.js
│   │   ├── Resources.js
│   │   ├── Contact.js
│   │   ├── ClassroomProfile.jsx
│   │   └── StrategyFinder.jsx
│   │
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
│
├── package.json
└── README.md

🛠️ Run Locally
npm install
npm start


App will run on:
➡️ http://localhost:3000

📬 Contact / Collaboration

If you're interested in accessibility, inclusive education, or ed-tech innovation, feel free to connect.
