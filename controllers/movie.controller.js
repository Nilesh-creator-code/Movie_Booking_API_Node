const { response } = require("express");
const Movie = require("../models/movie.model");
const movieServices = require("../services/movie.service")
const { successResponseBody, errorresponseBody} = require('../utils/responseBody')

/**
 *
 * Controller function to create a new movie
 * @returns movie created
 */



const createMovie = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body); // <-- DEBUG

    const movie = movieServices.createMovie(req.body)
    successResponseBody.data = movie;
    successResponseBody.message = "Successfully created the movie ";
    return res.status(201).json(successResponseBody);
    
  } catch (err) {
    console.log(err);
    return res.status(500).json(errorresponseBody);
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
    return res.status(500).json(errorresponseBody)
  }
};

//Getting movie
const getMovie = async (req, res) => {
  try {
    const movie = await movieServices.findById(req.params.id);
    if (response.err) {
        errorresponseBody.err = response.err;
        return res.status(response.statusCode).json(errorresponseBodyresponseBody);
    }

    successResponseBody.data = response;
    return res.status(200).json(successResponseBody);
  } catch (err) {
    console.log(err);
    return res.status(500).json(errorresponseBody);
  }
};

module.exports = {
  createMovie,
  deleteMovie,
  getMovie,
};
