const theatreService = require('../services/theatre.service');
const { successResponseBody, errorResponseBody } = require('../utils/responseBody');

const create = async (req, res) => {
    try {
        const response = await theatreService.createTheatre(req.body);

        if (response.err) {
            return res.status(response.code).json({
                ...errorResponseBody,
                err: response.err,
                message: "Validation failed on few parameters of the request body"
            });
        }

        return res.status(201).json({
            ...successResponseBody,
            data: response,
            message: "Successfully created the theatre"
        });

    } catch (error) {
        return res.status(500).json({
            ...errorResponseBody,
            err: error,
            message: "Internal Server Error"
        });
    }
};

module.exports = { create };
