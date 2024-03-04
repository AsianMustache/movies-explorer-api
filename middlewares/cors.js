module.exports = function cors(req, res, next) {
  const allowedCors = [
    "https://praktikum.tk",
    "http://praktikum.tk",
    "http://localhost:3000",
    "http://localhost:3001",
    "https://api.nomoreparties.co/beatfilm-movies",
    "http://api.diplomafan.nomoredomainsmonster.ru",
    "http://diplomafan.nomoredomainsmonster.ru",
    "https://api.diplomafan.nomoredomainsmonster.ru",
    "https://diplomafan.nomoredomainsmonster.ru",
  ];

  const { origin } = req.headers;

  if (allowedCors.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", true);
  }

  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  next();
};
