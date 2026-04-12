const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    hotelId: { type: String, required: true },
    hotelName: { type: String, required: true },
    nights: { type: Number, required: true },
    totalPaid: { type: Number, required: true },
    status: { type: String, default: 'Confirmed' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);