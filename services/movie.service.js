const Movie = require('../models/movie.model');


const createMovie = async (data) => {
    const movie = await Movie.create(data);
    return movie;
}

const getMovieById = async (id) => {
    const movie = await Movie.findById(id);
    if (!movie) {
        return {
            err: "No movie found for the corresponding provider",
            code: 404
        }
    };
    return movie;
}

const deleteMovie = async (id) => {
    const response = Movie.deleteOne(id);
    return response;
}

module.exports = {
    getMovieById,
    createMovie,
    deleteMovie
}