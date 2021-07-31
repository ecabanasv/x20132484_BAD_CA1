var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var Web3 = require("web3");
var contract = require("@truffle/contract");

// Provider 7545 (Ganache)
var provider = new Web3.providers.HttpProvider("http://localhost:7545");

// Get diaryList contract from build folder
const diaryListContract = require("../build/contracts/diaryList.json");

// Assign diaryList to variable DiaryList
var DiaryList = contract(diaryListContract);

// Set provider
DiaryList.setProvider(provider);

// Gas limit for transactions
var GAS_LIMIT = 1000000;

// Home - router
router.get("/", function (req, res, next) {
  // Get token value if exist
  var token = req.cookies.token;
  // Get name from JWT token if exist
  var userName = null;
  // If token exists render page with name value (login name)
  // If token doesn't exist render normal page
  if (token) {
    userName = jwt.verify(token, "JournalJWT").username;
    res.render("index", {
      page: "Home",
      menuID: "home",
      name: userName,
      access: 0,
    });
  } else {
    return res.render("index", {
      page: "Home",
      menuID: "home",
      name: null,
    });
  }
});

// Ad new entry - router
router.get("/new-entry", async function (req, res, next) {
  // Get token value if exist
  var token = req.cookies.token;
  // Get name from JWT token if exist
  var userName = null;
  // If token exists render page with name value (login name)
  // If token doesn't exist render normal page
  if (token) {
    userName = jwt.verify(token, "JournalJWT").username;
    res.render("new-entry", {
      page: "Add new entry",
      menuID: "new-entry",
      name: userName,
    });
  } else {
    return res.render("index", {
      page: "Home",
      menuID: "home",
      name: null,
    });
  }
});

router.post("/new-entry", async (req, res, next) => {

  var token = req.cookies.token;
  try {
    if (token) {
      userAddress = jwt.verify(token, "JournalJWT").address;
      const diaryList = await DiaryList.deployed();
      await diaryList.newEntry.sendTransaction(
        req.body.inputTitle,
        req.body.inputContent,
        req.body.radioScore,
        {
          from: userAddress,
          gas: GAS_LIMIT,
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
  res.redirect("new-entry");
});

// List of entries - router
router.get("/list-entries", function (req, res, next) {
  // Get token value if exist
  var token = req.cookies.token;
  var userName = null;
  if (token) {
    userName = jwt.verify(token, "JournalJWT").username;
    res.render("list-entries", {
      page: "List of Journal entries",
      menuID: "list-entries",
      name: userName,
    });
  } else {
    return res.render("index", { page: "Home", menuID: "home", name: null });
  }
});

router.post("/list-entries", function (req, res, next) {});

// FAQ - router
router.get("/faq", function (req, res, next) {
  // Get token value if exist
  var token = req.cookies.token;
  // Get name from JWT token if exist
  var userName = null;
  // If token exists render page with name value (login name)
  // If token doesn't exist render normal page
  if (token) {
    userName = jwt.verify(token, "JournalJWT").username;
    res.render("faq", { page: "FAQ", menuID: "faq", name: userName });
  } else {
    return res.render("faq", { page: "FAQ", menuID: "faq", name: null });
  }
});

// Contact - router
router.get("/contact", function (req, res, next) {
  // Get token value if exist
  var token = req.cookies.token;
  // Get name from JWT token if exist
  var userName = null;
  // If token exists render page with name value (login name)
  // If token doesn't exist render normal page
  if (token) {
    userName = jwt.verify(token, "JournalJWT").username;
    res.render("contact", {
      page: "Contact",
      menuID: "contact",
      name: userName,
    });
  } else {
    return res.render("contact", {
      page: "Contact",
      menuID: "contact",
      name: null,
    });
  }
});

module.exports = router;
