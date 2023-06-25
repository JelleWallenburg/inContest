//show the competiiton with users' newest portoflio.
const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const Portfolio = require("../models/Portfolio.model");
const Competition = require("../models/Competition.model");
const User = require("../models/User.model");

router.get("/competition", isLoggedIn, (req, res, next) => {
  Competition.find()
    .then((allCompetition) => {
      res.render("competition/all-competitions", { allCompetition });
    })
    .catch((err) => console.log(err));
});

router.get("/competition/:competitionId",isLoggedIn, (req, res, next) => {
  const id = req.params.competitionId;
  Competition.findById(id)
    .populate({ path: "portfolio", populate: { path: "createdBy" } })
    .then((foundCompetition) => {
      console.log(foundCompetition.portfolio);
      const portfolio = foundCompetition.portfolio;
      res.render("competition/competition-detail", {
        foundCompetition,
        portfolio,
      });
    })
    .catch((err) => console.log(err));
});

router.get("/new-competition", isLoggedIn, (req, res, next) => {
  User.find()
    .then((allUsers) => {
      res.render("competition/new-competition", { allUsers });
    })
    .catch((err) => console.log(err));
});

router.post("/new-competition", isLoggedIn, (req, res, next) => {
  const { name, description, userGroup } = req.body;
  const currentUser = req.session.currentUser;
  const userGroupIds = userGroup.map((id) => new mongoose.Types.ObjectId(id));

  //mongoose push and set(push stuff into an array if its unique) method,
  Portfolio.aggregate([
    {
      $match: {
        createdBy: { $in: userGroupIds },
      },
    },
    {
      $sort: {
        referenceDate: -1,
      },
    },
    {
      $group: {
        _id: "$createdBy",
        latestReferenceDate: { $first: "$referenceDate" },
        portfolioId: { $first: "$_id" },
        totalAccount: { $first: "$totalAccount" },
        totalPortfolio: { $first: "$totalPortfolio" },
        totalResult: { $first: "$totalResult" },
        totalReturn: { $first: "$totalReturn" },
      },
    },
  ])
    .then((results) => {
      const portfolioIds = results.map((result) => result.portfolioId);
      Competition.create({
        name: name,
        competitionDescription: description,
        createdBy: currentUser._id,
        usersInGroup: userGroupIds,
        portfolio: portfolioIds,
      })
        .then(() => {
          res.redirect("/competition");
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
