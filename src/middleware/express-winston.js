const expressWinston = require('express-winston');
const logger = require('../utils/logger');

const commonConfig = {
    winstonInstance: logger,
    headerBlacklist: ['authorization', 'cookie', 'set-cookie'],
    blacklistedBodyFields: ['password', 'confirmPassword', 'card_number'],
    requestWhitelist: ['headers', 'method', 'url', 'body'],
    // This ensures the ID is added to the JSON metadata of every log
    dynamicMeta: (req, res) => ({
        correlationId: req.correlationId
    })
}




const expressWinstonInfoLogger = expressWinston.logger({
    ...commonConfig,
    level: "info",
    msg: "INFO {{req.correlationId}} {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
    expressFormat: false, // Set to false to use your custom 'msg' format above

})



const expressWinstonErrorLogger = expressWinston.errorLogger({
    ...commonConfig,
    // The errorLogger also needs to know how to display the ID in its message
    msg: "ERROR {{req.correlationId}} {{req.method}} {{req.url}} - {{err.message}}"
});


module.exports = {
    expressWinstonErrorLogger,
    expressWinstonInfoLogger
};

