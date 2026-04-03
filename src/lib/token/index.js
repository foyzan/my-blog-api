const jwt = require("jsonwebtoken");
const { serverError } = require("../../utils/error");

// Configuration - Use environment variables in production!


const config = {
  secret: process.env.ACCESS_TOKEN_SECRET,
  accessExp: "3h", // Short life for security
  algorithm: "HS256",
};

const generateToken = ({
  payload,
  secret = config.secret,
  algorithm = config.algorithm,
  accessExp = config.accessExp,
}) => {
  if (!secret) {
    throw serverError("Secret key is missing in configuration");
  }
  try {
    return jwt.sign(payload, secret, {
      expiresIn: accessExp,
      algorithm,
    });
  } catch (error) {
    
    throw serverError("Internal server Error");
  }
};

const verifyToken = ({ token, secret = config.secret }) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
       throw badRequest("Token has expired");
    }
    // Log the actual error for the server, but give a clear hint to the user
    throw serverError("Internal server Error");
  }
};

const decodeToken = ({token}) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    
    throw serverError("Internal server Error");
  }
};

module.exports = {
    generateToken,
    verifyToken,
    decodeToken
}
