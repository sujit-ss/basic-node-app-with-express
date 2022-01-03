const express = require("express");
const router = express.Router();
const path = require("path");


router.get("/index(.html)?", (req, res) => {
  res.status(200).sendFile(path.join(__dirname ,"../views/index.html"));
});

router.get("/about(.html)?", (req, res) => {
  res.status(200).sendFile(path.join(__dirname ,"../views/about.html"));
});

module.exports = router;
