const { response } = require("express");
const Movie = require("../models/movie.model");
const movieServices = require("../services/movie.service")
const { successResponseBody, errorResponseBody } = require('../utils/responseBody')

/**
 *
 * Controller function to create a new movie
 * @returns movie created
 */



const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    return res.status(201).json({
      success: true,
      error: {},
      data: movie,
      message: "Successfully created a new movie"
    })

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: true,
      error: err,
      data: {},
      message: "Something went wrong while creating a movie"
    });
  }
};


//Get all movies
const getAllMovie = async (req, res) => {
  try {
    const response = await movieServices.getAllMovie();

    if (response.err) {
      return res.status(response.code).json({
        success: false,
        error: response.err,
        data: {},
        message: response.err
      });
    }

    return res.status(200).json({
      success: true,
      error: null,
      data: response.data,
      message: "Movies fetched successfully"
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      error: err.message,
      data: {},
      message: "Something went wrong while fetching movies"
    });
  }
};


//Delete the movie
const deleteMovie = async (req, res) => {
  try {
    const response = await movieServices.deleteMovie(req.params.id);

    successResponseBody.data = response;
    successResponseBody.message = "Successfully deleted the movie ";
    return res.status(200).json(successResponseBody);

  } catch (err) {
    console.log(err);
    errorResponseBody.err = err;
    return res.status(500).json(errorResponseBody)
  }
};


// Getting movie by id
const getMovie = async (req, res) => {
  try {
    const movie = await movieServices.getMovieById(req.params.id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: movie
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message
    });
  }
};



const updateMovie = async (req, res) => {
  try {
    const response = await movieServices.updateMovie(req.params.id, req.body);

    // If service returned validation errors
    if (response.err) {
      return res.status(response.code || 422).json({
        success: false,
        message: "The update that we are trying to apply doesn't validate the schema ",

        errors: response.err
      });
    }

    // Success
    return res.status(200).json({
      success: true,
      data: response
    });

  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};


//get movie by name
const getMovies = async (req, res) => {
  try {
    const response = movieServices.fetchMovies(req.query);
    if (response.err) {
      errorResponseBody.err = response.err;
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response;
    return res.status(200).json(successResponseBody);

  } catch (error) {
    console.log(error);
    errorResponseBody.err = error;
    return res.status(500).json(errorResponseBody);
  }
}




module.exports = {
  getAllMovie,
  createMovie,
  deleteMovie,
  getMovie,
  updateMovie,
  getMovies
};
