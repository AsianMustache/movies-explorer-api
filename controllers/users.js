require("dotenv").config();
const http2 = require("http2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const {
  errorsMessages,
  validationsMessages,
} = require("../utils/errorsMessages");
const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  ConflictError,
} = require("../utils/errors");

exports.createUser = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    res.status(201).json({
      email: newUser.email,
      name: newUser.name,
    });
  } catch (err) {
    if (err.code === 11000) {
      next(new ConflictError(validationsMessages.DUPLICATE_EMAIL_ERROR));
    } else if (err.name === "ValidationError") {
      next(new BadRequestError(errorsMessages.USERUPDATE_BADREQUEST));
    } else {
      next(err);
    }
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).orFail(() => new NotFoundError(errorsMessages.USER_NOTFOUND));
    res.status(http2.constants.HTTP_STATUS_OK).json(updatedUser);
  } catch (err) {
    if (err.name === "ValidationError") {
      next(new BadRequestError(errorsMessages.USERUPDATE_BADREQUEST));
    } else {
      next(err);
    }
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { NODE_ENV, JWT_SECRET } = process.env;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new UnauthorizedError(errorsMessages.AUTH_ERROR);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedError(errorsMessages.AUTH_ERROR);
    }

    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
      {
        expiresIn: "7d",
      }
    );

    res.cookie("jwt", token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
      sameSite: true,
    });
    res
      .status(http2.constants.HTTP_STATUS_OK)
      .send({ token, email: user.email, id: user._id });
  } catch (err) {
    next(err);
  }
};

exports.logout = (req, res) => res.clearCookie("jwt").status(http2.constants.HTTP_STATUS_OK).end();

exports.getUserInfo = (req, res, next) => User.findById(req.user._id)
  .then((user) => res.status(http2.constants.HTTP_STATUS_OK).send(user))
  .catch(next);
