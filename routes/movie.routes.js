const MovieController = require('../controllers/movie.controller')

const routes = (app) => {
    //routes fucntion takes express object as parameter
    app.post('/mba/api/v1/movies', MovieController.createMovie);
}

module.exports = routes;