const router = require("express").Router();
const { celebrate } = require("celebrate");
const { getUserInfo, updateProfile } = require("../controllers/users");
const { validation } = require("../utils/validation");

router.get("/me", getUserInfo);
router.patch("/me", celebrate(validation.userUpdate), updateProfile);

module.exports = router;
