// Import mongoose package
import mongoose from 'mongoose';


// ========================= CHANNEL SCHEMA =========================
// Channel schema improvements
const channelSchema = new mongoose.Schema({

  // Channel name
  // Required field
  channelName: {
    type: String,
    required: true
  },

  // Store owner user ID
  // Reference to User collection
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Channel description/about section
  description: {
    type: String,
    default: ''
  },

  // Channel banner image URL
  channelBanner: {
    type: String,
    default: ''
  },

  // Subscribers count
  subscribers: {
    type: Number,
    default: 0
  }

});


// Export Channel model
export default mongoose.model(
  'Channel',
  channelSchema
);