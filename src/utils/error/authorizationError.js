const authorizationError = (msg = 'Permission Denied') => {
    const error = new Error(msg);
    error.name = 'Authorization error',
    error.status = 403;
    return error
}

module.exports = authorizationError;