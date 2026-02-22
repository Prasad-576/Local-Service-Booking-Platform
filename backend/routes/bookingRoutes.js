const express = require('express');
const router = express.Router();
const {
    createBooking,
    getMyBookings,
    updateBookingStatus,
} = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');
const { role } = require('../middleware/roleMiddleware');

router.post('/', protect, role('user'), createBooking);
router.get('/my', protect, role('user'), getMyBookings);
router.patch('/:id/status', protect, role('provider'), updateBookingStatus);

module.exports = router;
