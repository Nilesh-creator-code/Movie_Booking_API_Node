
const errorresponseBody = {
    err: {},
    data: {},
    message: "Somethings went wrong, cannot process the request",
    success: false
}

const successResponseBody = {
    err: {},
    data: {},
    message: "Successfully process the request..",
    success: true
}

module.exports = {
    errorresponseBody,
    successResponseBody
}