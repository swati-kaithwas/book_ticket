var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var ticketRouter = require("./routes/ticket");
var movieRouter = require("./routes/movie");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/ticket", ticketRouter);
app.use("/movie",movieRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
mongoose
  .connect(
    "mongodb+srv://swatikaithwas:swati%4012122@cluster0.xqvlfdh.mongodb.net/futurefi?retryWrites=true&w=majority"
  )
  .then(() => console.log("mongoose is connected...."))
  .catch((error) => console.log("error", error));
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
// 
// Movie ticket booking application


// Customers should be able to book tickets for a specific time, (for example 2:00 PM). Facilitate a booking API that should 

// 1. Show booked seats that are unavailable 
// 2. Show available seats
// 3. At a particular time, one seat can be available to 10 people but when they try to book, only a single booking should be taken.

