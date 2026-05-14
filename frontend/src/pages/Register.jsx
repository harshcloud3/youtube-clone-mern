// Import React hooks
// Enhanced registration form validation
import { useState } from 'react';

// Import navigation and Link utilities
import {
  useNavigate,
  Link
} from 'react-router-dom';

// Import authentication context
import { useAuth } from '../context/AuthContext';


// ========================= REGISTER PAGE COMPONENT =========================
export default function Register() {

  // Store username input
  const [username, setUsername] = useState('');

  // Store email input
  const [email, setEmail] = useState('');

  // Store password input
  const [password, setPassword] = useState('');

  // Store registration error message
  const [error, setError] = useState('');

  // Get register function from auth context
  const { register } = useAuth();

  // React Router navigation
  const navigate = useNavigate();


  // ========================= HANDLE REGISTER =========================
  const handleSubmit = async (e) => {

    // Prevent page refresh
    e.preventDefault();

    try {

      // Send register request
      await register(
        username,
        email,
        password
      );

      // Redirect to login page after successful registration
      navigate('/login');

    } catch (err) {

      // Show backend error message
      setError(
        err.response?.data?.message ||
        'Registration failed'
      );
    }
  };


  // ========================= COMPONENT UI =========================
  return (

    // Full screen centered layout
    <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-16">

      {/* Register form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96"
      >

        {/* Form title */}
        <h2 className="text-2xl mb-4">
          Register
        </h2>


        {/* Error message */}
        {error && (

          <p className="text-red-500">
            {error}
          </p>

        )}


        {/* Username input */}
        <input
  type="text"
  autoComplete="off"
          placeholder="Username"
          value={username}
          onChange={e =>
            setUsername(e.target.value)
          }
          className="w-full border p-2 mb-3"
          required
        />


        {/* Email input */}
        <input
          type="email"
           autoComplete="email"
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
           autoComplete="new-password"
          placeholder="Password"
          value={password}
          onChange={e =>
            setPassword(e.target.value)
          }
          className="w-full border p-2 mb-4"
          required
        />


        {/* Register button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Register
        </button>


        {/* Login page link */}
        <p className="mt-3 text-center">

          Already have an account?

          <Link
            to="/login"
            className="text-blue-600"
          >
            {' '}Login
          </Link>

        </p>

      </form>
    </div>
  );
}