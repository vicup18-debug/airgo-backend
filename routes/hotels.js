const express = require('express');
const Hotel = require('../models/hotel');
const router = express.Router();

// 🟢 GET ALL HOTELS (Your mobile app will call this for the Home Screen)
router.get('/', async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
    } catch (error) {
        res.status(500).json({ message: "Error fetching hotels", error });
    }
});

// 🟢 CREATE A NEW HOTEL (We'll use this to seed our database today)
router.post('/', async (req, res) => {
    try {
        const newHotel = new Hotel(req.body);
        const savedHotel = await newHotel.save();
        res.status(201).json(savedHotel);
    } catch (error) {
        res.status(500).json({ message: "Error creating hotel", error });
    }
});

module.exports = router;

// 🟢 GET A SINGLE HOTEL BY ID
router.get('/:id', async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) return res.status(404).json({ message: "Hotel not found" });
        res.status(200).json(hotel);
    } catch (error) {
        res.status(500).json({ message: "Error fetching hotel", error });
    }
});