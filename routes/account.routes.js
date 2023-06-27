const express = require("express");
const router = express.Router();

const User = require("../models/User.model");

// ********* require fileUploader in order to use it *********
const fileUploader = require("../config/cloudinary.config");

router.get("/", (req, res, next) => {
  User.findById(req.session.currentUser._id)
    .then((foundUser) => {
      res.render("auth/account", { foundUser });
    })
    .catch((err) => console.log(err));
});

router.post(
  "/edit",
  fileUploader.single("profile-picture"),
  (req, res, next) => {
    const { username, password, email } = req.body;

    User.findByIdAndUpdate(req.session.currentUser._id, {
      username: username,
      password: password,
      email: email,
      imageUrl: req.file.path,
    })
      .then(() => {
        req.session.currentUser.username = username;
        req.session.currentUser.password = password;
        res.redirect("/account");
      })
      .catch((err) => console.log(err));
  }
);

module.exports = router;
