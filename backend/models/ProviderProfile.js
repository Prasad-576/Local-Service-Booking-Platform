const mongoose = require('mongoose');

const providerProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    services: {
        type: [String],
        default: [],
    },
    experience: {
        type: String,
    },
    avgCharge: {
        type: Number,
    },
    description: {
        type: String,
    },
    rating: {
        type: Number,
        default: 0,
    },
    isApproved: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
});

const ProviderProfile = mongoose.model('ProviderProfile', providerProfileSchema);

module.exports = ProviderProfile;
