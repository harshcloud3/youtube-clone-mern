// Import Express framework
import express from 'express';

// Import authentication controller functions
import {
  register,
  login
} from '../controllers/authController.js';


// Create Express router
const router = express.Router();


// ========================= AUTH ROUTES =========================

// Register new user
router.post('/register', register);

// Login existing user
router.post('/login', login);


// Export auth router
export default router;