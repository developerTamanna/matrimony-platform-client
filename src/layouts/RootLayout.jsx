import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router'; // ✅ react-router-dom use koro
import Navbar from '../pages/shared/Navbar/Navbar';
import Footer from '../pages/shared/Footer/Footer';

const RootLayout = () => {
    const location = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);
  return (
    <div className="w-full mx-auto dark:bg-black bg-lime-50">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Main content area (Outlet) */}
      <div className="min-h-screen w-full mx-auto pt-18.5 py-10 md:px-4 px-2">
        {/* pt-24 = padding-top: 96px to prevent content overlap with navbar */}
        <Outlet />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default RootLayout;
