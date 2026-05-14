// Import mongoose package
import mongoose from 'mongoose';

// Import dotenv package for environment variables
import dotenv from 'dotenv';

// Import User model
import User from './models/User.js';

// Import Channel model
import Channel from './models/Channel.js';

// Import Video model
import Video from './models/Video.js';

// Import bcrypt for password hashing
import bcrypt from 'bcryptjs';


// Load environment variables from .env file
dotenv.config();


// ========================= DATABASE SEED FUNCTION =========================
const seed = async () => {

  // Connect MongoDB database
  await mongoose.connect(
    process.env.MONGO_URI
  );

  // Remove all existing users
  await User.deleteMany({});

  // Remove all existing channels
  await Channel.deleteMany({});

  // Remove all existing videos
  await Video.deleteMany({});


  // ========================= CREATE TEST USER =========================

  // Hash sample password
  const hashed = await bcrypt.hash(
    'test123',
    10
  );

  // Create sample user
  const user = new User({
    username: 'john_doe',
    email: 'john@example.com',
    password: hashed
  });

  // Save user in database
  await user.save();


  // ========================= CREATE SAMPLE CHANNEL =========================

  // Create sample channel
  const channel = new Channel({
    channelName: 'Code with John',
    owner: user._id,
    description: 'Coding tutorials'
  });

  // Save channel
  await channel.save();

  // Store channel ID inside user document
  user.channelId = channel._id;

  // Save updated user
  await user.save();


  // ========================= SAMPLE VIDEOS DATA =========================
  const videos = [

    {
      videoId: 'v1',
      title: 'Learn React in 30 Minutes',
      thumbnailUrl: 'https://picsum.photos/300/200?random=1',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      channelId: channel._id,
      uploader: 'john_doe',
      category: 'Education',
      description: 'React tutorial',
      views: 15200,
      likes: 1023,
      dislikes: 45
    },

    {
      videoId: 'v2',
      title: 'MongoDB Crash Course',
      thumbnailUrl: 'https://picsum.photos/300/200?random=2',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      channelId: channel._id,
      uploader: 'john_doe',
      category: 'Education',
      views: 8200,
      likes: 542,
      dislikes: 12
    },

    {
      videoId: 'v3',
      title: 'Express JS Tutorial',
      thumbnailUrl: 'https://picsum.photos/300/200?random=3',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      channelId: channel._id,
      uploader: 'john_doe',
      category: 'Education',
      views: 4300,
      likes: 311,
      dislikes: 8
    },

    {
      videoId: 'v4',
      title: 'Gaming Highlights',
      thumbnailUrl: 'https://picsum.photos/300/200?random=4',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      channelId: channel._id,
      uploader: 'john_doe',
      category: 'Gaming',
      views: 15000,
      likes: 2100,
      dislikes: 67
    },

    {
      videoId: 'v5',
      title: 'Music Mix 2025',
      thumbnailUrl: 'https://picsum.photos/300/200?random=5',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      channelId: channel._id,
      uploader: 'john_doe',
      category: 'Music',
      views: 87000,
      likes: 4200,
      dislikes: 230
    }

  ];


  // ========================= SAVE VIDEOS =========================

  // Loop through videos array
  for (let v of videos) {

    // Create video document
    const video = new Video(v);

    // Save video in database
    await video.save();
  }


  // ========================= SUCCESS MESSAGE =========================

  console.log('Database seeded!');

  // Exit process
  process.exit();
};


// Run seed function
seed();