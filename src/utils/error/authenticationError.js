const authenticationError = (msg = 'Authentication failed') => {
    const error = new Error(msg);
    error.name = 'Authentication error',
    error.status = 403;
    return error
}

module.exports = authenticationError;