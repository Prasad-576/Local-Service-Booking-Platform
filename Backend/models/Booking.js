import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String, // optional image proof / issue image
  },
  address: {
    type: String,
    required: true,
  },
  timeSlot: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

export default mongoose.model('Booking', bookingSchema);
