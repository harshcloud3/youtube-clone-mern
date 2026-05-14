// Import mongoose package
// User schema configuration improvements
import mongoose from 'mongoose';


// ========================= USER SCHEMA =========================
const userSchema = new mongoose.Schema({

  // Store unique username
  username: {
    type: String,
    required: true,
    unique: true
  },

  // Store unique email address
  email: {
    type: String,
    required: true,
    unique: true
  },

  // Store hashed password
  password: {
    type: String,
    required: true
  },

  // Store user's channel ID
  // Reference to Channel collection
  channelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Channel'
  }

});


// Export User model
export default mongoose.model(
  'User',
  userSchema
);