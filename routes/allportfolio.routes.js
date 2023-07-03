const express = require("express");
const router = express.Router();

const isLoggedIn = require("../middleware/isLoggedIn");
const Portfolio = require("../models/Portfolio.model");
const User = require("../models/User.model");

router.get("/all-portfolio", (req, res, next) => {
  User.find().then((allUsers) => {
    res.render("all/all-portfolio", { allUsers });
  });
});

router.get("/all-portfolio/:userId", (req, res, next) => {
  const id = req.params.userId;
  Portfolio.find({ createdBy: id })
    .then((portfolios) => {
      if (portfolios.length == 0) {
        User.findById(id)
          .then((foundUser) => {
            res.render("all/individual-portfolio", {
              noRecords: true,
              foundUser,
            });
          })
          .catch((err) => console.log(err));
      } else {
        User.findById(id).then((foundUser) => {
          const allReferenceDate = portfolios.map((item) => item.referenceDate);
          const allPercentageReturn = portfolios.map(
            (item) => item.percentageReturn
          );
          res.render("all/individual-portfolio", {
            portfolios,
            foundUser,
            allReferenceDate: JSON.stringify(allReferenceDate),
            allPercentageReturn: JSON.stringify(allPercentageReturn),
            noRecords: false,
          });
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
