import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/User.js';

const router = express.Router();

// JWT Secret - Normally stored in .env
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_change_me';

// @route   POST /api/auth/register
// @desc    Register a user or provider
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'user',
      authProvider: 'local'
    });

    await user.save();

    // Create payload and generate token
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: '7d' },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ 
          token, 
          user: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar, authProvider: user.authProvider } 
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // Create payload and generate token
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: '7d' },
      (err, token) => {
        if (err) throw err;
        res.json({ 
          token, 
          user: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar, authProvider: user.authProvider } 
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID || '899538466436-71jhpq7s1ub3kh0agit56feftssplo1a.apps.googleusercontent.com');

// @route   POST /api/auth/google
// @desc    Authenticate with Google
router.post('/google', async (req, res) => {
  try {
    const { token } = req.body;
    
    // Verify Google Token
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID || '899538466436-71jhpq7s1ub3kh0agit56feftssplo1a.apps.googleusercontent.com',
    });
    
    const payload = ticket.getPayload();
    const { email, name, sub: googleId, picture: avatar } = payload;

    // Check if user exists
    let user = await User.findOne({ email });
    
    if (!user) {
      // Create a user without a password if they don't exist
      user = new User({
        name,
        email,
        googleId,
        avatar,
        authProvider: 'google',
        role: 'user'
      });
      await user.save();
    } else {
      // Update avatar if provided and not previously set, or missing googleId linked
      if (!user.googleId) user.googleId = googleId;
      if (!user.avatar && avatar) user.avatar = avatar;
      if (user.authProvider === 'local') user.authProvider = 'google'; // convert to google or keep local if needed? Let's just track they linked it.
      await user.save();
    }

    // Create payload and generate JWT securely
    const jwtPayload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    jwt.sign(
      jwtPayload,
      JWT_SECRET,
      { expiresIn: '7d' },
      (err, jwtToken) => {
        if (err) throw err;
        res.json({ 
          token: jwtToken, 
          user: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar, authProvider: user.authProvider } 
        });
      }
    );
  } catch (err) {
    console.error('Google Auth Error:', err.message);
    res.status(401).json({ message: 'Google Authentication failed' });
  }
});

export default router;
