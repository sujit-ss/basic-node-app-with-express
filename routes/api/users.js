const express = require("express");
const router = express.Router();
const usersController = require("../../controller/usersController")

router.post("/signup",usersController.createNewUser)
router.post("/login",usersController.loginUser)

module.exports = router;