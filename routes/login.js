const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const passport = require("passport");
const loginController = require("../controllers/loginController");

// Sign-up Route
router
  .route("/signup")
  .get(loginController.getSignupForm)
  .post(wrapAsync(loginController.signup));

// Log-in Route
router
  .route("/login")
  .get(loginController.getLoginForm)
  .post(
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    loginController.login
  );

// Log-out Route
router.get("/logout", loginController.logout);

module.exports = router;
