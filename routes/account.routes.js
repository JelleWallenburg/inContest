const express = require("express");
const router = express.Router();

const User = require("../models/User.model");

router.get("/account", (req, res, next) => {
  User.findById(req.session.currentUser._id)
    .then((foundUser) => {
      res.render("auth/account", { foundUser });
    })
    .catch((err) => console.log(err));
});

router.post("/account/edit", (req, res, next) => {
  const { username, password, email } = req.body;
  User.findByIdAndUpdate(req.session.currentUser._id, {
    username: username,
    password: password,
    email: email,
  })
    .then(() => {
      req.session.currentUser.username = username;
      req.session.currentUser.password = password;
      res.redirect("/account");
    })
    .catch((err) => console.log(err));
});

module.exports = router;
