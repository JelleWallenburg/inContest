const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const Portfolio = require("../models/Portfolio.model");

router.get("/", isLoggedIn, (req, res, next) => {
  const currentUser = req.session.currentUser;
  console.log(currentUser);
  Portfolio.find({ createdBy: currentUser._id }).then((performances) => {
    res.render("portfolio/myportfolio", {
      user: currentUser,
      performances: performances,
    });
    console.log(performances);
  });
});

// GET /portfolio/add-results
router.get("/add-result", isLoggedIn, (req, res, next) => {
  res.render("portfolio/add-result");
});

router.post("/add-result", isLoggedIn, (req, res, next) => {
  const currentUser = req.session.currentUser;
  const { referenceDate, totalAccount, totalPortfolio, totalResult } = req.body;
  //query all the performances on the reference data and

  Portfolio.find({createdBy:currentUser._id, referenceDate: '2023-06-10T00:00:00.000Z'})
  .then(oldObservation => console.log("data", oldObservation));
  let totalReturn = 0;
  totalReturn= newObservation.totalResult - oldObservation.totalResult
  console.log("totalReturn", totalReturn)

  Portfolio.create({createdBy:currentUser._id,referenceDate: referenceDate, totalAccount:totalAccount, totalPortfolio:totalPortfolio, totalResult:totalResult})
  .then(newObservation =>{
    console.log("observation added")

    res.redirect("/portfolio")
    })
    .catch((error) => {
      console.log("observation already existing");
      res.redirect("/portfolio");
    });
});

// GET //portfolio/update-results
router.get("/update-results", (req, res, next) => {
  res.render("portfolio/update-results");
});

// Get //portfolio/all
router.get("/all", (req, res, next) => {
  Portfolio.find()
    .then((allPortfolio) => {
      console.log()
      res.render("portfolio/all-portfolio");

    })
    .catch((err) => console.log(err));
});

module.exports = router;
