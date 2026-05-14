// Import Express framework
import express from 'express';

// Import channel controller functions
import {
  createChannel,
  getChannelByOwner,
  getChannelById
} from '../controllers/channelController.js';

// Import JWT authentication middleware
import { verifyToken } from '../middleware/auth.js';


// Create Express router
const router = express.Router();


// ========================= CHANNEL ROUTES =========================
// Channel route enhancements
// Create new channel
// Protected route
router.post(
  '/',
  verifyToken,
  createChannel
);

// Get logged-in user's channel
// Protected route
router.get(
  '/owner',
  verifyToken,
  getChannelByOwner
);

// Get channel by channel ID
router.get(
  '/:id',
  getChannelById
);


// Export channel router
export default router;