const { check } = require("express-validator");
const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  forgotPassword,
  resetPassword,
} = require("../controller/users");

//sign-up => POST
router.post(
  "/sign-up",
  [
    check("name").isString().isLength({ min: 3, max: 30 }).trim(),
    check("email").isString().isLength({ min: 10, max: 40 }).trim(),
    check("password").isString().isLength({ min: 10, max: 30 }).trim(),
  ],
  createUser
);
//login => POST
router.post(
  "/login",
  [
    check("email").isString().isLength({ min: 10, max: 40 }).trim(),
    check("password").isString().isLength({ min: 3, max: 30 }).trim(),
  ],
  loginUser
);

//forgot password => POST
router.post(
  "/forgot-password",
  [check("email").isString().isLength({ min: 10, max: 40 }).trim()],
  forgotPassword
);

//reset password => PUT
router.put(
  "/reset-password",
  [
    check("email").isString().isLength({ min: 10, max: 40 }).trim(),
    check("password").isString().isLength({ min: 3, max: 30 }).trim(),
  ],
  resetPassword
);

module.exports = router;
