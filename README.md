# 🇵🇸 PalBook Live

> \\\*\\\*Interactive English Learning Platform for Palestinian Students\\\*\\\*
> Created by \\\*\\\*T. Wad Refae\\\*\\\* — Surda Basic Mixed School

[!\[React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://react.dev)
[!\[Vite](https://img.shields.io/badge/Vite-5.2-646CFF?logo=vite)](https://vitejs.dev)
[!\[Firebase](https://img.shields.io/badge/Firebase-10.12-FFCA28?logo=firebase)](https://firebase.google.com)
[!\[TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)

\---

## ✨ Overview

**PalBook Live** is a bilingual (Arabic/English) educational platform built to digitally re-engineer the *English for Palestine* curriculum into a live, interactive experience. It serves students in Grades 1–9 with three main sections:

1. **General Section** — Grammar lessons and pronunciation rules
2. **PalBook Live Section** — Grade → Unit → Lesson hierarchy mirroring the textbook
3. **Games Section** — 4 educational mini-games (multiple choice, matching, sentence builder, pronunciation)

The platform features role-based authentication (Student / Teacher), a polished teacher dashboard for uploading HTML lessons to Firebase Storage, a student dashboard with progress tracking and achievements, full RTL support for Arabic, dark/light mode, and child-friendly animations throughout.

\---

## 🎨 Design Philosophy

* **Palestinian identity**: flag-inspired color palette (red, green, black, white) plus warm gradients
* **Kid-friendly UX**: rounded cards, playful emojis, gentle animations, large tap targets
* **Bilingual-first**: every UI element translated, RTL layout switches automatically with Arabic
* **Accessibility**: keyboard navigation, semantic HTML, sufficient color contrast

\---

## 🚀 Quick Start

### Prerequisites

* **Node.js 18+** ([download](https://nodejs.org))
* **npm 9+** (comes with Node)
* A **Firebase project** ([create one](https://console.firebase.google.com))

### 1\. Clone the repository

```bash
git clone https://github.com/T-WadRefae/palbook-live.git
cd palbook-live
```

### 2\. Install dependencies

```bash
npm install
```

### 3\. Set up environment variables

Copy the example file and fill in your Firebase credentials:

```bash
cp .env.example .env
```

Open `.env` and replace the placeholder values with credentials from your Firebase project:
**Firebase Console → Project Settings → General → Your apps → SDK setup**

```env
VITE\\\_FIREBASE\\\_API\\\_KEY=AIzaSy...
VITE\\\_FIREBASE\\\_AUTH\\\_DOMAIN=your-project.firebaseapp.com
VITE\\\_FIREBASE\\\_PROJECT\\\_ID=your-project-id
VITE\\\_FIREBASE\\\_STORAGE\\\_BUCKET=your-project.appspot.com
VITE\\\_FIREBASE\\\_MESSAGING\\\_SENDER\\\_ID=1234567890
VITE\\\_FIREBASE\\\_APP\\\_ID=1:1234567890:web:abc123
VITE\\\_FIREBASE\\\_MEASUREMENT\\\_ID=G-XXXXXX
```

### 4\. Run the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) — you're live! 🎉

\---

## 🔥 Firebase Setup

You need to enable three Firebase services for the platform to work fully.

### Authentication

1. Go to **Firebase Console → Authentication → Get started**
2. Enable the **Email/Password** sign-in provider

### Firestore Database

1. Go to **Firestore Database → Create database**
2. Start in **production mode** (or test mode for now), pick the nearest region
3. Paste the rules below in the **Rules** tab and publish:

```js
rules\\\_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Users: own profile is readable+writable; teachers can list all users
    match /users/{userId} {
      allow read: if request.auth != null
                  \\\&\\\& (request.auth.uid == userId
                      || get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'teacher');
      allow create: if request.auth != null \\\&\\\& request.auth.uid == userId;
      allow update: if request.auth != null \\\&\\\& request.auth.uid == userId;
    }

    // Lessons: anyone signed in can read; only teachers can write
    match /lessons/{lessonId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null
        \\\&\\\& get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'teacher';
    }
  }
}
```

### Storage

1. Go to **Storage → Get started** and accept defaults
2. Paste these rules in the **Rules** tab and publish:

```js
rules\\\_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /lessons/{allPaths=\\\*\\\*} {
      allow read: if true;
      allow write: if request.auth != null
        \\\&\\\& firestore.get(/databases/(default)/documents/users/$(request.auth.uid)).data.role == 'teacher';
    }
  }
}
```

> ⚠️ \\\*\\\*CORS for HTML lessons\\\*\\\*: Firebase Storage allows iframe loads by default, but if you hit CORS issues, configure CORS using the \\\[gsutil tool](https://firebase.google.com/docs/storage/web/download-files#cors\\\_configuration).

\---

## 📁 Project Structure

```
palbook-live/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── common/           # Logo, Loader, LessonCard, LessonViewer, etc.
│   │   ├── layout/           # Navbar, Footer, Sidebar
│   │   ├── games/            # GameShell wrapper
│   │   └── dashboard/        # (reserved for future)
│   ├── contexts/             # AuthContext, ThemeContext
│   ├── firebase/             # config, auth, lessons, storage helpers
│   ├── hooks/                # useSound, useWindowSize
│   ├── layouts/              # MainLayout, DashboardLayout, AuthLayout
│   ├── pages/
│   │   ├── auth/             # LoginPage, RegisterPage
│   │   ├── public/           # HomePage, GeneralPage, PalBookPage, GamesPage, etc.
│   │   ├── student/          # StudentDashboard + 4 game pages
│   │   └── teacher/          # TeacherDashboard, UploadLessonPage, ManageLessonsPage
│   ├── routes/               # ProtectedRoute, PublicRoute
│   ├── styles/               # Global CSS with Tailwind
│   ├── translations/         # en/, ar/, i18n.js
│   ├── utils/                # constants, helpers
│   ├── App.jsx               # Main router
│   └── main.jsx              # Entry point
├── .env.example
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vercel.json
├── vite.config.js
└── README.md
```

\---

## 🎯 Features

### General Section

* Grammar and pronunciation lessons
* Search and filter
* Beautiful card-based gallery
* Fullscreen HTML lesson viewer

### PalBook Live Section

* Dynamic Grade → Unit → Lesson navigation
* Lesson cards auto-generated from Firestore
* Bilingual lesson titles (English + Arabic)
* Iframe-based safe lesson rendering

### Games (4 mini-games with sound effects)

1. **Multiple Choice** — pick the correct answer from 4 options
2. **Matching** — match English words with Arabic meanings
3. **Sentence Builder** — drag words to form correct sentences
4. **Pronunciation Challenge** — listen (via SpeechSynthesis) and identify the right spelling

All games feature: scoring, success animations, confetti, correct/wrong sound effects, points saved to the student's profile.

### Teacher Dashboard 👩‍🏫 (T. Wad Refae)

* Stats overview (lessons, students, sections)
* Upload HTML lessons with full metadata (section, grade, unit, lesson, bilingual titles)
* Manage all lessons: search, filter, edit, delete
* Emoji thumbnail picker
* File validation (HTML only)

### Student Dashboard 🎓

* Welcome banner with personalized greeting
* Progress bar across all lessons
* Achievements system (Starter → Palestine Legend)
* Points counter
* "Continue Learning" quick-jump

### Bilingual Support

* Full English + Arabic translations via `react-i18next`
* Auto RTL/LTR switching
* Language preference saved in localStorage
* Arabic-specific font stack (Cairo, Tajawal)

### Other

* Dark/light theme toggle (persisted)
* Smooth page transitions with Framer Motion
* Toast notifications via `react-hot-toast`
* Fully responsive (mobile, tablet, desktop)
* 404 and Unauthorized pages

\---

## 🛠️ Available Scripts

```bash
npm run dev       # Start dev server (http://localhost:5173)
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
```

\---

## 🌐 Deployment to Vercel

### Option 1: One-click deploy via Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

### Option 2: GitHub integration (recommended)

1. Push your project to GitHub
2. Visit [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repo
4. **Framework Preset**: Vite (auto-detected)
5. Add your environment variables in the Vercel dashboard:

   * All `VITE\\\_FIREBASE\\\_\\\*` variables from your `.env`
6. Click **Deploy** 🚀

The included `vercel.json` already handles SPA routing fallback.

### After deploying

1. Open **Firebase Console → Authentication → Settings → Authorized domains**
2. Add your Vercel domain (e.g. `palbook-live.vercel.app`)

\---

## 👥 First Teacher Account

After deploying, register a teacher account:

1. Click **Register**
2. Choose **Teacher** role
3. Use a strong password
4. You're in — head to **Dashboard → Upload Lesson** to add your first HTML lesson!

> 💡 \\\*\\\*Tip\\\*\\\*: Upload self-contained HTML files (no external dependencies) for the best experience. Your existing interactive lesson files from PalBook Live work perfectly.

\---

## 🧪 Tech Stack

|Layer|Technology|
|-|-|
|Framework|React 18 + Vite 5|
|Styling|TailwindCSS 3|
|Backend|Firebase (Auth, Firestore, Storage)|
|Routing|React Router 6|
|Animations|Framer Motion|
|Internationalization|react-i18next|
|Icons|react-icons|
|Notifications|react-hot-toast|
|Sound|Web Audio API + SpeechSynthesis|
|Confetti|react-confetti|

\---

## 📚 Sample Firestore Document Shape

A lesson document in the `lessons` collection looks like:

```json
{
  "section": "palbook",
  "grade": 7,
  "unit": 16,
  "lesson": 3,
  "title": "Communication and Technology",
  "titleAr": "التواصل والتكنولوجيا",
  "description": "Interactive vocabulary, listening, and reading practice.",
  "thumbnail": "📱",
  "fileUrl": "https://firebasestorage.googleapis.com/...",
  "filePath": "lessons/palbook/grade-7/unit-16/lesson-3/...html",
  "fileName": "unit16-period3.html",
  "teacher": "T. Wad Refae",
  "school": "",
  "createdAt": "2026-05-01T...",
  "updatedAt": "2026-05-01T..."
}
```

\---

## 🤝 Contributing

This is a personal educational platform by T. Wad Refae. Suggestions and improvements are welcome via Issues and Pull Requests.

\---

## 📜 License

MIT © 2026 T. Wad Refae

\---

## 🇵🇸 Acknowledgements

Built with love for Palestinian students learning English. The platform's content is grounded in the official *English for Palestine* curriculum and enriched with culturally relevant materials — embroidery, food, geography, and heritage — to make learning meaningful and engaging.

> \\\*"Education is the most powerful weapon which you can use to change the world."\\\*

\---

**Created by T. Wad Refae** 👩‍🏫
🏫 Surda Basic Mixed School • Birzeit Education Directorate
🇵🇸 Palestine

