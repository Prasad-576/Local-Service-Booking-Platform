const express = require('express');
const router = express.Router();
const { getUsers, deleteUser } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { role } = require('../middleware/roleMiddleware');

router.get('/users', protect, role('admin'), getUsers);
router.delete('/user/:id', protect, role('admin'), deleteUser);

module.exports = router;
