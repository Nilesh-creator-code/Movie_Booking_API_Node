const createErrorResponse = (err = {}) => ({
    err,
    data: {},
    message: "Something went wrong, cannot process the request",
    success: false
});

const createSuccessResponse = (data = {}) => ({
    err: {},
    data,
    message: "Successfully processed the request",
    success: true
});

module.exports = {
    createErrorResponse,
    createSuccessResponse
};
