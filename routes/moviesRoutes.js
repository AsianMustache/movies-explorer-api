const router = require("express").Router();
const { celebrate } = require("celebrate");
const { getMovies, saveMovie, removeMovie } = require("../controllers/movies");
const { validation } = require("../utils/validation");

router.get("/", getMovies);
router.post("/", celebrate(validation.movieFields), saveMovie);
router.delete("/:movieId", celebrate(validation.movieIdParams), removeMovie);

module.exports = router;
