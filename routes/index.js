let express = require("express");
let router = express.Router();
let jwt = require("jsonwebtoken");
let Web3 = require("web3");
let moment = require("moment");
let contract = require("@truffle/contract");

// Provider 7545 (Ganache)
let provider = new Web3.providers.HttpProvider("http://localhost:7545");

// Get diaryList contract from build folder
const diaryListContract = require("../build/contracts/diaryList.json");

// Assign diaryList to variable DiaryList
let DiaryList = contract(diaryListContract);

// Set provider
DiaryList.setProvider(provider);

// Gas limit for transactions
let GAS_LIMIT = 1000000;

// Home - router
router.get("/", function (req, res, next) {
  // Get token value if exist
  let token = req.cookies.token;
  // Get name from JWT token if exist
  let userName = null;
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
  let token = req.cookies.token;
  // Get name from JWT token if exist
  let userName = null;
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
  // Assign JWT token to token (if exist)
  let token = req.cookies.token;
  // If token exist call function newEntry (DiaryList.sol)
  // And create new Diary entry
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
  res.redirect("/list-entries");
});

// List of entries - router
router.get("/list-entries", async (req, res, next) => {
  // Get token value if exist
  let token = req.cookies.token;
  // Empty array for user entries
  let userEntries = [];
  try {
    if (token === undefined) {
      res.redirect("/logout");
    } else {
      // Assign name & address from token
      let userName = jwt.verify(token, "JournalJWT").username;
      let userAddress = jwt.verify(token, "JournalJWT").address;

      console.log("userAddress: " + userAddress);

      let diaryList = await DiaryList.deployed();
      diaryEntries = await diaryList.showListEntries.call();
      for (let i = 0; i < diaryEntries.length; i++) {
        if (diaryEntries[i][5].toLowerCase() == userAddress.toLowerCase()) {
          userEntries.push(diaryEntries[i]);
        }
      }

      // Reverse order in array (Show latest items first)
      userEntries.reverse();

      res.render("list-entries", {
        page: "Diary entries",
        menuID: "list-entries",
        name: userName,
        entries: userEntries,
        moment: moment,
      });
    }
  } catch (err) {
    console.log("error");
    console.log(err);
    res.redirect("/logout");
  }
});

router.get("/edit", function (req, res, next) {
  // Get token value if exist
  let token = req.cookies.token;
  let userName = null;

  try {
    if (token) {
      // Assign name & address from token
      userName = jwt.verify(token, "JournalJWT").username;
      userAddress = jwt.verify(token, "JournalJWT").address;
    } else {
      res.redirect("/logout");
    }
  } catch (err) {
    console.log("error");
    console.log(err);
  }

  res.render("edit", {
    page: "Edit entry",
    menuID: "edit",
    entry_id: req.query.entry_id,
    entry_title: req.query.entry_title,
    entry_content: req.query.entry_content,
    name: userName,
  });
});

router.post("/edit", async (req, res, next) => {
  // Assign JWT token to token (if exist)
  let token = req.cookies.token;
  // Empty array for user entries
  let userEntries = [];
  // If token exist call function updateEntry (DiaryList.sol)
  // And update Diary entry
  try {
    if (token) {
      userName = jwt.verify(token, "JournalJWT").username;
      userAddress = jwt.verify(token, "JournalJWT").address;
      const diaryList = await DiaryList.deployed();
      await diaryList.updateEntry.sendTransaction(
        req.body.entry_id,
        req.body.inputTitle,
        req.body.inputContent,
        req.body.radioScore,
        {
          from: userAddress,
          gas: GAS_LIMIT,
        }
      );

      diaryEntries = await diaryList.showListEntries.call();
      for (let i = 0; i < diaryEntries.length; i++) {
        if (diaryEntries[i][5].toLowerCase() == userAddress.toLowerCase()) {
          userEntries.push(diaryEntries[i]);
        }
      }
    }
  } catch (err) {
    console.log(err);
  }

  // Reverse order in array (Show latest items first)
  userEntries.reverse();

  res.render("list-entries", {
    page: "Diary entries",
    menuID: "list-entries",
    name: userName,
    entries: userEntries,
    moment: moment,
  });
});

// FAQ - router
router.get("/instructions", function (req, res, next) {
  // Get token value if exist
  let token = req.cookies.token;
  // Get name from JWT token if exist
  let userName = null;
  // If token exists render page with name value (login name)
  // If token doesn't exist render normal page
  if (token) {
    userName = jwt.verify(token, "JournalJWT").username;
    res.render("instructions", {
      page: "Instructions",
      menuID: "instructions",
      name: userName,
    });
  } else {
    return res.render("instructions", {
      page: "Instructions",
      menuID: "instructions",
      name: null,
    });
  }
});

module.exports = router;
