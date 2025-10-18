import { useState } from "react";
import { FaSignOutAlt, FaFilm, FaRobot, FaBars, FaTimes } from "react-icons/fa";
import { MdLiveTv } from "react-icons/md";
import { BsBookmarkFill } from "react-icons/bs";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  // Used to detect the current route. Useful to highlight the active nav item dynamically.
  
  const user = useSelector((store) => store.user);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = () => {
    // Firebase signOut returns a promise. Handling async flow with .then() & .catch()
    signOut(auth)
      .then(() => navigate("/")) // Redirect to landing page after logout
      .catch((error) => console.error("Sign-out error:", error));
  };

  const navItems = [
    { name: "Movies", path: "/browse", icon: <FaFilm size={18} /> },
    { name: "TV Shows", path: "/tv-shows", icon: <MdLiveTv size={18} /> },
    { name: "Watchlist", path: "/watchlist", icon: <BsBookmarkFill size={18} /> },
    { name: "AI Search", path: "/ai-search", icon: <FaRobot size={18} />, highlight: true }, 
    // 'highlight' used for special AI Search item. We animate it differently and style uniquely.
  ];

  return (
    <header className="sticky top-0 z-50 bg-gray-800/90 backdrop-blur-lg border-b border-gray-700 shadow-sm">

      <div className="w-full flex items-center justify-between h-16 px-4">

        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/browse")}
        >
          <FaFilm size={28} className="text-pink-500" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent tracking-wide">
            CineVerse
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path; 
            // Dynamic active state based on current route
            const isAISearch = item.highlight; 

            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 cursor-pointer relative
                  ${isActive
                    ? "bg-gray-700 text-white shadow-md" 
                    : isAISearch
                      ? "text-pink-500 hover:text-pink-400" 
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
              >
                {item.icon}
                <span>{item.name}</span>

                {/* Pulse animation for AI Search button when not active */}
                {isAISearch && !isActive && (
                  <span className="absolute inset-0 rounded-lg animate-pulse opacity-60 pointer-events-none"></span>
                  // Using absolute + animate-pulse + pointer-events-none for smooth animation without blocking clicks
                )}
              </button>
            );
          })}
        </nav>

        {/* User Info + Mobile Toggle */}
        <div className="flex items-center space-x-3">
          <span className="hidden sm:inline text-sm text-gray-300 font-medium">
            Welcome {user?.displayName || "Guest"}
          </span>

          <button
            className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-red-700 text-white hover:bg-red-800 transition-colors cursor-pointer"
            onClick={handleSignOut}
          >
            <FaSignOutAlt size={18} />
            <span className="hidden sm:inline font-medium">Logout</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden ml-2 text-gray-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900/95 border-t border-gray-700">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const isAISearch = item.highlight;

            return (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.path);
                  setMobileMenuOpen(false); 
                  // Ensures mobile menu closes after navigation. Interviewers often ask why we close menu manually.
                }}
                className={`w-full text-left flex items-center gap-2 px-4 py-3 font-medium transition-all duration-300
                  ${isActive
                    ? "bg-gray-700 text-white"
                    : isAISearch
                      ? "text-pink-500 hover:text-pink-400"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};

export default Header;
