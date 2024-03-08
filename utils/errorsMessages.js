const errorsMessages = {
  INCORRECT_ENDPOINT: "Несуществующий адрес запроса",
  NOTFOUND_MOVIE_ID: "С таким ID нет фильма",
  DELETE_MOVIE_ERROR: "Невозможно удалить фильм другого пользователя",
  DELETE_MOVIE_SUCCESS: "Фильм удален",
  USER_NOTFOUND: "Запрашиваемый пользователь не найден",
  USERUPDATE_BADREQUEST: "Заполните правильно поля name и email",
  AUTH_REQUIRED: "Необходима авторизация",
  AUTH_ERROR: "Неправильные почта или пароль",
  SERVER_ERROR: "На сервере произошла ошибка",
};

const validationsMessages = {
  minLength: (length) => `Минимальная длина поля - ${length}`,
  maxLength: (length) => `Максимальная длина поля - ${length}`,
  FIELD_ERROR: "Поле обязательно для заполнения",
  URL_ERROR: "Неправильный адрес ссылки",
  EMAIL_ERROR: "Неправильный адрес почты",
  DUPLICATE_EMAIL_ERROR: "Такой адрес почты уже зарегистрирован",
};

module.exports = { errorsMessages, validationsMessages };
