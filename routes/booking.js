const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const Room = require('../models/room');
const { verifyToken, isPartner, isSuperAdmin } = require('./authMiddleware');

// 🟢 PROCESS A NEW BOOKING
router.post('/checkout', verifyToken, async (req, res) => {
    try {
        const { roomId, totalPaid } = req.body;

        // 1. Create the official Booking Receipt
        const newBooking = new Booking({
            roomId: roomId,
            totalPaid: totalPaid
        });
        await newBooking.save();

        // 2. Lock the Room! (Change status from 'available' to 'booked')
        await Room.findByIdAndUpdate(roomId, { status: 'booked' });

        res.status(201).json({
            message: "Payment successful and room locked!",
            bookingId: newBooking._id
        });

    } catch (error) {
        res.status(500).json({ message: "Checkout failed", error: error.message });
    }
});

// 🟢 GET ALL BOOKINGS (The Ledger)
router.get('/', async (req, res) => {
    try {
        // This fetches all bookings and attaches the actual room name so it's easy to read!
        const bookings = await Booking.find().populate('roomId', 'name type pricePerNight');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching bookings", error: error.message });
    }
});
module.exports = router;