// Import Express framework
import express from 'express';

// Import video controller functions
import {
  getVideos,
  getVideoById,
  uploadVideo,
  updateVideo,
  deleteVideo,
  likeVideo,
  dislikeVideo,
  getVideosByChannel
} from '../controllers/videoController.js';

// Import JWT authentication middleware
import { verifyToken } from '../middleware/auth.js';


// Create Express router
const router = express.Router();


// ========================= VIDEO ROUTES =========================

// Get all videos
router.get(
  '/',
  getVideos
);

// Get videos of a specific channel
router.get(
  '/channel/:channelId',
  getVideosByChannel
);

// Like a video
router.put(
  '/like/:id',
  likeVideo
);

// Dislike a video
router.put(
  '/dislike/:id',
  dislikeVideo
);

// Get single video by ID
router.get(
  '/:id',
  getVideoById
);

// Upload new video
// Protected route
router.post(
  '/',
  verifyToken,
  uploadVideo
);

// Update video
// Protected route
router.put(
  '/:id',
  verifyToken,
  updateVideo
);

// Delete video
// Protected route
router.delete(
  '/:id',
  verifyToken,
  deleteVideo
);


// Export video router
export default router;