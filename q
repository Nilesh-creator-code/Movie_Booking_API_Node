[33mcommit 98fa1e1d226c7520a7de3e968beb2cf282ede79e[m[33m ([m[1;36mHEAD[m[33m -> [m[1;32mFeature_1_Movie_CRUD_API[m[33m, [m[1;31morigin/Feature_1_Movie_CRUD_API[m[33m)[m
Author: Nilesh-creator-code <nileshvishwakarma32142@gmail.com>
Date:   Tue Nov 18 17:46:16 2025 +0530

    Feat: Added get movie api with code segregation into services

[1mdiff --git a/controllers/movie.controller.js b/controllers/movie.controller.js[m
[1mindex b746271..931f6c6 100644[m
[1m--- a/controllers/movie.controller.js[m
[1m+++ b/controllers/movie.controller.js[m
[36m@@ -1,61 +1,65 @@[m
[31m-const Movie = require('../models/movie.model')[m
[31m-[m
[32m+[m[32mconst { response } = require("express");[m
[32m+[m[32mconst Movie = require("../models/movie.model");[m
[32m+[m[32mconst movieServices = require("../services/movie.service")[m
[32m+[m[32mconst { successResponseBody, errorresponseBody} = require('../utils/responseBody')[m
 [m
 /**[m
[31m- * [m
[31m- * Controller function to create a new movie [m
[31m- * @returns movie created [m
[32m+[m[32m *[m
[32m+[m[32m * Controller function to create a new movie[m
[32m+[m[32m * @returns movie created[m
  */[m
 [m
 [m
[31m-const createMovie = async (req, res) => {[m
[31m-    try {[m
[31m-        console.log("REQ BODY:", req.body);   // <-- DEBUG[m
[31m-[m
[31m-        const movie = await Movie.create(req.body);[m
[31m-        return res.status(201).json({[m
[31m-            success: true,[m
[31m-            error: [],[m
[31m-            data: movie,[m
[31m-            message: "Successfully created a new movie"[m
[31m-        })[m
[31m-    } catch (err){[m
[31m-        console.log(err);[m
[31m-        return res.status(500).json({[m
[31m-            success: true,[m
[31m-            error: err,[m
[31m-            data: {},[m
[31m-            message: 'something went wrong'[m
[31m-        });[m
[31m-    }[m
 [m
[31m-}[m
[32m+[m[32mconst createMovie = async (req, res) => {[m
[32m+[m[32m  try {[m
[32m+[m[32m    console.log("REQ BODY:", req.body); // <-- DEBUG[m
 [m
[32m+[m[32m    const movie = movieServices.createMovie(req.body)[m
[32m+[m[32m    successResponseBody.data = movie;[m
[32m+[m[32m    successResponseBody.message = "Successfully created the movie ";[m
[32m+[m[32m    return res.status(201).json(successResponseBody);[m
[32m+[m[41m    [m
[32m+[m[32m  } catch (err) {[m
[32m+[m[32m    console.log(err);[m
[32m+[m[32m    return res.status(500).json(errorresponseBody);[m
[32m+[m[32m  }[m
[32m+[m[32m};[m
 [m
[32m+[m[32m//Delete the movie[m
 const deleteMovie = async (req, res) => {[m
[31m-    try {[m
[31m-        const response = await Movie.deleteOne({[m
[31m-            _id: req.params.movieId[m
[31m-        });[m
[31m-        return res.status(200).json({[m
[31m-            success: true,[m
[31m-            error: {},[m
[31m-            message: "successfully deleted the movie ",[m
[31m-            data: response[m
[31m-        });[m
[31m-[m
[31m-    } catch(err) {[m
[31m-        console.log(err);[m
[31m-        return res.status(500).json({[m
[31m-            success: false,[m
[31m-            error: err,[m
[31m-            message: "Something went wrong",[m
[31m-            data: {}[m
[31m-        });[m
[32m+[m[32m  try {[m
[32m+[m[32m    const response = await movieServices.deleteMovie(req.params.id);[m
[32m+[m
[32m+[m[32m    successResponseBody.data = response;[m
[32m+[m[32m    successResponseBody.message = "Successfully deleted the movie ";[m
[32m+[m[32m    return res.status(200).json(successResponseBody);[m
[32m+[m
[32m+[m[32m  } catch (err) {[m
[32m+[m[32m    console.log(err);[m
[32m+[m[32m    return res.status(500).json(errorresponseBody)[m
[32m+[m[32m  }[m
[32m+[m[32m};[m
[32m+[m
[32m+[m[32m//Getting movie[m
[32m+[m[32mconst getMovie = async (req, res) => {[m
[32m+[m[32m  try {[m
[32m+[m[32m    const movie = await movieServices.findById(req.params.id);[m
[32m+[m[32m    if (response.err) {[m
[32m+[m[32m        errorresponseBody.err = response.err;[m
[32m+[m[32m        return res.status(response.statusCode).json(errorresponseBodyresponseBody);[m
     }[m
[31m-}[m
[32m+[m
[32m+[m[32m    successResponseBody.data = response;[m
[32m+[m[32m    return res.status(200).json(successResponseBody);[m
[32m+[m[32m  } catch (err) {[m
[32m+[m[32m    console.log(err);[m
[32m+[m[32m    return res.status(500).json(errorresponseBody);[m
[32m+[m[32m  }[m
[32m+[m[32m};[m
 [m
 module.exports = {[m
[31m-    createMovie,[m
[31m-    deleteMovie[m
[31m-}[m
\ No newline at end of file[m
[32m+[m[32m  createMovie,[m
[32m+[m[32m  deleteMovie,[m
[32m+[m[32m  getMovie,[m
[32m+[m[32m};[m
[1mdiff --git a/routes/movie.routes.js b/routes/movie.routes.js[m
[1mindex 5996b84..abb2c62 100644[m
[1m--- a/routes/movie.routes.js[m
[1m+++ b/routes/movie.routes.js[m
[36m@@ -1,4 +1,4 @@[m
[31m-const MovieController = require('../controllers/movie.controller')[m
[32m+[m[32mconst movieController = require('../controllers/movie.controller')[m
 const MovieMiddlewares = require('../middlewares/movie.middleware');[m
 [m
 [m
[36m@@ -6,13 +6,20 @@[m [mconst routes = (app) => {[m
     //routes fucntion takes express object as parameter[m
     app.post('/mba/api/v1/movies',[m
     MovieMiddlewares.validateMovieCreateRequest,[m
[31m-    MovieController.createMovie[m
[32m+[m[32m    movieController.createMovie[m
     );[m
 [m
     app.delete([m
[31m-        '/mba/api/v1/movies/:movieId',[m
[31m-        MovieController.deleteMovie[m
[32m+[m[32m        '/mba/api/v1/movies/:id',[m
[32m+[m[32m        movieController.deleteMovie[m
[32m+[m[32m    );[m
[32m+[m
[32m+[m[32m    app.get([m
[32m+[m[32m        '/mba/api/v1/movies/:id',[m
[32m+[m[32m        movieController.getMovie[m
     )[m
[32m+[m
[32m+[m
 }[m
 [m
 module.exports = routes;[m
\ No newline at end of file[m
[1mdiff --git a/services/movie.service.js b/services/movie.service.js[m
[1mnew file mode 100644[m
[1mindex 0000000..282a015[m
[1m--- /dev/null[m
[1m+++ b/services/movie.service.js[m
[36m@@ -0,0 +1,29 @@[m
[32m+[m[32mconst Movie = require('../models/movie.model');[m
[32m+[m
[32m+[m
[32m+[m[32mconst createMovie = async (data) => {[m
[32m+[m[32m    const movie = await Movie.create(data);[m
[32m+[m[32m    return movie;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32mconst getMovieById = async (id) => {[m
[32m+[m[32m    const movie = await Movie.findById(id);[m
[32m+[m[32m    if (!movie) {[m
[32m+[m[32m        return {[m
[32m+[m[32m            err: "No movie found for the corresponding provider",[m
[32m+[m[32m            code: 404[m
[32m+[m[32m        }[m
[32m+[m[32m    };[m
[32m+[m[32m    return movie;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32mconst deleteMovie = async (id) => {[m
[32m+[m[32m    const response = Movie.deleteOne(id);[m
[32m+[m[32m    return response;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32mmodule.exports = {[m
[32m+[m[32m    getMovieById,[m
[32m+[m[32m    createMovie,[m
[32m+[m[32m    deleteMovie[m
[32m+[m[32m}[m
\ No newline at end of file[m
[1mdiff --git a/utils/responseBody.js b/utils/responseBody.js[m
[1mnew file mode 100644[m
[1mindex 0000000..e4ffe66[m
[1m--- /dev/null[m
[1m+++ b/utils/responseBody.js[m
[36m@@ -0,0 +1,19 @@[m
[32m+[m
[32m+[m[32mconst errorresponseBody = {[m
[32m+[m[32m    err: {},[m
[32m+[m[32m    data: {},[m
[32m+[m[32m    message: "Somethings went wrong, cannot process the request",[m
[32m+[m[32m    success: false[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32mconst successResponseBody = {[m
[32m+[m[32m    err: {},[m
[32m+[m[32m    data: {},[m
[32m+[m[32m    message: "Successfully process the request..",[m
[32m+[m[32m    success: true[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32mmodule.exports = {[m
[32m+[m[32m    errorresponseBody,[m
[32m+[m[32m    successResponseBody[m
[32m+[m[32m}[m
\ No newline at end of file[m
