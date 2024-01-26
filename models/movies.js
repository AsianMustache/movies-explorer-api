const mongoose = require("mongoose");
const validator = require("validator");
const { validationsMessages } = require("../utils/errorsMessages");

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: {
      value: true,
      message: validationsMessages.FIELD_ERROR,
    },
  },
  director: {
    type: String,
    required: {
      value: true,
      message: validationsMessages.FIELD_ERROR,
    },
  },
  duration: {
    type: Number,
    required: {
      value: true,
      message: validationsMessages.FIELD_ERROR,
    },
  },
  year: {
    type: String,
    required: {
      value: true,
      message: validationsMessages.FIELD_ERROR,
    },
  },
  description: {
    type: String,
    required: {
      value: true,
      message: validationsMessages.FIELD_ERROR,
    },
  },
  image: {
    type: String,
    validate: {
      validator: (i) => validator.isURL(i),
      message: validationsMessages.URL_ERROR,
    },
    required: {
      value: true,
      message: validationsMessages.FIELD_ERROR,
    },
  },
  trailerLink: {
    type: String,
    validate: {
      validator: (i) => validator.isURL(i),
      message: validationsMessages.URL_ERROR,
    },
    required: {
      value: true,
      message: validationsMessages.FIELD_ERROR,
    },
  },
  thumbnail: {
    type: String,
    validate: {
      validator: (i) => validator.isURL(i),
      message: validationsMessages.URL_ERROR,
    },
    required: {
      value: true,
      message: validationsMessages.FIELD_ERROR,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: {
      value: true,
      message: validationsMessages.FIELD_ERROR,
    },
    ref: "User",
  },
  movieId: {
    type: Number,
    required: {
      value: true,
      message: validationsMessages.FIELD_ERROR,
    },
  },
  nameRU: {
    type: String,
    required: {
      value: true,
      message: validationsMessages.FIELD_ERROR,
    },
  },
  nameEN: {
    type: String,
    required: {
      value: true,
      message: validationsMessages.FIELD_ERROR,
    },
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
