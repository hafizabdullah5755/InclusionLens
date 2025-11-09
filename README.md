# 🌍 InclusionLens — Accessible & Inclusive Web Interface Tools

InclusionLens is a lightweight accessibility and inclusion support interface built to help improve the usability of web experiences for diverse users. The project focuses on practical accessibility features that support readability, visual comfort, keyboard navigation, and clarity of interaction.

The goal is to demonstrate how accessibility principles (WCAG 2.2 AA) and inclusive design decisions can be integrated into everyday interfaces in a clear, simple, and maintainable way.

---

## 🚀 Live Demo

🔗 https://hafizabdullah5755.github.io/InclusionLens/

---

## 🧱 Features

| Feature | Purpose |
|--------|---------|
| **Dark / Light Mode Toggle** | Supports visual comfort and sensory preferences |
| **Font Size Controls (A+, A-, A)** | Helps users who benefit from adjustable text readability |
| **Skip to Main Content Link** | Improves keyboard navigation and screen reader efficiency |
| **Clear Page Landmarks** | Uses semantic HTML (`header`, `main`, `footer`, `nav`) for accessibility |
| **ARIA Roles & Live Regions** | Improves clarity for assistive technology users |
| **Responsive Layout** | Works across desktop, tablet, and mobile devices |

---

## 🎨 Accessibility Standards

This project follows:

- WCAG 2.2 AA color contrast ratios
- Keyboard operability (no keyboard traps)
- Visible focus indicators
- `aria-current` on active navigation
- Screen-reader accessible status messages

---

## 📈 Performance & Optimization

During optimization:

- Images were converted/compressed where appropriate (including WebP support)
- Unused CSS was removed
- React rendering paths were reviewed to support smoother interaction

Performance was evaluated using Lighthouse in Chrome DevTools.

| Category       | Approx Score |
|----------------|--------------|
| Performance    | 90+          |
| Accessibility  | 100          |
| Best Practices | 100          |
| SEO            | 100          |

(Scores may vary depending on device and network conditions.)

---

## 📂 Project Structure

InclusionLens/
├── public/ # Static assets (favicon, manifest, social image, etc.)
│ ├── index.html
│ ├── favicon.ico
│ ├── social-cover.webp
│ └── _redirects
│
├── src/
│ ├── components/ # Reusable UI components
│ │ ├── Navbar.jsx
│ │ ├── Footer.jsx
│ │ ├── SkipLink.jsx
│ │ └── AccessibilityControls.jsx
│ │
│ ├── pages/ # Main route pages
│ │ ├── Home.jsx
│ │ ├── About.jsx
│ │ ├── Resources.jsx
│ │ └── Contact.jsx
│ │
│ ├── App.js # Main application router
│ └── App.css # Global styles
│
├── package.json
├── package-lock.json
└── README.md

---

## 🛠️ Running the Project

```bash
npm install
npm start

flowchart LR
    A[Teacher opens InclusionLens] --> B{Who am I teaching?}
    B -->|Profile| C[Teacher Profile (role/year/SEN focus)]
    A --> D[Home: Quick Actions]
    D --> E[Strategy Finder]
    D --> F[Lesson Adaptor]
    D --> G[Resources (WCAG, WAVE, ADG)]
    E --> H[Filter by Need & Task]
    H --> I[Action Cards + Print/Export]
    F --> J[Select Barrier]
    J --> K[Adaptation Suggestions (UDL)]
    I --> L[Evidence Export (CSV/PDF)]
    K --> L
    C --> M[Settings: Theme, Font, Reduced Motion]
    D --> M
    subgraph Foundations
    M
    end
gantt
    title InclusionLens – Milestones
    dateFormat  YYYY-MM-DD
    section Done
    Foundation & Repo            :done,   m1, 2025-10-01, 3d
    UI & Navigation              :done,   m2, 2025-10-04, 2d
    Content & Resources          :done,   m3, 2025-10-06, 2d
    A11y by Design               :done,   m4, 2025-10-08, 3d
    Deploy & SEO                 :done,   m5, 2025-10-11, 1d
    Performance & Evidence       :done,   m6, 2025-10-12, 1d

    section Next
    Teacher Profiles             :active, m7,  2025-11-10, 2d
    Strategy Finder              :        m8,  2025-11-12, 2d
    Lesson Adaptor               :        m9,  2025-11-14, 2d
    Evidence Export (CSV/PDF)    :        m10, 2025-11-16, 1d
    PWA / Offline                :        m11, 2025-11-17, 1d
    Privacy-safe Analytics       :        m12, 2025-11-18, 1d
    Pilot & Feedback             :        m13, 2025-11-19, 10d
