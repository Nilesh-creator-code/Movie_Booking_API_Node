const movieController = require('../controllers/movie.controller')
const MovieMiddlewares = require('../middlewares/movie.middleware');


const routes = (app) => {
    //routes fucntion takes express object as parameter
    app.post('/mba/api/v1/movies',
    MovieMiddlewares.validateMovieCreateRequest,
    movieController.createMovie
    );

    app.delete(
        '/mba/api/v1/movies/:id',
        movieController.deleteMovie
    );

    app.get(
        '/mba/api/v1/movies/:id',
        movieController.getMovie
    )


}

module.exports = routes;