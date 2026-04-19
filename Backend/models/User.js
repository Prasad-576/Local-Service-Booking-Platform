import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
    sparse: true, // sparse index avoids issues if googleId is null for standard users
  },
  role: {
    type: String,
    enum: ['user', 'provider'],
    default: 'user',
  },
  avatar: {
    type: String,
    default: null,
  },
  authProvider: {
    type: String,
    enum: ['google', 'local'],
    default: 'local',
  }
}, {
  timestamps: true,
});

export default mongoose.model('User', userSchema);
