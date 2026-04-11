const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
    name: { type: String, required: true }, // 🟢 NEW: Added Name
    type: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    capacity: { type: String, required: true }, // 🟢 NEW: Added Capacity
    bed: { type: String, required: true }, // 🟢 NEW: Added Bed
    status: { type: String, default: 'available' },
    currentBooker: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);