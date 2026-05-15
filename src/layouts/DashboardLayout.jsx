import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
      <Navbar />
      <div className="flex flex-1 w-full">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 p-4 md:p-6 lg:p-8 min-w-0 max-w-6xl mx-auto w-full">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden mb-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 shadow-soft"
          >
            <FiMenu /> Menu
          </button>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
