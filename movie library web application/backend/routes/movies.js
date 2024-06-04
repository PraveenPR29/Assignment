const express = require('express');
const axios = require('axios');
const auth = require('../middleware/auth');
const MovieList = require('../models/MovieLists');
const router = express.Router();

router.get('/search', async (req, res) => {
    try {
        const query = req.query.query;
        const response = await axios.get(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${query}`);
        res.json(response.data.Search);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).send('Server error');
    }
});

router.get('/mylists', auth, async (req, res) => {
    try {
        const lists = await MovieList.find({ user: req.user.id });
        res.json(lists);
    } catch (error) {
        console.error('Error fetching lists:', error);
        res.status(500).send('Server error');
    }
});

router.post('/list', auth, async (req, res) => {
    const { name, isPublic, movies } = req.body;

    try {
        const newList = new MovieList({
            name,
            isPublic,
            movies,
            user: req.user.id
        });

        const list = await newList.save();
        res.json(list);
    } catch (error) {
        console.error('Error creating list:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
