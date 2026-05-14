// Import Channel model
import Channel from '../models/Channel.js';

// Import User model
import User from '../models/User.js';


// ========================= CREATE CHANNEL =========================
export const createChannel = async (req, res) => {
  try {

    // Get channel data from request body
    const {
      channelName,
      description,
      channelBanner
    } = req.body;

    // Check if logged-in user already has a channel
    const existing = await Channel.findOne({
      owner: req.userId
    });

    // Prevent multiple channels for same user
    if (existing)
      return res.status(400).json({
        message: 'Channel already exists'
      });

    // Create new channel
    const channel = new Channel({
      channelName,
      owner: req.userId,
      description,
      channelBanner
    });

    // Save channel in MongoDB
    await channel.save();

    // Store channel ID inside user document
    await User.findByIdAndUpdate(
      req.userId,
      { channelId: channel._id }
    );

    // Send created channel response
    res.status(201).json(channel);

  } catch (err) {

    // Handle server errors
    res.status(500).json({
      message: err.message
    });

  }
};


// ========================= GET CHANNEL OF LOGGED-IN USER =========================
export const getChannelByOwner = async (req, res) => {
  try {

    // Find channel using logged-in user's ID
    const channel = await Channel.findOne({
      owner: req.userId
    });

    // If no channel exists
    if (!channel)
      return res.status(404).json({
        message: 'No channel found'
      });

    // Send channel data
    res.json(channel);

  } catch (err) {

    // Handle server errors
    res.status(500).json({
      message: err.message
    });

  }
};


// ========================= GET CHANNEL BY CHANNEL ID =========================
export const getChannelById = async (req, res) => {
  try {

    // Find channel using URL parameter ID
    const channel = await Channel.findById(
      req.params.id
    );

    // If channel not found
    if (!channel)
      return res.status(404).json({
        message: 'Channel not found'
      });

    // Send channel data
    res.json(channel);

  } catch (err) {

    // Handle server errors
    res.status(500).json({
      message: err.message
    });

  }
};