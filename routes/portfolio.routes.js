const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/User.model");

router.get("/", (req, res, next) => {
  const anotherVari = req.session.currentUser;
  console.log(anotherVari);

  res.render("portfolio/myportfolio", {
    user: req.session.currentUser,
  });
});

module.exports = router;
