const express = require('express');
const router = express.Router();
const {
    getProviders,
    createProfile,
    updateProfile,
    getMyBookings,
} = require('../controllers/providerController');
const { protect } = require('../middleware/authMiddleware');
const { role } = require('../middleware/roleMiddleware');

router.get('/', getProviders);
router.post('/profile', protect, role('provider'), createProfile);
router.put('/update', protect, role('provider'), updateProfile);
router.get('/my-bookings', protect, role('provider'), getMyBookings);

module.exports = router;
