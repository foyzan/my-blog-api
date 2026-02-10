const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDoc = YAML.load("./swagger.yaml");
const OpenApiValidator = require("express-openapi-validator");
const cors = require('cors');
const morgan = require('morgan')




const applyMiddleware = (app) => {
  app.use(cors({}));
  app.use(express.json());
  app.use(morgan('dev'))
  app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
  app.use(
    OpenApiValidator.middleware({
      apiSpec: "./swagger.yaml",
    }),
  );

};

module.exports = applyMiddleware;
