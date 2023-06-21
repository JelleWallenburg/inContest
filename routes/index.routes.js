const express = require("express");
const router = express.Router();

const app = express();

// app.use(express.static('public'));
// const path = require('path');

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index", { layout: false });
});

module.exports = router;
