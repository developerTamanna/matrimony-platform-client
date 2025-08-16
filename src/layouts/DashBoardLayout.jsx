import { useEffect, useState } from 'react';
import {
  MdAdminPanelSettings,
  MdContactPhone,
  MdDashboard,
  MdEmojiEvents,
  MdFavorite,
  MdLogout,
  MdMenu,
  MdPerson,
  MdPersonAdd,
  MdStars,
  MdThumbUp,
} from 'react-icons/md';
import { Link, NavLink, Outlet, useLocation} from 'react-router';
import useAuth from '../hooks/useAuth';
import ThemeToggle from '../pages/Theme/ThemeToggle';

export const Navlink = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center px-3 py-2 rounded-md transition-colors ${
          isActive
            ? 'bg-lime-200 dark:bg-lime-700 text-black dark:text-white font-semibold'
            : 'hover:bg-lime-100 dark:hover:bg-lime-800'
        }`
      }
    >
      <span className="mr-3 text-lg">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
};

const DashBoardLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const location = useLocation();
  useEffect(()=>{
    window.scrollTo(0,0);
  },[location])

  // sidebar বাইরে ক্লিক করলে sidebar বন্ধ হবে
  useEffect(() => {
    if (!mobileOpen) return;

    const handleOutsideClick = (e) => {
      const sidebar = document.getElementById('mobile-sidebar');
      if (sidebar && !sidebar.contains(e.target)) {
        setMobileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [mobileOpen]);

  const drawerItems = (
    <div className="w-64 h-full bg-white dark:bg-[#121212] text-black dark:text-white flex flex-col">
      <div className="text-center py-4 border-b border-gray-200 dark:border-gray-700">
        <ThemeToggle />
        <Link to="/" className="text-lime-600 font-bold block mt-2">
          ⬅ Back to Home
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto px-2 space-y-1">
        {(user?.role?.role === 'user' || user?.role?.role === 'premium') && (
          <>
            <Navlink
              to="/dashboard"
              end
              icon={<MdDashboard />}
              label="View Biodata"
            />
            <Navlink
              to="/dashboard/edit-biodata"
              icon={<MdPerson />}
              label="Edit Biodata"
            />
            <Navlink
              to="/dashboard/my-contact-request"
              icon={<MdContactPhone />}
              label="My Contact Request"
            />
            <Navlink
              to="/dashboard/my-favourites"
              icon={<MdFavorite />}
              label="My Favourites"
            />
            <Navlink
              to="/dashboard/got-married"
              icon={<MdThumbUp />}
              label="Got Married"
            />
            <Navlink
              to="/dashboard/sucsess"
              icon={<MdEmojiEvents />}
              label="Success Stories"
            />
            <Navlink
              to="/dashboard/biodatas"
              icon={<MdPersonAdd />}
              label="Create Bio Data"
            />
          </>
        )}

        {user?.role?.role === 'admin' && (
          <>
            <div className="border-t border-gray-300 dark:border-gray-700 my-2" />
            <Navlink
              to="/dashboard"
              icon={<MdAdminPanelSettings />}
              label="Admin Dashboard"
            />
            <Navlink
              to="/dashboard/manage-users"
              icon={<MdPerson />}
              label="Manage Users"
            />
            <Navlink
              to="/dashboard/approved-premium"
              icon={<MdStars />}
              label="Approved Premium"
            />
            <Navlink
              to="/dashboard/approved-contact-request"
              icon={<MdContactPhone />}
              label="Approved Contacts"
            />
            <Navlink
              to="/dashboard/success-stories"
              icon={<MdEmojiEvents />}
              label="Succeeded Married"
            />
          </>
        )}

        <div className="border-t w-full border-gray-300 dark:border-gray-700 my-2" />
        <button
          className="flex cursor-pointer w-full items-center px-3 py-2 rounded-md hover:bg-lime-100 dark:hover:bg-lime-800 transition-colors"
          onClick={() => logout()}
        >
          <MdLogout className="mr-3 text-lg" /> Logout
        </button>
       {/*  <Navlink to="/dashboard/logout" icon={<MdLogout />} label="Logout" /> */}
      </nav>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white dark:bg-[#121212] text-black dark:text-white">
      {/* Desktop Sidebar */}
      <div className="md:block hidden w-64">{drawerItems}</div>

      {/* Mobile Sidebar */}
      <div className="md:hidden p-4 relative z-50">
        <button
          onClick={toggleDrawer}
          className="bg-lime-600 text-white p-2 rounded-md"
          aria-label="Toggle menu"
        >
          <MdMenu size={24} />
        </button>

        {/* backdrop */}
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* sidebar drawer */}
        {mobileOpen && (
          <div
            id="mobile-sidebar"
            className="fixed top-0 left-0 z-50 w-64 h-full shadow-lg bg-white dark:bg-[#121212] transform transition-transform duration-300 ease-in-out"
          >
            {drawerItems}
          </div>
        )}
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default DashBoardLayout;
