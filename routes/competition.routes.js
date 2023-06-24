//show the competiiton with users' newest portoflio.
const express = require("express");
const router = express.Router();

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const Portfolio = require("../models/Portfolio.model");
const Competiion = require("../models/Competition.model");

router.get("/competition", isLoggedIn, (req, res, next) => {
  res.render("competition/all-competitions");
});

router.get("/new-competition", isLoggedIn, (req, res, next) => {
    res.render("competition/new-competition");
});

module.exports = router;