// Import Express framework
import express from 'express';

// Import comment controller functions
import {
  addComment,
  getCommentsByVideo,
  updateComment,
  deleteComment
} from '../controllers/commentController.js';

// Import JWT authentication middleware
import { verifyToken } from '../middleware/auth.js';


// Create Express router
const router = express.Router();


// ========================= COMMENT ROUTES =========================
// Comment route optimization
// Add new comment
// Protected route
router.post(
  '/',
  verifyToken,
  addComment
);

// Get comments of a specific video
router.get(
  '/video/:videoId',
  getCommentsByVideo
);

// Update comment
// Protected route
router.put(
  '/:id',
  verifyToken,
  updateComment
);

// Delete comment
// Protected route
router.delete(
  '/:id',
  verifyToken,
  deleteComment
);


// Export comment router
export default router;