
const express = require("express");
const applyMiddleware = require("./middleware");
const router = require('./routes');
const {notFound}= require("./utils/error");
const app = express();

applyMiddleware(app);


app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  next();
});

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

app.use((err, _req, res, next) => {

  console.log(err)
  // format error
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});




module.exports = app;