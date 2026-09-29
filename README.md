# 🇵🇸 PalBook Live

> **Interactive English Learning Platform for Palestinian Students**
> Created by **T. Wad Refae**

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.2-646CFF?logo=vite)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)

---

## ✨ Overview

**PalBook Live** is a bilingual (Arabic/English) educational platform that turns the
*English for Palestine* curriculum into a live, interactive experience for Grades 5–9.
It has three main sections:

1. **General Section** — Grammar, pronunciation, reading and writing lessons
2. **PalBook Section** — Grade → Unit → Lesson hierarchy mirroring the textbook
3. **Games Section** — educational mini-games

The site is a **fully public, static single-page app**. There is no login, no
accounts and no backend: every lesson is a self-contained HTML page published by
pushing it to the **palbook-lessons** repository. The app discovers those lessons
from that repo's `manifest.json` (served on GitHub Pages) and renders them in a
safe iframe. It also ships a curated set of static lessons so the core content is
always available even if the manifest can't be fetched.

Features: full RTL support for Arabic, dark/light mode, bilingual UI, and
child-friendly animations throughout.

---

## 🎨 Design Philosophy

* **Palestinian identity**: flag-inspired palette (red, green, black, white) plus warm gradients
* **Kid-friendly UX**: rounded cards, playful emojis, gentle animations, large tap targets
* **Bilingual-first**: every UI element translated; RTL layout switches automatically with Arabic
* **Accessibility**: keyboard navigation, semantic HTML, sufficient color contrast

---

## 🚀 Quick Start

### Prerequisites

* **Node.js 18+** ([download](https://nodejs.org))
* **npm 9+** (comes with Node)

### 1. Clone and install

```bash
git clone https://github.com/T-WadRefae/palbook-live.git
cd palbook-live
npm install
```

### 2. Run the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) — you're live! 🎉

No environment variables are required to run the site. `.env.example` lists a
couple of optional display settings.

---

## 📚 Publishing lessons

Lessons are **not** uploaded through the app. To publish or update a lesson:

1. Add or edit a self-contained HTML file in the **palbook-lessons** repository
   (for example `grade7/unit1p1.html`, or a file under `grammar/`, `reading/`,
   `writing/` or `games/`).
2. Push to that repo's `main` branch.
3. A workflow rebuilds `manifest.json`, and the new lesson appears on the site
   automatically — curriculum files slot into their Grade → Unit → Lesson place,
   and the other folders map to their General/Games sections.

Use self-contained HTML files (all CSS/JS inline, images and audio hotlinked) for
the best experience.

---

## 📁 Project Structure

```
palbook-live/
├── public/                   # favicons, hero images, sitemap, manifest
├── src/
│   ├── components/
│   │   ├── common/           # Logo, Loader, LessonCard, LessonViewer, etc.
│   │   ├── layout/           # Navbar, Footer, SkyScene
│   │   └── general/          # GeneralSection (shared grammar/reading/writing view)
│   ├── contexts/             # ThemeContext
│   ├── data/                 # static lesson lists + lessonsService (reads the repo manifest)
│   ├── hooks/                # useSound, useWindowSize, useUrlState
│   ├── layouts/              # MainLayout
│   ├── pages/public/         # HomePage, GeneralPage, PalBookPage, GamesPage, 404
│   ├── styles/               # Global CSS with Tailwind
│   ├── translations/         # en/, ar/, i18n.js
│   ├── utils/                # constants, helpers, lessonsRepo (manifest fetch)
│   ├── App.jsx               # Router (public routes only)
│   └── main.jsx              # Entry point
├── .env.example
├── index.html
├── package.json
├── tailwind.config.js
├── vercel.json
└── vite.config.js
```

---

## 🎯 Features

* **General Section** — grammar, pronunciation, reading and writing lessons with search and grade filter
* **PalBook Section** — Grade → Unit → Lesson navigation, bilingual titles, safe iframe rendering
* **Games Section** — educational mini-games
* **Bilingual support** — full English + Arabic via `react-i18next`, auto RTL/LTR, preference saved in localStorage
* **Dark/light theme** toggle (persisted)
* **Smooth page transitions** with Framer Motion
* **Fully responsive** — mobile, tablet, desktop

---

## 🛠️ Available Scripts

```bash
npm run dev       # Start dev server (http://localhost:5173)
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
```

---

## 🌐 Deployment to Vercel

### GitHub integration (recommended)

1. Push the project to GitHub
2. Visit [vercel.com/new](https://vercel.com/new)
3. Import the repository
4. **Framework Preset**: Vite (auto-detected) — no environment variables needed
5. Click **Deploy** 🚀

The included `vercel.json` handles SPA routing fallback.

---

## 🧪 Tech Stack

| Layer | Technology |
|-|-|
| Framework | React 18 + Vite 5 |
| Styling | TailwindCSS 3 |
| Content source | palbook-lessons repo (`manifest.json` on GitHub Pages) |
| Routing | React Router 6 |
| Animations | Framer Motion |
| Internationalization | react-i18next |
| Icons | react-icons |
| Notifications | react-hot-toast |
| Sound | Web Audio API + SpeechSynthesis |
| Confetti | react-confetti |

---

## 📜 License

MIT © 2026 T. Wad Refae

---

## 🇵🇸 Acknowledgements

Built with love for Palestinian students learning English. The content is grounded
in the official *English for Palestine* curriculum and enriched with culturally
relevant materials — embroidery, food, geography, and heritage — to make learning
meaningful and engaging.

> *"Education is the most powerful weapon which you can use to change the world."*

---

**Created by T. Wad Refae** 👩‍🏫 🇵🇸
