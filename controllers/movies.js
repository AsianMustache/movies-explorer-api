const http2 = require("http2");
const moviesModel = require("../models/movies");
const { NotFoundError, ForbiddenError } = require("../utils/errors");
const { errorsMessages } = require("../utils/errorsMessages");

exports.getMovies = (req, res, next) => {
  moviesModel
    .find({ owner: req.user._id })
    .then((movies) => res.status(http2.constants.HTTP_STATUS_OK).send(movies))
    .catch((err) => next(err));
};

exports.saveMovie = (req, res, next) => {
  console.log("Incoming request data:", req.body);
  console.log("User ID:", req.user ? req.user._id : "User not authenticated");

  moviesModel
    .create({ owner: req.user, ...req.body })
    .then((movie) => res.status(http2.constants.HTTP_STATUS_CREATED).send(movie))
    .catch((err) => next(err));
};

exports.removeMovie = (req, res, next) => {
  moviesModel
    .findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        return Promise.reject(
          new NotFoundError(errorsMessages.NOTFOUND_MOVIE_ID)
        );
      }
      if (!movie?.owner.equals(req.user._id)) {
        return Promise.reject(
          new ForbiddenError(errorsMessages.DELETE_MOVIE_ERROR)
        );
      }
      return moviesModel.findByIdAndDelete(req.params.movieId);
    })
    .then(() => res
      .status(http2.constants.HTTP_STATUS_OK)
      .send({ message: errorsMessages.DELETE_MOVIE_SUCCESS }))
    .catch(next);
};
