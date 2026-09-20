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
import GrammarPage from './pages/public/GrammarPage';
import PhonicsPage from './pages/public/PhonicsPage';
import ReadingPage from './pages/public/ReadingPage';
import WritingPage from './pages/public/WritingPage';
import PalBookPage from './pages/public/PalBookPage';
import GamesPage from './pages/public/GamesPage';
import ShopPage from './pages/public/ShopPage';
import ProductPage from './pages/public/ProductPage';
import CheckoutPage from './pages/public/CheckoutPage';
import NotFoundPage from './pages/public/NotFoundPage';
import UnauthorizedPage from './pages/public/UnauthorizedPage';

// Auth
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Buyer pages
import MyLibraryPage from './pages/student/MyLibraryPage';

// Teacher pages
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import UploadLessonPage from './pages/teacher/UploadLessonPage';
import ManageLessonsPage from './pages/teacher/ManageLessonsPage';
import AnalyticsPage from './pages/teacher/AnalyticsPage';
import ManageProductsPage from './pages/teacher/ManageProductsPage';
import ShopOrdersPage from './pages/teacher/ShopOrdersPage';

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
          <Route path="/general/grammar" element={<GrammarPage />} />
          <Route path="/general/phonics" element={<PhonicsPage />} />
          <Route path="/general/reading" element={<ReadingPage />} />
          <Route path="/general/writing" element={<WritingPage />} />
          <Route path="/palbook" element={<PalBookPage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* Shop — browsing is open, buying and the library need an account */}
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:productId" element={<ProductPage />} />
          <Route
            path="/shop/:productId/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/library"
            element={
              <ProtectedRoute>
                <MyLibraryPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Buyer sign in / sign up, plus the teacher's secret login */}
        <Route element={<AuthLayout />}>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                {/* studentOnly: the teacher role is never offered on the open web */}
                <RegisterPage studentOnly />
              </PublicRoute>
            }
          />
          <Route
            path="/admin-wad-2026"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
        </Route>

        {/* Teacher dashboard - protected */}
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
          <Route
            path="/teacher/shop"
            element={
              <ProtectedRoute role={ROLES.TEACHER}>
                <ManageProductsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/orders"
            element={
              <ProtectedRoute role={ROLES.TEACHER}>
                <ShopOrdersPage />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;