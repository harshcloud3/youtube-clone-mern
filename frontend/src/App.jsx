// Import React Router components
// Added frontend UI refinements
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

// Import authentication provider and hook
import {
  AuthProvider,
  useAuth
} from './context/AuthContext';

// Import pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import VideoPlayer from './pages/VideoPlayer';
import ChannelPage from './pages/ChannelPage';

// Import common header component
import Header from './components/Header';


// ========================= APP ROUTES COMPONENT =========================
function AppRoutes() {

  // Get logged-in user from auth context
  const { user } = useAuth();

  return (
    <>

      {/* Common header/navbar */}
      <Header />


      {/* ========================= APPLICATION ROUTES ========================= */}
      <Routes>

        {/* Home page */}
        <Route
          path="/"
          element={<Home />}
        />


        {/* Login page */}
        {/* Redirect logged-in users to homepage */}
        <Route
          path="/login"
          element={
            !user
              ? <Login />
              : <Navigate to="/" />
          }
        />


        {/* Register page */}
        {/* Redirect logged-in users to homepage */}
        <Route
          path="/register"
          element={
            !user
              ? <Register />
              : <Navigate to="/" />
          }
        />


        {/* Video player page */}
        <Route
          path="/video/:id"
          element={<VideoPlayer />}
        />


        {/* Protected channel page */}
        {/* Redirect unauthenticated users to login */}
        <Route
          path="/channel"
          element={
            user
              ? <ChannelPage />
              : <Navigate to="/login" />
          }
        />

      </Routes>
    </>
  );
}


// ========================= MAIN APP COMPONENT =========================
function App() {

  return (

    // Enable React Router
    <BrowserRouter>

      {/* Provide authentication context globally */}
      <AuthProvider>

        {/* Render application routes */}
        <AppRoutes />

      </AuthProvider>

    </BrowserRouter>
  );
}


// Export main App component
export default App;