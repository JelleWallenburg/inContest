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
hbs.registerHelper("inc", function(value, options)
{
    return parseInt(value) + 1;
});

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const capitalize = require("./utils/capitalize");
const projectName = "inContest";

app.locals.appTitle = `${projectName} created with IronLauncher`;

app.locals.ViewSelected = [1, 2, 3, 4];

const User = require("./models/User.model");

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

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

app.use(function (req, res, next) {

    res.locals.imageUrl = req.session.currentUser.imageUrl;

  console.log(req.session.currentUser);
  next();
});

module.exports = app;
