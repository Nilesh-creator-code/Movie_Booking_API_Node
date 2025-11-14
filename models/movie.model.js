const mongoose = require('mongoose')

// Define the schema of the movie resources to be stored in the db 

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        required: true
    },
    casts: {
        type: [String],
        require: true
    },
    trailerUrl: {
        type: "String",
        required: true
    },
    language: {
        type: [String],
        required: true,
        default: "English"
    },
    releaseDate: {
        type: String,
        require: true
    },
    director: {
        type: String,
        required: true
    },
    releaseStatus: {
        type: String,
        required: true,
        default: "RELEASED"
    }
}, {timestamps: true});

const Movie = mongoose.model('Movie', movieSchema);         //creates a new model

module.exports = Movie;     //returning the movie model