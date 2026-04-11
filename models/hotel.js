const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: {
        city: { type: String, required: true },
        address: { type: String, required: true }
    },
    amenities: [{ type: String }], // e.g., ["WiFi", "Pool", "Gym"]
    images: [{ type: String }], // We will store Cloudinary image URLs here later
    rating: { type: Number, default: 0 },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Links the hotel to an owner
}, { timestamps: true });

module.exports = mongoose.model('Hotel', hotelSchema);