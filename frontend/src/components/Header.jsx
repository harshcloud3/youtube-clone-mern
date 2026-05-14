// Import useState hook
import { useState } from 'react';

// Import React Router utilities
import {
  Link,
  useNavigate
} from 'react-router-dom';

// Import authentication context
import { useAuth } from '../context/AuthContext';

// Import sidebar and UI icons
import {
  FaBars,
  FaYoutube,
  FaSearch,
  FaUserCircle,
  FaHome,
  FaMusic,
  FaGamepad,
  FaFootballBall,
  FaNewspaper
} from 'react-icons/fa';


// ========================= HEADER COMPONENT =========================
export default function Header() {

  // Get logged-in user and logout function
  const { user, logout } = useAuth();

  // Sidebar open/close state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Search input state
  const [searchTerm, setSearchTerm] = useState('');

  // React Router navigation
  const navigate = useNavigate();


  // ========================= CATEGORY FILTER FUNCTION =========================
  const handleCategory = (category) => {

    // Navigate to homepage with category query
    navigate(`/?category=${category}`);

    // Close sidebar after click
    setSidebarOpen(false);
  };


  // ========================= SEARCH FUNCTION =========================
  const handleSearch = (e) => {

    // Prevent page refresh
    e.preventDefault();

    // Navigate using search query
    navigate(`/?search=${searchTerm}`);
  };


  // ========================= COMPONENT UI =========================
  return (
    <>

      {/* ========================= TOP HEADER ========================= */}
      <header className="fixed top-0 left-0 w-full bg-white border-b z-50 px-2 sm:px-4 py-3 flex items-center justify-between gap-2">

        {/* ========================= LEFT SECTION ========================= */}
        <div className="flex items-center gap-4">

          {/* Sidebar toggle button */}
          <button
            onClick={() =>
              setSidebarOpen(!sidebarOpen)
            }
            className="text-2xl"
          >
            <FaBars />
          </button>

          {/* Logo/Home link */}
          <Link
            to="/"
            className="flex items-center gap-1 sm:gap-2 text-sm sm:text-2xl font-bold text-red-600 whitespace-nowrap"
          >
            <FaYoutube />

            YouTube Clone
          </Link>
        </div>


        {/* ========================= SEARCH BAR ========================= */}
        <form
          onSubmit={handleSearch}
          className="flex items-center flex-1 max-w-2xl mx-1 sm:mx-6"
        >

          {/* Search input */}
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="w-full border rounded-l-full px-2 sm:px-4 py-1 sm:py-2 outline-none text-sm"
          />

          {/* Search button */}
          <button
            type="submit"
            className="border border-l-0 rounded-r-full px-5 py-2 bg-gray-100"
          >
            <FaSearch />
          </button>

        </form>


        {/* ========================= RIGHT SECTION ========================= */}
        <div className="flex items-center gap-4">

          {/* If user is logged in */}
          {user ? (
            <>

              {/* My Channel button */}
              <Link
                to="/channel"
                className="bg-blue-600 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-sm"
              >
                My Channel
              </Link>

              {/* Old logout button removed */}
              {/* 
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
              */}

              {/* User profile display */}
              <div className="hidden sm:flex items-center gap-2 font-semibold">

                <FaUserCircle className="text-2xl" />

                {user.username}

              </div>

            </>
          ) : (

            // If user not logged in
            <Link
              to="/login"
              className="border border-blue-500 text-blue-600 px-4 py-2 rounded-full"
            >
              Sign In
            </Link>

          )}

        </div>
      </header>


      {/* ========================= SIDEBAR ========================= */}
      <div
        className={`fixed top-[72px] left-0 h-full w-64 bg-white border-r z-40 transition-transform duration-300 ${
          sidebarOpen
            ? 'translate-x-0'
            : '-translate-x-full'
        }`}
      >

        <div className="p-4 space-y-2">


          {/* ========================= HOME BUTTON ========================= */}
          <button
            onClick={() => {

              // Navigate to homepage
              navigate('/');

              // Close sidebar
              setSidebarOpen(false);

            }}
            className="w-full flex items-center gap-4 hover:bg-gray-100 p-3 rounded-xl transition"
          >
            <FaHome className="text-xl" />

            <span>Home</span>
          </button>


          {/* ========================= MUSIC CATEGORY ========================= */}
          <button
            onClick={() =>
              handleCategory('Music')
            }
            className="w-full flex items-center gap-4 hover:bg-gray-100 p-3 rounded-xl transition"
          >
            <FaMusic className="text-xl" />

            <span>Music</span>
          </button>


          {/* ========================= GAMING CATEGORY ========================= */}
          <button
            onClick={() =>
              handleCategory('Gaming')
            }
            className="w-full flex items-center gap-4 hover:bg-gray-100 p-3 rounded-xl transition"
          >
            <FaGamepad className="text-xl" />

            <span>Gaming</span>
          </button>


          {/* ========================= SPORTS CATEGORY ========================= */}
          <button
            onClick={() =>
              handleCategory('Sports')
            }
            className="w-full flex items-center gap-4 hover:bg-gray-100 p-3 rounded-xl transition"
          >
            <FaFootballBall className="text-xl" />

            <span>Sports</span>
          </button>


          {/* ========================= NEWS CATEGORY ========================= */}
          <button
            onClick={() =>
              handleCategory('News')
            }
            className="w-full flex items-center gap-4 hover:bg-gray-100 p-3 rounded-xl transition"
          >
            <FaNewspaper className="text-xl" />

            <span>News</span>
          </button>


          {/* ========================= LOGOUT BUTTON ========================= */}
          <button
            onClick={logout}
            className="w-full flex items-center gap-4 hover:bg-red-100 text-red-600 p-3 rounded-xl transition mt-6"
          >

            {/* Logout icon */}
            <span className="text-xl">
              ↩
            </span>

            <span>Logout</span>

          </button>

        </div>
      </div>
    </>
  );
}