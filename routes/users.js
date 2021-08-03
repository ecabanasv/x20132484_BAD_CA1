let express = require("express");
let router = express.Router();
let jwt = require("jsonwebtoken");

// Require userController (see it Controllers folder)
let user_controller = require("../controllers/usersController");

// Login router (GET)
router.get("/login", async function (req, res, next) {
  // Get token value if exist
  let token = req.cookies.token;
  // Get name from JWT token if exist
  let userName = null;
  // If token exists render page with name value (login name)
  // If token doesn't exist render normal page
  if (token) {
    userName = jwt.verify(token, "JournalJWT").username;
    res.render("index", { page: "Home", menuID: "home", name: userName });
  } else {
    return res.render("login", { page: "Login", menuID: "login", name: null });
  }
});

// Login router (POST) - See userController in Controllers folder
router.post("/login", user_controller.user_login_post);

// Signup router (GET)
router.get("/signup", async function (req, res, next) {
  // Get token value if exist
  let token = req.cookies.token;
  // Get name from JWT token if exist
  let userName = null;
  // If token exists render page with name value (login name)
  // If token doesn't exist render normal page
  if (token) {
    userName = jwt.verify(token, "JournalJWT").username;
    res.render("index", { page: "Home", menuID: "home", name: userName });
  } else {
    return res.render("signup", {
      page: "Signup",
      menuID: "signup",
      name: null,
    });
  }
});

// Signup router (POST) - See userController in Controllers folder
router.post("/signup", user_controller.user_signup_post);

// Logout router (GET)
router.get("/logout", function (req, res, next) {
  res.cookie("token", "", { maxAge: 0 });
  res.redirect("/");
});

module.exports = router;
