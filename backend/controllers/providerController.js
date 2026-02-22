const ProviderProfile = require('../models/ProviderProfile');
const User = require('../models/User');
const Booking = require('../models/Booking');

// @desc    Get all providers or filter by area
// @route   GET /api/providers
// @access  Public (or semi-public) // we'll make it Public
const getProviders = async (req, res) => {
    const { area } = req.query;

    try {
        const query = { role: 'provider' };
        if (area) {
            query.area = { $regex: area, $options: 'i' };
        }

        const providers = await User.find(query).select('-password');
        // For each provider, we can also fetch their profile
        const providersWithProfiles = await Promise.all(
            providers.map(async (provider) => {
                const profile = await ProviderProfile.findOne({ userId: provider._id });
                return { ...provider._doc, profile };
            })
        );

        res.json(providersWithProfiles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create provider profile
// @route   POST /api/providers/profile
// @access  Private/Provider
const createProfile = async (req, res) => {
    const { services, experience, avgCharge, description } = req.body;

    try {
        let profile = await ProviderProfile.findOne({ userId: req.user._id });

        if (profile) {
            return res.status(400).json({ message: 'Profile already exists' });
        }

        profile = await ProviderProfile.create({
            userId: req.user._id,
            services,
            experience,
            avgCharge,
            description,
        });

        res.status(201).json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update provider profile
// @route   PUT /api/providers/update
// @access  Private/Provider
const updateProfile = async (req, res) => {
    const { services, experience, avgCharge, description } = req.body;

    try {
        const profile = await ProviderProfile.findOne({ userId: req.user._id });

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        profile.services = services || profile.services;
        profile.experience = experience || profile.experience;
        profile.avgCharge = avgCharge || profile.avgCharge;
        profile.description = description || profile.description;

        const updatedProfile = await profile.save();
        res.json(updatedProfile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get provider bookings
// @route   GET /api/providers/my-bookings
// @access  Private/Provider
const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ providerId: req.user._id }).populate('userId', 'name email phone area');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProviders,
    createProfile,
    updateProfile,
    getMyBookings,
};
