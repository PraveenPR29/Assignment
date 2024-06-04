const mongoose = require('mongoose');

const MovieListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    movies: [
        {
            imdbID: String,
            title: String,
            poster: String,
        },
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

module.exports = mongoose.model('MovieList', MovieListSchema);
