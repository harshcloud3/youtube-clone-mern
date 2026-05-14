// Improved backend server initialization
// Import Express framework
import express from 'express';

// Import mongoose for MongoDB connection
import mongoose from 'mongoose';

// Import CORS middleware
import cors from 'cors';

// Import dotenv for environment variables
import dotenv from 'dotenv';


// Import authentication routes
import authRoutes from './routes/auth.js';

// Import video routes
import videoRoutes from './routes/video.js';

// Import channel routes
import channelRoutes from './routes/channel.js';

// Import comment routes
import commentRoutes from './routes/comment.js';


// Load environment variables from .env file
dotenv.config();


// Create Express application
const app = express();


// ========================= MIDDLEWARE =========================

// Enable CORS for frontend-backend communication
app.use(cors());

// Parse incoming JSON data
app.use(express.json());


// ========================= API ROUTES =========================

// Authentication routes
app.use('/api/auth', authRoutes);

// Video routes
app.use('/api/videos', videoRoutes);

// Channel routes
app.use('/api/channels', channelRoutes);

// Comment routes
app.use('/api/comments', commentRoutes);


// ========================= DATABASE CONNECTION =========================
mongoose.connect(process.env.MONGO_URI)

  // If MongoDB connection successful
  .then(() => {

    console.log('MongoDB connected');

    // Start Express server
    app.listen(
      process.env.PORT,
      () =>
        console.log(
          `Server running on port ${process.env.PORT}`
        )
    );

  })

  // If MongoDB connection fails
  .catch(err => console.log(err));