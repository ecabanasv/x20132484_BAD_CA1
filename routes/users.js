var express = require("express");
var router = express.Router();

// Require our controllers.
var user_controller = require("../controllers/usersController");

// Login router

router.get("/login", async function (req, res, next) {
  var token = req.cookies.token;
  var userName = null;
  try {
    userName = jwt.verify(token, "JournalJWT").username;
    res.render("home", { page: "Home", menuID: "home", name: userName  });
  } catch (error) {
    return res.render("login", { page: "Login", menuID: "login", name: null});
  }
});

router.post("/login", user_controller.user_login_post);

// Signup router

router.get("/signup", async function (req, res, next) {
  var token = req.cookies.token;
  var userName = null;
  try {
    userName = jwt.verify(token, "JournalJWT").username;
    res.render("home", { page: "Home", menuID: "home", name: userName  });
  } catch (error) {
    return res.render("signup", { page: "Signup", menuID: "signup", name: null});
  }
});

router.post("/signup", user_controller.user_signup_post);

module.exports = router;

// Logout router

router.get("/logout", function (req, res, next) {
  res.cookie("token", "", { maxAge: 0 });
  res.redirect("/login");
});
