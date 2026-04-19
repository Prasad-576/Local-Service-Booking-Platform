import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  customService: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: [{
    type: String,
  }],
  category: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Service', serviceSchema);
