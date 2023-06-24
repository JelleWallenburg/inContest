const express = require("express");
const router = express.Router();

const isLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect("/portfolio");
  }
  next();
};

/* GET home page */
router.get("/", isLoggedIn, (req, res, next) => {
  res.render("index", { layout: false });
});

module.exports = router;
