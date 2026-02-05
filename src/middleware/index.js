const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDoc = YAML.load("./swagger.yaml");
const OpenApiValidator = require("express-openapi-validator");
const cors = require('cors');
const authenticate = require("./authentication");




const applyMiddleware = (app) => {
  app.use(cors({}));
  app.use(express.json());
  app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
  app.use(
    OpenApiValidator.middleware({
      apiSpec: "./swagger.yaml",
    }),
  );

  app.use(authenticate);
  
};

module.exports = applyMiddleware;
