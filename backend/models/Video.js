// Import mongoose package
import mongoose from 'mongoose';


// ========================= VIDEO SCHEMA =========================
const videoSchema = new mongoose.Schema({

  // Unique custom video ID
  videoId: {
    type: String,
    required: true,
    unique: true
  },

  // Video title
  title: {
    type: String,
    required: true
  },

  // Video description
  description: {
    type: String
  },

  // Thumbnail image URL
  thumbnailUrl: {
    type: String,
    required: true
  },

  // Video file/play URL
  videoUrl: {
    type: String,
    required: true
  },

  // Store channel ID
  // Reference to Channel collection
  channelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Channel',
    required: true
  },

  // Store uploader/channel name
  uploader: {
    type: String,
    required: true
  },

  // Total video views count
  views: {
    type: Number,
    default: 0
  },

  // Total likes count
  likes: {
    type: Number,
    default: 0
  },

  // Total dislikes count
  dislikes: {
    type: Number,
    default: 0
  },

  // Video category
  // Example: Music, Gaming, Education
  category: {
    type: String,
    required: true
  },

  // Video upload date/time
  uploadDate: {
    type: Date,
    default: Date.now
  }

});


// Export Video model
export default mongoose.model(
  'Video',
  videoSchema
);