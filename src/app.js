
const express = require("express");
const applyMiddleware = require("./middleware");

const app = express();
applyMiddleware(app);

app.get("/health", function (req, res) {
  res.status(200).json({
    health: "OK",
    user: req.user,
  });
});

app.use((req, res, next) => {
  const error = new Error("Requested resource not found");
  error.status = 404;
  error.error = "Not Found";

  next(error);
});

app.use((err, req, res, next) => {
  // format error
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});




module.exports = app;