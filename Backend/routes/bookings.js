import express from 'express';
import Booking from '../models/Booking.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// 1. CREATE BOOKING
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { userId, providerId, serviceId, description, address, timeSlot } = req.body;
    
    let imageUrl = null;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const newBooking = new Booking({
      userId,
      providerId,
      serviceId, // Optional reference for specific details
      description,
      address,
      timeSlot,
      image: imageUrl,
      status: 'pending' // default
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create booking', error: err.message });
  }
});

// 2. GET BOOKINGS FOR A SPECIFIC PROVIDER
router.get('/provider/:providerId', async (req, res) => {
  try {
    // Populate user to get customer name
    const bookings = await Booking.find({ providerId: req.params.providerId })
      .populate('userId', 'name email avatar')
      .populate('serviceId', 'title')
      .sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
});

// 3. GET BOOKINGS FOR A SPECIFIC USER
router.get('/user/:userId', async (req, res) => {
    try {
      const bookings = await Booking.find({ userId: req.params.userId })
        .populate('providerId', 'name')
        .populate('serviceId', 'title')
        .sort({ createdAt: -1 });
      res.status(200).json(bookings);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch user bookings' });
    }
  });

// 4. UPDATE BOOKING STATUS (Accept/Reject/Completed)
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'accepted', 'rejected', 'completed'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true } // Return updated doc
    );

    res.status(200).json(updatedBooking);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update booking status' });
  }
});

export default router;
