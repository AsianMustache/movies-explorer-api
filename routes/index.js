const express = require("express");
const { celebrate } = require("celebrate");
const userRouter = require("./userRoutes");
const movieRouter = require("./moviesRoutes");
const { validation } = require("../utils/validation");
const { login, logout, createUser } = require("../controllers/users");
const { NotFoundError } = require("../utils/errorsMessages");
const auth = require("../middlewares/auth");
const { errorsMessages } = require("../utils/errorsMessages");

const router = express.Router();

router.post("/signup", celebrate(validation.userSignUp), createUser);
router.post("/signin", celebrate(validation.userSignIn), login);
router.post("/signout", auth, logout);

router.use("/users", auth, userRouter);
router.use("/movies", auth, movieRouter);

router.use("*", auth, (req, res, next) => next(new NotFoundError(errorsMessages.INCORRECT_ENDPOINT)));

module.exports = router;
