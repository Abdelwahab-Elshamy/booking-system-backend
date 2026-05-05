const router = require("express").Router();
const {
  register,
  login,
  createAdmin,
} = require("../controllers/auth.controller");
const {
  registerValidator,
  loginValidator,
} = require("../validators/auth.validator");
const validate = require("../middlewares/validate");
const verifyToken = require("../middlewares/verifyToken");
const isAdmin = require("../middlewares/isAdmin");

router.post("/register", registerValidator, validate, register);
router.post("/login", loginValidator, validate, login);
router.post("/create-admin", verifyToken, isAdmin, createAdmin);

module.exports = router;
