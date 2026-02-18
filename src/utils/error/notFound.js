const notFound = (msg = 'Resource not found') => {
    const error = new Error(msg);
    error.name = 'Not Found',
    error.status = 404;
    return error
}

module.exports = notFound;