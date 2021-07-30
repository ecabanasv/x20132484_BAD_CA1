var express = require("express");
var router = express.Router();
var cookie = require("js-cookie");
var jwt = require('jsonwebtoken');

// Home - router
router.get("/", function (req, res, next) {
  res.render("index", { page: "Home", menuID: "home" });
});

// Ad new entry - router
router.get("/new-entry", async function (req, res, next) {
  var token = req.cookies.token;
  var username_id = null;
  try {
    username_id = jwt.verify(token, "JournalJWT")._id;
    console.log(username_id);
  } catch (error) {
    console.log(error);
    return res.redirect("/logout");
  }

  res.render("new-entry", { page: "New Entry", menuID: "new-entry" });
});

router.post("/new-entry", function (req, res, next) {});

// List of entries - router
router.get("/list-entries", function (req, res, next) {
  var token = req.cookies.token;
  var username_id = null;
  try {
    username_id = jwt.verify(token, "JournalJWT");
  } catch (error) {
    console.log(error);
    return res.redirect("/logout");
  }

  res.render("list-entries", {
    page: "List of entries",
    menuID: "list-entries",
  });
});

router.post("/list-entries", function (req, res, next) {});

// FAQ - router
router.get("/faq", function (req, res, next) {
  res.render("faq", { page: "FAQ", menuID: "faq" });
});

// Contact - router
router.get("/contact", function (req, res, next) {
  res.render("contact", { page: "Contact", menuID: "contact" });
});

module.exports = router;
