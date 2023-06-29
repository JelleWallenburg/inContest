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

  Portfolio.find({createdBy:currentUser._id, referenceDate: '2023-01-01T00:00:00.000+00:00'})
  .then(oldObservation => {
    console.log("this is the output", oldObservation)
    // console.log("to add", currentUser._id, referenceDate, totalAccount, totalPortfolio, totalResult)
    // console.log("type of old observation", typeof oldObservation)
    // console.log("total223", test)
    if(oldObservation.length==0){
      console.log('create new one')
      let totalReturn= 0;
      let percentageReturn= 0;
      Portfolio.create({
        createdBy:currentUser._id,
        referenceDate: referenceDate, 
        totalAccount:totalAccount, 
        totalPortfolio:totalPortfolio, 
        totalResult:totalResult,
        totalReturn:totalReturn,
        percentageReturn: percentageReturn
      })
    } else {
      console.log("it works", oldObservation[0].totalResult);
      console.log("total result new observation", totalResult);
      let totalReturn= totalResult - oldObservation[0].totalResult;
      let percentageReturn= totalReturn/totalAccount;
      return Portfolio.create({
        createdBy:currentUser._id,
        referenceDate: referenceDate, 
        totalAccount:totalAccount, 
        totalPortfolio:totalPortfolio, 
        totalResult:totalResult,
        totalReturn:totalReturn,
        percentageReturn: percentageReturn})
    }
    res.render("portfolio/add-result",
      {errorMessage: "Results updated"})
  })
  .catch(error => {
    console.log("error",error)
    res.render("portfolio/add-result", {
      errorMessage:
        "Results are not updated because an observation already exist."
    });
  });
});

// EDIT //{{id}}/edit
router.get("/:_id/edit", (req, res) => {
  console.log('req.params',req.params)
  Portfolio.findById(req.params)
  .then(result => {
    console.log("to be edited", result)
    res.render("portfolio/edit-result", result)})
})

router.post("/:_id/edit_result", (req,res) => {
  const {totalAccount, totalPortfolio, totalResult} = req.body;
  console.log(totalAccount, totalPortfolio, totalResult);
  Portfolio.findOneAndUpdate(req.params, {totalAccount: totalAccount, totalPortfolio:totalPortfolio, totalResult:totalResult})
  .then( result => {
    console.log(result)
    res.redirect("/")
  })
  .catch(error => console.log("there is an error", error))
})

// DELETE //{{id}}/delete
router.post("/:_id/delete", (req,res) =>{
  console.log('meegezonden params',req.params)
  Portfolio.findByIdAndRemove(req.params)
  .then(
    res.redirect('/')
  )
});


// GET //portfolio/update-results
router.get("/update-results", (req, res, next) => {
  res.render("portfolio/update-results");
});

module.exports = router;
