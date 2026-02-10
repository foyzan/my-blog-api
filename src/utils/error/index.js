const authenticationError = require("./authenticationError");
const authorizationError = require("./authorizationError");
const badRequest = require("./badRequest");
const notFound = require("./notFound");
const serverError = require("./serverError");


module.exports = {
    badRequest,
    notFound,
    serverError,
    authenticationError,
    authorizationError
}