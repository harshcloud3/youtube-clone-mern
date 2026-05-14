// Import Video model
// Enhanced API response handling
import Video from '../models/Video.js';

// Import Channel model
import Channel from '../models/Channel.js';

// Import Comment model
import Comment from '../models/Comment.js';


// ========================= GET ALL VIDEOS =========================
export const getVideos = async (req, res) => {
  try {

    // Fetch all videos sorted by latest upload
    const videos = await Video.find().sort({
      uploadDate: -1
    });

    // Send videos list
    res.json(videos);

  } catch (err) {

    // Handle server errors
    res.status(500).json({
      message: err.message
    });

  }
};


// ========================= GET SINGLE VIDEO BY ID =========================
export const getVideoById = async (req, res) => {
  try {

    // Find video using URL parameter ID
    const video = await Video.findById(
      req.params.id
    );

    // If video not found
    if (!video) {
      return res.status(404).json({
        message: 'Video not found'
      });
    }

    // Increase video views count
    video.views += 1;

    // Save updated views
    await video.save();

    // Fetch all comments of this video
    const comments = await Comment.find({
      videoId: video._id
    });

    // Send video data along with comments
    res.json({
      ...video.toObject(),
      comments
    });

  } catch (err) {

    // Handle server errors
    res.status(500).json({
      message: err.message
    });

  }
};


// ========================= UPLOAD VIDEO =========================
export const uploadVideo = async (req, res) => {
  try {

    // Get video data from request body
    const {
      videoId,
      title,
      description,
      thumbnailUrl,
      videoUrl,
      channelId,
      uploader,
      category
    } = req.body;

    // Find channel using channel ID
    const channel = await Channel.findById(
      channelId
    );

    // Check if logged-in user owns the channel
    if (
      !channel ||
      channel.owner.toString() !== req.userId.toString()
    ) {
      return res.status(403).json({
        message: 'Not authorized'
      });
    }

    // Create new video
    const video = new Video({
      videoId,
      title,
      description,
      thumbnailUrl,
      videoUrl,
      channelId,
      uploader,
      category
    });

    // Save video in MongoDB
    await video.save();

    // Send uploaded video response
    res.status(201).json(video);

  } catch (err) {

    // Handle server errors
    res.status(500).json({
      message: err.message
    });

  }
};


// ========================= UPDATE VIDEO =========================
export const updateVideo = async (req, res) => {
  try {

    // Find video by ID
    const video = await Video.findById(
      req.params.id
    );

    // If video not found
    if (!video)
      return res.status(404).json({
        message: 'Video not found'
      });

    // Find channel of the video
    const channel = await Channel.findById(
      video.channelId
    );

    // Check if logged-in user owns the channel
    if (
      channel.owner.toString() !== req.userId.toString()
    )
      return res.status(403).json({
        message: 'Not authorized'
      });

    // Get updated data from request body
    const {
      title,
      description,
      category
    } = req.body;

    // Update title if provided
    if (title)
      video.title = title;

    // Update description if provided
    if (description)
      video.description = description;

    // Update category if provided
    if (category)
      video.category = category;

    // Save updated video
    await video.save();

    // Send updated video response
    res.json(video);

  } catch (err) {

    // Handle server errors
    res.status(500).json({
      message: err.message
    });

  }
};


// ========================= DELETE VIDEO =========================
export const deleteVideo = async (req, res) => {
  try {

    // Find video by ID
    const video = await Video.findById(
      req.params.id
    );

    // If video not found
    if (!video)
      return res.status(404).json({
        message: 'Video not found'
      });

    // Find channel of the video
    const channel = await Channel.findById(
      video.channelId
    );

    // Check if logged-in user owns the channel
    if (
      channel.owner.toString() !== req.userId.toString()
    )
      return res.status(403).json({
        message: 'Not authorized'
      });

    // Delete video from database
    await video.deleteOne();

    // Send success response
    res.json({
      message: 'Video deleted'
    });

  } catch (err) {

    // Handle server errors
    res.status(500).json({
      message: err.message
    });

  }
};


// ========================= LIKE VIDEO =========================
export const likeVideo = async (req, res) => {
  try {

    // Find video by ID
    const video = await Video.findById(
      req.params.id
    );

    // If video not found
    if (!video)
      return res.status(404).json({
        message: 'Video not found'
      });

    // Increase like count
    video.likes += 1;

    // Save updated likes
    await video.save();

    // Send updated likes count
    res.json({
      likes: video.likes
    });

  } catch (err) {

    // Handle server errors
    res.status(500).json({
      message: err.message
    });

  }
};


// ========================= DISLIKE VIDEO =========================
export const dislikeVideo = async (req, res) => {
  try {

    // Find video by ID
    const video = await Video.findById(
      req.params.id
    );

    // If video not found
    if (!video)
      return res.status(404).json({
        message: 'Video not found'
      });

    // Increase dislike count
    video.dislikes += 1;

    // Save updated dislikes
    await video.save();

    // Send updated dislikes count
    res.json({
      dislikes: video.dislikes
    });

  } catch (err) {

    // Handle server errors
    res.status(500).json({
      message: err.message
    });

  }
};


// ========================= GET VIDEOS OF A CHANNEL =========================
export const getVideosByChannel = async (req, res) => {
  try {

    // Find all videos belonging to a channel
    const videos = await Video.find({
      channelId: req.params.channelId
    });

    // Send videos list
    res.json(videos);

  } catch (err) {

    // Handle server errors
    res.status(500).json({
      message: err.message
    });

  }
};