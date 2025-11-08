# 🌍 InclusionLens – Inclusive, Accessible Teaching Support Toolkit

InclusionLens is a teacher-centered digital support tool designed to help educators quickly adapt lessons for diverse learners, including SEND (Special Educational Needs and Disabilities) contexts.  
The platform bridges the gap between *inclusive pedagogy theory* and *real-time classroom action*, providing simple, practical accessibility adjustments teachers can make on the spot.

This project demonstrates real-world accessibility, usability, performance optimization, and inclusive design aligned with **WCAG 2.2 AA** and **UDL (Universal Design for Learning)** principles.

---

## 🚀 Live Demo

🔗 **Live Site:**  
https://hafizabdullah5755.github.io/InclusionLens/

---

## 🧩 Key Features

| Feature | Description |
|--------|-------------|
| **Dark/Light Mode** | Improves visual comfort and accessibility |
| **Font Resize Controls (A+, A-, Reset)** | Supports visual accessibility and reading ease |
| **Skip to Main Content Link** | Full keyboard navigation support |
| **Screen Reader Announcements** | `role="alert"` and `aria-live` for feedback |
| **Consistent Accessible Navigation** | Uses `aria-current="page"` for active routes |
| **WCAG 2.2 AA Compliant Structure** | Landmarks: `header`, `main`, `nav`, `footer` |
| **Performance Optimized** | Lazy loaded components + compressed WebP social preview image |

---

## 🧠 Why This Matters

Teachers — especially supply teachers, SEND practitioners, and early-career educators — often need to adapt lessons *immediately* during class.  
InclusionLens supports those real-time decisions by:

- Reducing cognitive load  
- Improving accessibility awareness  
- Supporting inclusive participation  
- Making inclusive teaching *practical*, not theoretical  

This aligns with PhD and research goals around **teacher cognition**, **inclusive pedagogy**, and **digital scaffolding in ALN/SEND settings**.

---

## 🎨 Accessibility Highlights

- ✅ WCAG 2.2 AA color contrast and layout
- ✅ Skip navigation for keyboard users
- ✅ Focus-visible states preserved across the UI
- ✅ ARIA labeling and form validation roles
- ✅ Respects user `prefers-reduced-motion`
- ✅ Accessible page structure and semantic HTML

---

## 📈 Performance & SEO (Day 12)

| Category | Score (Mobile/PC) |
|--------|------|
| Performance | **90+** |
| Accessibility | **100** |
| Best Practices | **100** |
| SEO | **100** |

> Full Lighthouse reports stored in Drive (see below).

---

## 📸 Screenshots

| Home Page | Accessibility Toolbar | Performance Report |
|----------|----------------------|-------------------|
| ![Home Screenshot](docs/screenshots/home.png) | ![Toolbar Screenshot](docs/screenshots/toolbar.png) | ![Lighthouse Screenshot](docs/screenshots/lighthouse.png) |

> If you haven’t added screenshots yet, keep these placeholders — no need to edit code.

---

## 📂 Documentation & Drive Storage (Portfolio Evidence)

All evidence — development progress, reports, design notes, and optimization work — is stored here:

🔗 **Google Drive (View Only):**  
https://drive.google.com/drive/folders/1IU5Mqu8SJOp1oyWnUj2egJJ_4Gb-PZPp

Contains:
- Day-by-day build documentation
- Lighthouse performance reports
- Social preview validation screenshots
- Collateral used for research + supervisor review

---

## 🛠️ Built With

- **React 18/19** + **React Router v7**
- **Framer Motion** (optional reduced-motion support)
- **Semantic HTML + ARIA roles**
- **GitHub Pages Deployment**
- **Lighthouse/DevTools Performance Monitoring**

---

## ⚙️ Developer Usage

```bash
npm install      # Install dependencies
npm start        # Run locally
npm run build    # Production build
npm run deploy   # Deploy to GitHub Pages
