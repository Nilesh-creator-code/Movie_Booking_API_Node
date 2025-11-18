const MovieController = require('../controllers/movie.controller')
const MovieMiddlewares = require('../middlewares/movie.middleware');


const routes = (app) => {
    //routes fucntion takes express object as parameter
    app.post('/mba/api/v1/movies',
    MovieMiddlewares.validateMovieCreateRequest,
    MovieController.createMovie
    );

    app.delete(
        '/mba/api/v1/movies/:movieId',
        MovieController.deleteMovie
    )
}

module.exports = routes;