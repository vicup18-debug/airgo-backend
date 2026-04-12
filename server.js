const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();
const path = require('path');
const authRoutes = require('./routes/auth');
const hotelRoutes = require('./routes/hotels');
const roomRoutes = require('./routes/rooms');

// Initialize App
const app = express();
const server = http.createServer(app);

// Real-Time WebSockets Setup
const io = new Server(server, {
    cors: { origin: "*" } // We'll restrict this to your app later for security
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/api/rooms', require('./routes/rooms'));
app.use('/api/bookings', require('./routes/booking'));

// Test Route
app.get('/', (req, res) => {
    res.send('Hotel API is running perfectly!');
});

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hotel-booking')
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log("❌ DB Connection Error:", err));

// WebSocket Connection Check
io.on('connection', (socket) => {
    console.log('⚡ A user connected via WebSocket:', socket.id);

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the Server
const PORT = process.env.PORT || 5000;

const Booking = require('./models/bookings'); // Adjust path if needed

// 1. Save a new booking
app.post('/api/bookings', async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Get bookings for a specific user
app.get('/api/bookings/:userId', async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}); const Booking = require('./models/bookings'); // Adjust path if needed

// 1. Save a new booking
app.post('/api/bookings', async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Get bookings for a specific user
app.get('/api/bookings/:userId', async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Airgo T& Engine running on port ${PORT}`);
});