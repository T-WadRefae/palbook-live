import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout
import MainLayout from './layouts/MainLayout';

// Public pages
import HomePage from './pages/public/HomePage';
import GeneralPage from './pages/public/GeneralPage';
import GrammarPage from './pages/public/GrammarPage';
import PhonicsPage from './pages/public/PhonicsPage';
import ReadingPage from './pages/public/ReadingPage';
import WritingPage from './pages/public/WritingPage';
import PalBookPage from './pages/public/PalBookPage';
import GamesPage from './pages/public/GamesPage';
import WorksheetsPage from './pages/public/WorksheetsPage';
import NotFoundPage from './pages/public/NotFoundPage';

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
          <Route path="/worksheets" element={<WorksheetsPage />} />
          <Route path="/games" element={<GamesPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
