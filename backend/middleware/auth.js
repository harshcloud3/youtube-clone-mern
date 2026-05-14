// Import JWT package for token verification
// Middleware authentication enhancements
import jwt from 'jsonwebtoken';

// Import User model
import User from '../models/User.js';


// ========================= VERIFY JWT TOKEN MIDDLEWARE =========================
export const verifyToken = async (req, res, next) => {

  // Get token from Authorization header
  // Format: Bearer token
  const token = req.headers.authorization
    ?.split(' ')[1];

  // If token is missing
  if (!token)
    return res.status(401).json({
      message: 'Access denied'
    });

  try {

    // Verify JWT token using secret key
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Find user using decoded user ID
    // Exclude password field
    const user = await User.findById(
      decoded.userId
    ).select('-password');

    // If user not found
    if (!user)
      return res.status(401).json({
        message: 'User not found'
      });

    // Attach user ID to request object
    req.userId = user._id;

    // Attach full user object to request
    req.user = user;

    // Move to next middleware/controller
    next();

  } catch {

    // If token is invalid or expired
    res.status(401).json({
      message: 'Invalid token'
    });

  }
};