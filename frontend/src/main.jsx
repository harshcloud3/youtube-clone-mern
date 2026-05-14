// Import React
import React from 'react';

// Import React DOM
import ReactDOM from 'react-dom/client';

// Import main App component
import App from './App.jsx';

// Import global CSS styles
import './index.css';

// Import axios for API requests
import axios from 'axios';


// ========================= SET AUTH TOKEN =========================

// Get JWT token from localStorage
const token = localStorage.getItem('token');

// If token exists
if (token) {

  // Attach token in axios default headers
  axios.defaults.headers.common['Authorization'] =
    `Bearer ${token}`;
}


// ========================= RENDER APPLICATION =========================
ReactDOM.createRoot(
  document.getElementById('root')
).render(

  // Enable React Strict Mode
  <React.StrictMode>

    {/* Main App component */}
    <App />

  </React.StrictMode>
);