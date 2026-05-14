// Import Comment model
// Added comment management enhancements
import Comment from '../models/Comment.js';

// Import Video model
import Video from '../models/Video.js';


// ========================= ADD COMMENT =========================
export const addComment = async (req, res) => {
  try {

    // Get comment data from request body
    const { videoId, text } = req.body;

    // Check if video exists
    const video = await Video.findById(videoId);

    // If video not found
    if (!video)
      return res.status(404).json({
        message: 'Video not found'
      });

    // Create new comment
    const comment = new Comment({
      videoId,

      // Store logged-in user ID
      userId: req.userId,

      // Store username
      // Username is attached from frontend/auth middleware
      username: req.user.username,

      // Store comment text
      text
    });

    // Save comment in MongoDB
    await comment.save();

    // Send created comment response
    res.status(201).json(comment);

  } catch (err) {

    // Handle server errors
    res.status(500).json({
      message: err.message
    });

  }
};


// ========================= GET COMMENTS OF A VIDEO =========================
export const getCommentsByVideo = async (req, res) => {
  try {

    // Find all comments for a specific video
    const comments = await Comment.find({
      videoId: req.params.videoId
    }).sort({
      timestamp: -1
    });

    // Send comments list
    res.json(comments);

  } catch (err) {

    // Handle server errors
    res.status(500).json({
      message: err.message
    });

  }
};


// ========================= UPDATE COMMENT =========================
export const updateComment = async (req, res) => {
  try {

    // Find comment by ID
    const comment = await Comment.findById(
      req.params.id
    );

    // If comment not found
    if (!comment)
      return res.status(404).json({
        message: 'Comment not found'
      });

    // Check if logged-in user owns the comment
    if (comment.userId.toString() !== req.userId)
      return res.status(403).json({
        message: 'Not authorized'
      });

    // Update comment text
    comment.text = req.body.text;

    // Save updated comment
    await comment.save();

    // Send updated comment
    res.json(comment);

  } catch (err) {

    // Handle server errors
    res.status(500).json({
      message: err.message
    });

  }
};


// ========================= DELETE COMMENT =========================
export const deleteComment = async (req, res) => {
  try {

    // Find comment by ID
    const comment = await Comment.findById(
      req.params.id
    );

    // If comment not found
    if (!comment)
      return res.status(404).json({
        message: 'Comment not found'
      });

    // Check if logged-in user owns the comment
    if (comment.userId.toString() !== req.userId.toString())
      return res.status(403).json({
        message: 'Not authorized'
      });

    // Delete comment
    await comment.deleteOne();

    // Send success response
    res.json({
      message: 'Comment deleted'
    });

  } catch (err) {

    // Handle server errors
    res.status(500).json({
      message: err.message
    });

  }
};