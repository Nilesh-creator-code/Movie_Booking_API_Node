const Movie = require('../models/movie.model');


const createMovie = async (data) => {
    const movie = await Movie.create(data);
    return movie;
}

const getAllMovie = async () => {
  const movies = await Movie.find({});

  if (movies.length === 0) {
    return {
      err: "No movies found",
      code: 404
    };
  }

  return {
    data: movies,
    code: 200
  };
};

module.exports = {
  getAllMovie
};


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

const updateMovie = async (id, data) => {
    try {
        const movie = await Movie.findByIdAndUpdate(id, data, { 
            new: true, 
            runValidators: true 
        });
        return movie;
    } catch (error) {
        if (error.name === 'ValidationError') {
            let errors = {};
            
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });

            console.log(errors);

            return {
                err: errors,
                code: 422
            };
        } else {
            throw error;
        }
    }
};

const fetchMovies = async (filter) => {
    let query = {};
    if (filter.name) {
        query.name = filter.name;
    }

    let movies = await Movie.find(query);
    if(!movies) {
        return {
            err: 'Not able to find queries movies',
            code: 404
        }
    }
    return movies;
}


const deleteMovie = async (id) => {
    const response = Movie.deleteOne(id);
    return response;
}

module.exports = {
    getAllMovie,
    getMovieById,
    createMovie,
    deleteMovie,
    updateMovie,
    fetchMovies
}