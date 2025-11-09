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

## 🧭 System Flow (How Teachers Use InclusionLens)

```mermaid
flowchart LR
A[Teacher opens InclusionLens] --> B{Who is in my class today?}
B --> C[Teacher Profile: Role / Year Group / SEND Needs]
A --> D[Home: Quick Inclusive Actions]
D --> E[Strategy Finder]
E --> F[Lesson Adaptor: Step-by-step support]
D --> G[Resources Library (WCAG, Wave, ADG)]
F --> H[Filter by Need / Task Type]
H --> I[Action Cards + Printable Tips]
I --> J[Select Barrier to Learning]
J --> K[Suggested Adaptations (UDL-based)]
K --> L[Evidence Export (CSV / PDF)]
C --> M[Settings: Theme / Font Size / Reduced Motion]
