const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const {
  errorsMessages,
  validationsMessages,
} = require("../utils/errorsMessages");
const { Errors } = require("../utils/errors");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: {
      value: true,
      message: validationsMessages.FIELD_ERROR,
    },
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: validationsMessages.EMAIL_ERROR,
    },
  },
  password: {
    type: String,
    required: {
      value: true,
      message: validationsMessages.FIELD_ERROR,
    },
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Errors(errorsMessages.AUTH_ERROR));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Errors(errorsMessages.AUTH_ERROR));
        }
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
