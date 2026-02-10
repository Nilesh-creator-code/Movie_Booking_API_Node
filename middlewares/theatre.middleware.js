const { errorResponseBody } = require('../utils/responseBody');

const validateTheatreCreateRequest = async (req, res, next) => {

    if (!req.body.name) {
        return res.status(400).json({
            ...errorResponseBody, // ⭐ NEW (clone)
            message: "The name of the theatre is not present in request" // ⭐ CHANGED
        });
    }

    if (!req.body.pincode) {
        return res.status(400).json({
            ...errorResponseBody, // ⭐ NEW
            message: "The pincode of the theatre is not present in request" // ⭐ CHANGED
        });
    }

    if (!req.body.city) {
        return res.status(400).json({
            ...errorResponseBody, // ⭐ NEW
            message: "The city name of the theatre is not present in request" // ⭐ CHANGED
        });
    }

    next();
};

module.exports = {
    validateTheatreCreateRequest
};
