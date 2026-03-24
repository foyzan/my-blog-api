
const express = require("express");
const applyMiddleware = require("./middleware");
const router = require('./routes');
const {notFound}= require("./utils/error");
const { expressWinstonInfoLogger, expressWinstonErrorLogger } = require("./middleware/express-winston");
const correlationIdMiddleware = require("../../Logging System/src/middlewares/correlationIdMiddleware");

const app = express();

applyMiddleware(app);

app.use(correlationIdMiddleware)

app.use(expressWinstonInfoLogger)





app.use("/api/v1" , router)


app.get("/health", function (req, res) {
  res.status(200).json({
    health: "OK",
    user: req.user,
  });
});

app.use((_req, _res, next) => {
 
  const error = notFound("Requested resource not found")
  next(error);
});


app.use(expressWinstonErrorLogger)
app.use((err, _req, res, next) => {


  // format error
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});




module.exports = app;