/**
 * Middleware to validate movie create request
 */

const validateMovieCreateRequest = (req, res, next) => {
    const { name, description, duration, rating, cast, genre, language } = req.body;

    let errors = [];

    if (!name) errors.push("Movie name is required");
    if (!description) errors.push("Movie description is required");
    if (!duration) errors.push("Movie duration is required");
    if (!rating) errors.push("Movie rating is required");
    if (!cast) errors.push("Movie cast is required");
    if (!genre) errors.push("Movie genre is required");
    if (!language) errors.push("Movie language is required");

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            error: errors,
            data: {},
            message: "Invalid movie create request"
        });
    }

    next(); // continue to controller
};

module.exports = {
    validateMovieCreateRequest
};
