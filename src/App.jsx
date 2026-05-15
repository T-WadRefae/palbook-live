import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';

// Route guards
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';

// Public pages
import HomePage from './pages/public/HomePage';
import GeneralPage from './pages/public/GeneralPage';
import PalBookPage from './pages/public/PalBookPage';
import GamesPage from './pages/public/GamesPage';
import NotFoundPage from './pages/public/NotFoundPage';
import UnauthorizedPage from './pages/public/UnauthorizedPage';

// Auth pages
import LoginPage from './pages/auth/LoginPage';

// Student pages (games only - student dashboard removed for now)
import MultipleChoiceGame from './pages/student/MultipleChoiceGame';
import MatchingGame from './pages/student/MatchingGame';
import SentenceBuilderGame from './pages/student/SentenceBuilderGame';
import PronunciationGame from './pages/student/PronunciationGame';

// Teacher pages
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import UploadLessonPage from './pages/teacher/UploadLessonPage';
import ManageLessonsPage from './pages/teacher/ManageLessonsPage';
import AnalyticsPage from './pages/teacher/AnalyticsPage';

import { ROLES } from './utils/constants';

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public pages */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/general" element={<GeneralPage />} />
          <Route path="/palbook" element={<PalBookPage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* Games - public access */}
          <Route path="/games/multiple-choice" element={<MultipleChoiceGame />} />
          <Route path="/games/matching" element={<MatchingGame />} />
          <Route path="/games/sentence-builder" element={<SentenceBuilderGame />} />
          <Route path="/games/pronunciation" element={<PronunciationGame />} />
        </Route>

        {/* Secret login - only at this hidden URL */}
        <Route element={<AuthLayout />}>
          <Route
            path="/admin-wad-2026"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
        </Route>

        {/* Teacher dashboard - protected, teacher only */}
        <Route element={<DashboardLayout />}>
          <Route
            path="/teacher"
            element={
              <ProtectedRoute role={ROLES.TEACHER}>
                <TeacherDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/upload"
            element={
              <ProtectedRoute role={ROLES.TEACHER}>
                <UploadLessonPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/lessons"
            element={
              <ProtectedRoute role={ROLES.TEACHER}>
                <ManageLessonsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/analytics"
            element={
              <ProtectedRoute role={ROLES.TEACHER}>
                <AnalyticsPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Catch-all 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;