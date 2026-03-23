const {createLogger, format, transports} = require('winston')
require('winston-daily-rotate-file');

const {combine, json, timestamp, errors} = format




const logger = createLogger({
    transports: []
})

