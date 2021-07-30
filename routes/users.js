var express = require("express");
var router = express.Router();

// Require our controllers.
var user_controller = require("../controllers/usersController");

// Login router

router.get("/login", async function (req, res, next) {
  res.render("login", { page: "Login", menuID: "login" });
});

router.post("/login", user_controller.user_login_post);

// Signup router

router.get("/signup", async function (req, res, next) {
  res.render("signup", { page: "Signup", menuID: "signup" });
});

router.post("/signup", user_controller.user_signup_post);

module.exports = router;

// Logout router

router.get("/logout", function (req, res, next) {
  res.cookie("token", "", { maxAge: 0 });
  res.redirect("/login");
});
