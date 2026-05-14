// Import React hooks
// Improved login page accessibility
import { useState } from 'react';

// Import navigation and Link utilities
import {
  useNavigate,
  Link
} from 'react-router-dom';

// Import authentication context
import { useAuth } from '../context/AuthContext';


// ========================= LOGIN PAGE COMPONENT =========================
export default function Login() {

  // Store email input
  const [email, setEmail] = useState('');

  // Store password input
  const [password, setPassword] = useState('');

  // Store login error message
  const [error, setError] = useState('');

  // Get login function from auth context
  const { login } = useAuth();

  // React Router navigation
  const navigate = useNavigate();


  // ========================= HANDLE LOGIN =========================
  const handleSubmit = async (e) => {

    // Prevent page refresh
    e.preventDefault();

    try {

      // Attempt login
      await login(email, password);

      // Redirect to homepage after successful login
      navigate('/');

    } catch (err) {

      // Show backend error message
      setError(
        err.response?.data?.message ||
        'Login failed'
      );
    }
  };


  // ========================= COMPONENT UI =========================
  return (

    // Full screen centered layout
    <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-16">

      {/* Login form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >

        {/* Form title */}
        <h2 className="text-2xl mb-4">
          Sign In
        </h2>


        {/* Error message */}
        {error && (

          <p className="text-red-500">
            {error}
          </p>

        )}


        {/* Email input */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e =>
            setEmail(e.target.value)
          }
          className="w-full border p-2 mb-3"
          required
        />


        {/* Password input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e =>
            setPassword(e.target.value)
          }
          className="w-full border p-2 mb-4"
          required
        />


        {/* Login button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Login
        </button>


        {/* Register page link */}
        <p className="mt-3 text-center">

          No account?

          <Link
            to="/register"
            className="text-blue-600"
          >
            {' '}Register
          </Link>

        </p>

      </form>
    </div>
  );
}