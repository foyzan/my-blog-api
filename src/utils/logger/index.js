const {createLogger, format, transports} = require('winston')
require('winston-daily-rotate-file');
const path = require('path')
const {combine, json, timestamp, errors,  prettyPrint } = format
const { Logtail } = require("@logtail/node");
const { LogtailTransport } = require("@logtail/winston");

// Create a Logtail client
const logtail = new Logtail(process.env.SOURCE_TOKEN, {
  endpoint: `https://${process.env.INGESTING_HOST}`,
});


const consoleTransport = new transports.Console({
  level: 'info',
  format: combine(timestamp(), errors({ stack: true }), json(), prettyPrint())
})

const fileTransport = (level = 'info', filename = 'info') => {
  return new transports.DailyRotateFile({
    level: level,
    filename: path.join(process.cwd(), 'logs', level,`app-${filename}-%DATE%.log`), 
    datePattern: 'YYYY-MM-DD', // Rotates daily
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
  });
}

const errorFileTransport = fileTransport("error", "errors")
const infoFileTransport = fileTransport("info", "info")


const betterStackTransport = new LogtailTransport(logtail) 

const logger = createLogger({
  level: 'info',
  transports: [consoleTransport, errorFileTransport, infoFileTransport, betterStackTransport]
})


module.exports = logger
