const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const MovieList = require('../models/MovieList'); // Ensure this path is correct

// Create a new movie list
router.post('/list', verifyToken, async (req, res) => {
    try {
        const { name, isPublic, movies } = req.body;
        const userId = req.user.id; // Assuming req.user.id contains the authenticated user's ID

        if (!name || !movies || !Array.isArray(movies)) {
            return res.status(400).json({ msg: 'Invalid data' });
        }

        const newList = new MovieList({
            name,
            isPublic,
            movies,
            user: userId,
        });

        const savedList = await newList.save();
        res.json(savedList);
    } catch (error) {
        console.error('Error creating list:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
