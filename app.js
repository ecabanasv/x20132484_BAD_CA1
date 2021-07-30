var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const mongoose = require("mongoose");
require("dotenv").config();

// Routes
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

// Express
var app = express();

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Custom path for Bootstrap CSS & JS
app.use(
  "/cssb",
  express.static(__dirname + "/node_modules/bootstrap/dist/css")
);
app.use("/jsb", express.static(__dirname + "/node_modules/bootstrap/dist/js"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// MongoDB connection to MongoDB Atlas

mongoose
  .connect(process.env.MONGODB_ATLAS_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB has been connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/", indexRouter);
app.use("/", usersRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
