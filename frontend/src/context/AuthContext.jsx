// Import React hooks and context utilities
import {
  createContext,
  useState,
  useEffect,
  useContext
} from 'react';

// Import axios for API requests
import axios from 'axios';


// ========================= CREATE AUTH CONTEXT =========================
const AuthContext = createContext();


// ========================= AUTH PROVIDER COMPONENT =========================
export const AuthProvider = ({ children }) => {

  // Store logged-in user data
  const [user, setUser] = useState(null);

  // Store loading state while checking authentication
  const [loading, setLoading] = useState(true);


  // ========================= CHECK LOGIN ON PAGE REFRESH =========================
  useEffect(() => {

    // Get token from localStorage
    const token = localStorage.getItem('token');

    // Get user data from localStorage
    const userData = localStorage.getItem('user');

    // If token and user data exist
    if (token && userData) {

      // Attach token in axios headers
      axios.defaults.headers.common['Authorization'] =
        `Bearer ${token}`;

      // Restore user state
      setUser(JSON.parse(userData));
    }

    // Stop loading
    setLoading(false);

  }, []);


  // ========================= LOGIN FUNCTION =========================
  const login = async (email, password) => {

    // Send login request to backend
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/login`,
      {
        email,
        password
      }
    );

    // Store JWT token in localStorage
    localStorage.setItem(
      'token',
      res.data.token
    );

    // Store user data in localStorage
    localStorage.setItem(
      'user',
      JSON.stringify(res.data.user)
    );

    // Set token in axios headers
    axios.defaults.headers.common['Authorization'] =
      `Bearer ${res.data.token}`;

    // Update user state
    setUser(res.data.user);

    // Return backend response
    return res.data;
  };


  // ========================= REGISTER FUNCTION =========================
  const register = async (
    username,
    email,
    password
  ) => {

    // Send register request to backend
    await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/register`,
      {
        username,
        email,
        password
      }
    );
  };


  // ========================= LOGOUT FUNCTION =========================
  const logout = () => {

    // Remove token from localStorage
    localStorage.removeItem('token');

    // Remove user data from localStorage
    localStorage.removeItem('user');

    // Remove token from axios headers
    delete axios.defaults.headers.common['Authorization'];

    // Clear user state
    setUser(null);
  };


  // ========================= PROVIDE AUTH CONTEXT =========================
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading
      }}
    >

      {/* Render child components */}
      {children}

    </AuthContext.Provider>
  );
};


// ========================= CUSTOM AUTH HOOK =========================
export const useAuth = () =>
  useContext(AuthContext);