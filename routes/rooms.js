const express = require('express');
const Room = require('../models/room');
const router = express.Router();

// 🟢 GET ALL ROOMS (Can also be filtered by hotelId later)
router.get('/', async (req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: "Error fetching rooms", error });
    }
});

// 🟢 CREATE A NEW ROOM
router.post('/', async (req, res) => {
    try {
        const newRoom = new Room(req.body);
        const savedRoom = await newRoom.save();
        res.status(201).json(savedRoom);
    } catch (error) {
        res.status(500).json({ message: "Error creating room", error });
    }
});

// 🟢 GET ALL ROOMS FOR A SPECIFIC HOTEL
router.get('/hotel/:hotelId', async (req, res) => {
    console.log("Fetching rooms for hotelId:", req.params.hotelId);
    try {
        const rooms = await Room.find({ hotelId: req.params.hotelId });
        console.log("Found rooms:", rooms);
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: "Error fetching rooms", error });
    }
});

// 🟢 GET A SINGLE ROOM BY ID (For Checkout)
router.get('/:id', async (req, res) => {
    try {
        const room = await Room.findById(req.params.id).populate('hotelId', 'name');
        if (!room) return res.status(404).json({ message: "Room not found" });
        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({ message: "Error fetching room details", error: error.message });
    }
});
module.exports = router;