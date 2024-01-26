require("dotenv").config();
const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../utils/errors");
const { errorsMessages } = require("../utils/errorsMessages");

const auth = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;
  const token = req.cookies.jwt;
  if (!token) {
    return next(new UnauthorizedError(errorsMessages.AUTH_ERROR));
  }

  try {
    const payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "dev-secret"
    );
    req.user = payload;
    next();
  } catch (err) {
    return next(new UnauthorizedError(errorsMessages.AUTH_ERROR));
  }
};

module.exports = auth;
