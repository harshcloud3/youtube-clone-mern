// Import mongoose package
import mongoose from 'mongoose';


// ========================= COMMENT SCHEMA =========================
// Comment schema enhancements
const commentSchema = new mongoose.Schema({

  // Store video ID
  // Reference to Video collection
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video',
    required: true
  },

  // Store user ID of comment owner
  // Reference to User collection
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Store username of commenter
  username: {
    type: String,
    required: true
  },

  // Store comment text/message
  text: {
    type: String,
    required: true
  },

  // Store comment creation time
  timestamp: {
    type: Date,
    default: Date.now
  }

});


// Export Comment model
export default mongoose.model(
  'Comment',
  commentSchema
);