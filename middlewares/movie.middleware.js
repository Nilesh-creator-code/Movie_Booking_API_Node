const badRequestResponse = {
    success: false,
    err: "",
    data: {},
    message: "Malformed Request | Bad Request"
}


const validateMovieCreateRequest = (req, res, next) => {

    //Validate the movie 
    if (!req.body.name) {
        badRequestResponse.err = "The movie is not present in the request";
        return res.status(400).json(badRequestResponse);
    }

    //Validate the movie description
    if (!req.body.description) {
        badRequestResponse.err = "The description of movie is not present in request";
        return res.status(400).json(badRequestResponse);
    }

    //validate the movie cast
    if (!req.body.casts) {
        badRequestResponse.err = "The cast of movie is not present in the request";
        return res.status(400).json(badRequestResponse);
    }


    //validate the movie cast
    if (
        !req.body.casts ||
        !Array.isArray(req.body.casts) ||
        req.body.casts.length <= 0
    ) {
        return res.status(400).json({
            success: false,
            error: "The cast of the movie is not present in the request",
            data: {}
        });
    }

    //validate the movie trailer url
    if(!req.body.trailerUrl) {
        badRequestResponse.err = "The trailerUrl of the movie is not present in the request";
        return res.status(400).json(badRequestResponse);
    }

    //validate the release the date of movie
    if(!req.body.releaseDate) {
        badRequestResponse.err = "The releaseDate of the movie is not present in the request";
        return res.status(400).json(badRequestResponse);
    }

    //Validate the director of movie
    if(!req.body.director) {
        badRequestResponse.err = "The director of the movie is not present in the request";
        return res.status(400).json(badRequestResponse);
    }



    //
    next();

};

module.exports = {
    validateMovieCreateRequest
};
