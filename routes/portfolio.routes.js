const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const Performance = require("../models/Performance.model");

router.get("/", isLoggedIn,  (req, res, next) => {
  const currentUser = req.session.currentUser;
  console.log(currentUser);
  Performance.find({createdBy: currentUser._id})
  .then(performances => {
    res.render("portfolio/myportfolio", {
      user: currentUser,
      performances: performances
    })
    console.log(performances)
  });
});

// GET /portfolio/add-results
router.get("/add-result", isLoggedIn, (req, res, next) => {
  res.render("portfolio/add-result")
})

router.post("/add-result", isLoggedIn, (req, res, next) =>{
  const currentUser = req.session.currentUser;
  const {referenceDate, totalAccount, totalPortfolio, totalResult}=req.body;
  Performance.create({createdBy:currentUser._id,referenceDate: referenceDate, totalAccount:totalAccount, totalPortfolio:totalPortfolio, totalResult:totalResult})
  .then(
  res.redirect("/portfolio")
  )
  .catch(error=> {
    res.render("/add-result",{
      errorMessage:
      "Input is not valid",
      layout: false,
    });
    console.log(error)
  }); 
});

// GET //portfolio/update-results
router.get("/update-results", (req, res, next) => {
  res.render("portfolio/update-results")
}
)
module.exports = router;
