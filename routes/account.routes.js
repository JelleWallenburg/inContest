const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;

const User = require("../models/User.model");
const isLoggedIn = require("../middleware/isLoggedIn");

// ********* require fileUploader in order to use it *********
const fileUploader = require("../config/cloudinary.config");

router.get("/", isLoggedIn, (req, res, next) => {
  User.findById(req.session.currentUser._id)
    .then((foundUser) => {
      res.render("auth/account", { foundUser });
    })
    .catch((err) => console.log(err));
});

router.post(
  "/edit",
  isLoggedIn,
  fileUploader.single("profile-picture"),
  (req, res, next) => {
    const { username, password, email } = req.body;
    let imagefile;
    if (!req.file) {
      imagefile = "images/outline_face_5_white_36dp.png";
    } else {
      imagefile = req.file.path;
    }
    bcrypt
      .genSalt(saltRounds)
      .then((salt) => {
        bcrypt.hash(password, salt);
      })
      .then((hashedPassword) => {
        return User.findByIdAndUpdate(req.session.currentUser._id, {
          username: username,
          password: hashedPassword,
          email: email,
          imageUrl: imagefile,
        });
      })
      .then(() => {
        res.redirect("/account");
      })
      .catch((err) => console.log(err));
  }
);

module.exports = router;
