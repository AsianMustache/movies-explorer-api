const { Joi } = require("celebrate");

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
const urlRegex = /^(https?:\/\/)(www\.)?([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+)#?$/;

const validation = {
  userSignUp: {
    body: Joi.object({
      email: Joi.string().pattern(emailRegex).required(),
      password: Joi.string().min(2).pattern(passwordRegex).required(),
    }),
  },
  userSignIn: {
    body: Joi.object({
      email: Joi.string().required().pattern(emailRegex),
      password: Joi.string().required().pattern(passwordRegex),
    }),
  },
  userUpdate: {
    body: Joi.object({
      email: Joi.string().pattern(emailRegex),
      name: Joi.string(),
    }),
  },
  movieIdParams: {
    params: Joi.object({
      movieId: Joi.string().required().hex().length(24),
    }),
  },
  movieFields: {
    body: Joi.object({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().pattern(urlRegex).required(),
      trailerLink: Joi.string().pattern(urlRegex).required(),
      thumbnail: Joi.string().pattern(urlRegex).required(),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  },
};

module.exports = {
  validation
};
