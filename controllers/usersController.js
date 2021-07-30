var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var Users = require("../models/users.model");
User = mongoose.model("users");

// Signup (POST)
exports.user_signup_post = function (req, res, next) {
  bcrypt.hash(req.body.inputPassword, 10).then((hash) => {
    const user = new Users({
      username: req.body.inputUsername,
      hashed_password: hash,
      address: req.body.currentMetaAcc,
    });
    user
      .save()
      .then((response) => {
        res.status(201).redirect("/login");
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
        });
      });
  });
};

// Login (POST)
exports.user_login_post = function (req, res, next) {
  // Find username
  Users.findOne(
    {
      username: req.body.inputUsername,
    },
    function (err, user) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }

      if (!user || !user.comparePassword(req.body.inputPassword)) {
        return res.status(401).json({
          message: "Authentication failed. Invalid user or password.",
        });
      } else {
        var token = jwt.sign(
          {
            _id: user._id,
          },
          "JournalJWT",
          { expiresIn: "7d" }
        );
        res.cookie('token', token, {maxAge: 1000*60*60*24*7 })
        res.redirect("/");
      }
    }
  );
  //End Find username
};
