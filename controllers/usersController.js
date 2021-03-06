let mongoose = require("mongoose");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
let Users = require("../models/users.model");

// Signup (POST)
exports.user_signup_post = function (req, res, next) {
  // Hash the inputPassword and then saved in MongoDB with rest of user fields (username & address)
  bcrypt.hash(req.body.inputPassword, 10).then((hash) => {
    const user = new Users({
      username: req.body.inputUsername,
      hashed_password: hash,
      address: req.body.currentMetaAcc,
    });
    user
      .save()
      .then((response) => {
        // if saved succesfully will go to login page
        res.status(201).redirect("/login");
      })
      // if not send to signup page
      .catch((error) => {
        res.render("signup", {
          page: "Signup",
          menuID: "signup",
          name: null,
          error: "Username or Metamask account already registered",
        });
      });
  });
};

// Login (POST)
exports.user_login_post = function (req, res, next) {
  // Find username in MongoDB
  Users.findOne(
    {
      username: req.body.inputUsername,
    },
    function (err, user) {
      if (user === null || err) {
        console.log(err);
        res.render("login", {
          page: "Login",
          menuID: "login",
          name: null,
          error: "Invalid username",
        });
        return;
      } else {
        // If user try to login with an different account that not belong to his Metamask address
        // It will be send it to home page again
        if (user.address != req.body.currentMetaAcc) {
          return res.redirect("/logout");
        }

        // Compare hashed password in MongoDB with inputPassword in form
        if (!user || !user.comparePassword(req.body.inputPassword)) {
          return res.render("login", {
            page: "Login",
            menuID: "login",
            name: null,
            error: "Invalid password",
          });
        } else {
          // Sign JWT token with ID, username and address for 7d days
          let token = jwt.sign(
            {
              _id: user._id,
              username: user.username,
              address: user.address,
            },
            "JournalJWT",
            { expiresIn: "7d" }
          );
          // Set cookie token with values signed in JWT
          res.cookie("token", token, { maxAge: 1000 * 60 * 60 * 24 * 7 });
          res.redirect("/list-entries");
        }
      }
    }
  );
};
