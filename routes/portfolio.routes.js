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
    const ChartDataset= performances.map(performance => {
      return {totalReturn:performance.totalReturn, referenceDate:performance.referenceDate}
    })
    console.log('test1:', ChartDataset)
    
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
    if(oldObservation.length==0){
      console.log('create new observation')
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
      .then(res.render("portfolio/add-result", {errorMessage: "First results updated"}))
    } else {
      console.log("Reference observation", oldObservation[0].totalResult);
      let totalReturn= totalResult - oldObservation[0].totalResult;
      let percentageReturn= totalReturn/totalAccount;
      Portfolio.create({
        createdBy:currentUser._id,
        referenceDate: referenceDate, 
        totalAccount:totalAccount, 
        totalPortfolio:totalPortfolio, 
        totalResult:totalResult,
        totalReturn:totalReturn,
        percentageReturn: percentageReturn
      })
      .then(test => res.render("portfolio/add-result", {errorMessage: "Results updated"}))
      .catch(error => {
        console.log("error",error)
        res.render("portfolio/add-result", {
          errorMessage:
            "Results are not updated because an observation already exist."
        });
      });
    }
   
  })

});

// EDIT //{{id}}/edit
router.get("/:_id/edit", (req, res) => {
  console.log('req.params',req.params)
  Portfolio.findById(req.params)
  .then(result => {
    console.log("to be edited", result)
    res.render("portfolio/edit-result", result)})
})

// POST EDIT
router.post("/:_id/edit_result", (req,res) => {
  const currentUser = req.session.currentUser;
  console.log('current user id', currentUser._id, 'current Observation id', req.params._id);
  console.log('req.body', req.body);
  const {totalAccount, totalPortfolio, totalResult} = req.body;

  Portfolio.findById(req.params)
  .then(result => {
    console.log('date to be edited', result.referenceDate)
    Portfolio.find({createdBy:currentUser._id})
    .then(oldObservations => {
      // console.log("this is the oldestObservation", oldObservations[0].referenceDate.getTime())
      // console.log('date to be edited again', result.referenceDate.getTime())
      if(result.referenceDate.getTime() == oldObservations[0].referenceDate.getTime()){
        console.log("equal dates -> oldest")
        let totalReturn= 0;
        let percentageReturn= 0;
        Portfolio.findOneAndUpdate(req.params, {totalAccount: totalAccount, totalPortfolio:totalPortfolio, totalResult:totalResult, totalReturn:totalReturn, percentageReturn:percentageReturn})
        .then( result => {
          console.log(result)
          res.redirect("/")
        })
        .catch(error => console.log("there is an error, equal dates", error))
      } else {
        console.log("note equal")
        let totalReturn= totalResult - oldObservations[0].totalResult;
        let percentageReturn= totalReturn/totalAccount;
        Portfolio.findOneAndUpdate(req.params, {totalAccount: totalAccount, totalPortfolio:totalPortfolio, totalResult:totalResult, totalReturn:totalReturn, percentageReturn:percentageReturn})
        .then( result => {
        console.log(result)
        res.redirect("/")
        })
        .catch(error => console.log("there is an error, unequal dates", error))
      }
    })
  })
  .catch(error => console.log('nothing to edit', error))
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
// router.get("/update-results", (req, res, next) => {
//   res.render("portfolio/update-results");
// });

module.exports = router;
