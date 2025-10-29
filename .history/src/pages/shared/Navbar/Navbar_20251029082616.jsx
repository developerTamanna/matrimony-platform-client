import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import ThemeToggle from "../../Theme/ThemeToggle";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showName, setShowName] = useState(false);
  const { user, logout } = useAuth();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    logout().catch((err) => console.log(err));
  };

  const navLinkClass = ({ isActive }) =>
    `hover:text-lime-600 dark:hover:text-lime-400 ${
      isActive ? "text-lime-600 dark:text-lime-400 font-semibold" : ""
    }`;

  const navMobileClass = ({ isActive }) =>
    `block hover:text-lime-600 dark:hover:text-lime-400 ${
      isActive ? "text-lime-600 dark:text-lime-400 font-semibold" : ""
    }`;

  return (
    <header className="w-full top-0 z-50 fixed bg-lime-50 dark:bg-[#1a1a1a] text-gray-800 dark:text-white shadow-md dark:shadow-lg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo + Site Name */}
        <NavLink
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-lime-600 dark:text-lime-400"
        >
          <Heart className="w-9 h-9 text-lime-600 dark:text-lime-400" />
          <span>Matrimony</span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-6 font-medium text-base items-center">
          <NavLink to="/ai" end className={navLinkClass}>
            Ai
          </NavLink>
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/all-biodatas" className={navLinkClass}>
            Biodatas
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About Us
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact Us
          </NavLink>

          {!user && (
            <>
              <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>
              <NavLink to="/register" className={navLinkClass}>
                Register
              </NavLink>
            </>
          )}

          {user && (
            <>
              <NavLink to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/biodatas" className={navLinkClass}>
                BioDataForm
              </NavLink>

              {/* Profile Picture */}
              <div
                onClick={() => setShowName(!showName)}
                className="relative cursor-pointer"
              >
                <img
                  src={user.photoURL || "https://via.placeholder.com/40"}
                  alt="User Profile"
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full border-2 border-lime-600 dark:border-lime-400"
                />
                {showName && (
                  <div
                    className="absolute flex flex-col items-center justify-between top-full mt-1 left-1/2 -translate-x-1/2
                        bg-lime-50 dark:bg-gray-800 text-black dark:text-gray-200
                        text-sm rounded px-4 py-2 whitespace-nowrap shadow-lg z-10"
                  >
                    <p className="pb-1 border-b border-dotted border-gray-300 dark:border-gray-600 w-full text-center">
                      {user.displayName || "No Name"}
                    </p>
                    <NavLink to="/dashboard" className={navLinkClass}>
                      Dashboard
                    </NavLink>
                  </div>
                )}
              </div>

              <button
                onClick={handleLogout}
                className="ml-4 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
              >
                Logout
              </button>
            </>
          )}

          <ThemeToggle />
        </nav>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-3">
          <ThemeToggle />
          <button onClick={toggleMenu} className="focus:outline-none">
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="lg:hidden px-4 pb-4 space-y-3 font-medium text-base">
          <NavLink to="/" end onClick={toggleMenu} className={navMobileClass}>
            Home
          </NavLink>
          <NavLink
            to="/all-biodatas"
            onClick={toggleMenu}
            className={navMobileClass}
          >
            Biodatas
          </NavLink>
          <NavLink to="/about" onClick={toggleMenu} className={navMobileClass}>
            About Us
          </NavLink>
          <NavLink
            to="/contact"
            onClick={toggleMenu}
            className={navMobileClass}
          >
            Contact Us
          </NavLink>

          {!user && (
            <>
              <NavLink
                to="/login"
                onClick={toggleMenu}
                className={navMobileClass}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                onClick={toggleMenu}
                className={navMobileClass}
              >
                Register
              </NavLink>
            </>
          )}

          {user && (
            <>
              <NavLink
                to="/dashboard"
                onClick={toggleMenu}
                className={navMobileClass}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/biodatas"
                onClick={toggleMenu}
                className={navMobileClass}
              >
                BioDataForm
              </NavLink>
              <div
                onClick={toggleMenu}
                className="flex items-center gap-2 cursor-pointer"
              >
                <img
                  src={user.photoURL || "https://via.placeholder.com/40"}
                  alt="User Profile"
                  className="w-10 h-10 rounded-full border-2 border-lime-600 dark:border-lime-400"
                />
                <span>{user.displayName || "No Name"}</span>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="w-full mt-2 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
