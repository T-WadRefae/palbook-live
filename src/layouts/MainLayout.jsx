import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SkyScene from '../components/layout/SkyScene';

const MainLayout = () => {
  return (
    <div className="relative min-h-screen flex flex-col">
      <SkyScene />
      <Navbar />
      <main className="relative z-10 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
