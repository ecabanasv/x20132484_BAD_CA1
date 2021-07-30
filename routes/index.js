var express = require("express");
var router = express.Router();
var cookie = require("js-cookie");
var jwt = require('jsonwebtoken');

// Home - router
router.get("/", function (req, res, next) {
  var token = req.cookies.token;
  var userName = null;
  try {
  userName = jwt.verify(token, "JournalJWT").username;
	res.render("index", { page: "Home", menuID: "home", name: userName });

  } catch (error) {
    return res.render("index", { page: "Home", menuID: "home", name: null});
  }
});

// Ad new entry - router
router.get("/new-entry", async function (req, res, next) {
  var token = req.cookies.token;
  var userName = null;
  try {
    userName = jwt.verify(token, "JournalJWT").username;
    res.render("new-entry", { page: "New Entry", menuID: "new-entry", name: userName  });
  } catch (error) {
    return res.render("index", { page: "Home", menuID: "home", name: null});
  }
});

router.post("/new-entry", function (req, res, next) {});

// List of entries - router
router.get("/list-entries", function (req, res, next) {
  var token = req.cookies.token;
  var userName = null;
  try {
    userName = jwt.verify(token, "JournalJWT").username;
    res.render("list-entries", { page: "List of entries", menuID: "list-entries", name: userName  });
  } catch (error) {
    return res.render("index", { page: "Home", menuID: "home", name: null});
  }
});

router.post("/list-entries", function (req, res, next) {});

// FAQ - router
router.get("/faq", function (req, res, next) {
  var token = req.cookies.token;
  var userName = null;
  // var metaAddress = null;
  try {
  userName = jwt.verify(req.cookies.token, "JournalJWT").username;
	res.render("faq", { page: "FAQ", menuID: "faq", name: userName});

  } catch (error) {
    res.render("faq", { page: "FAQ", menuID: "faq", name: null});
  }
});

// Contact - router
router.get("/contact", function (req, res, next) {
  var token = req.cookies.token;
  var userName = null;
  try {
    userName = jwt.verify(token, "JournalJWT").username;
    res.render("contact", { page: "Contact", menuID: "contact", name: userName  });
  } catch (error) {
    return res.render("contact", { page: "Contact", menuID: "contact", name: null});
  }
});

module.exports = router;
