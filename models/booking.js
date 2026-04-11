const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    guestName: { type: String, default: 'Guest User' }, // We will link real users later!
    totalPaid: { type: Number, required: true },
    status: { type: String, default: 'confirmed' }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);