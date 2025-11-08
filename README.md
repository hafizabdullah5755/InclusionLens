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
│
├── public/ # Static assets
├── src/
│ ├── components/ # Navbar, Footer, Controls, Skip Link
│ ├── pages/ # Home, About, Resources, Contact
│ └── App.js
│
└── README.md

---

## 🛠️ Running the Project

```bash
npm install
npm start
