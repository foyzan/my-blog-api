const jwt = require("jsonwebtoken");
const { serverError } = require("../../utils/error");

// Configuration - Use environment variables in production!


const config = {
  secret: process.env.ACCESS_TOKEN_SECRET || "my-secret",
  accessExp: "3h", // Short life for security
  algorithm: "HS256",
};

const generateToken = ({
  payload,
  secret = config.secret,
  algorithm = config.algorithm,
  accessExp = config.accessExp,
}) => {
  try {
    return jwt.sign(payload, secret, {
      expiresIn: accessExp,
      algorithm,
    });
  } catch (error) {
    console.log(error)
    throw serverError("Internal server Error");
  }
};

const verifyToken = ({ token, secret = config.secret }) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.log(error)
    throw serverError("Internal server Error");
  }
};

const decodeToken = ({token}) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    console.log(error)
    throw serverError("Internal server Error");
  }
};

module.exports = {
    generateToken,
    verifyToken,
    decodeToken
}
