const serverError = (msg) => {
    const error = new Error(msg);
    error.name = 'Server error',
    error.status = 500;
    return error
}

module.exports = serverError;