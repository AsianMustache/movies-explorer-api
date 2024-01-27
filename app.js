const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const router = require("./routes/index");
const errorHandler = require("./middlewares/centralErrors");
const { dataBase } = require("./utils/constants");
require("dotenv").config();

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect(dataBase, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Подключено к MongoDB"))
  .catch((err) => console.error("Ошибка подключения к MongoDB", err));

app.use(express.json());
app.use(cookieParser());

app.use(requestLogger);

app.use(router);

app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
