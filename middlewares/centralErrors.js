const http2 = require("http2");
const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
} = require("../utils/errors");

const errorHandler = (err, req, res, _next) => {
  // Обработка ошибок валидации Joi
  if (err && err.isJoi) {
    return res.status(400).json({
      message: "Ошибка валидации данных",
      errors: err.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      })),
    });
  }
  // Обработка неверного токена
  if (err.name === "JsonWebTokenError") {
    return res
      .status(http2.constants.HTTP_STATUS_UNAUTHORIZED)
      .json({ message: "Некорректный токен" });
  }

  // Обработка кастомных ошибок
  if (
    err instanceof BadRequestError ||
    err instanceof NotFoundError ||
    err instanceof UnauthorizedError ||
    err instanceof ForbiddenError ||
    err instanceof ConflictError
  ) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  // По умолчанию возвращаем 500 ошибку
  res
    .status(500)
    .json({ message: err.message || "На сервере произошла ошибка" });
};

module.exports = errorHandler;
