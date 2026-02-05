
const express = require("express");
const applyMiddleware = require("./middleware");
const router = require('./routes')
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
  const error = new Error("Requested resource not found");
  error.status = 404;
  error.error = "Not Found";

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