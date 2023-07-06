// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

// customise helper for hbs, making the function to handle index counting from 1 instead of 0
hbs.registerHelper("add", function (valueA, valueB) {
  return valueA + valueB;
});

hbs.registerHelper("evaluate", function (valueA) {
  if (valueA == 0) {
    return false;
  } else {
    return true;
  }
});

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const capitalize = require("./utils/capitalize");
const projectName = "inContest";

app.locals.appTitle = `${projectName} - invest&compete`;

const User = require("./models/User.model");

//setting up the user profile picture and use the global variable: user to get access to the profile picture in layout.hbs
app.use(function (req, res, next) {
  if (
    req.session &&
    req.session.currentUser &&
    req.session.currentUser.imageUrl
  ) {
    res.locals.user = req.session.currentUser;
  }
  next();
});

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const accountRoutes = require("./routes/account.routes");
app.use("/account", accountRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const portfolioRoutes = require("./routes/portfolio.routes");
app.use("/portfolio", portfolioRoutes);

const competitionRotues = require("./routes/competition.routes");
app.use("/", competitionRotues);

const allportfolioRoutes = require("./routes/allportfolio.routes");
app.use("/", allportfolioRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
