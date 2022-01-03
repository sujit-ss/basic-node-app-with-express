const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {createJWTToken} = require("../middleware/jwtAuthorization")
require("dotenv").config();
const usersDao = require("../dao/usersDao");
const {v4: uuid} = require("uuid");

const createNewUser = async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    res.status(400).json({ message: "User name and pasword is required!" });
    return;
  }
  const isExist = await usersDao.isUserExists(userName);
  if (isExist) {
    res.status(409).json({ message: `User '${userName}' already existed!` });
    return;
  }
  const encriptedPassword = await bcrypt.hash(password, 10);
  const newUser = { userId: uuid(), userName: userName, userPassword: encriptedPassword };
  usersDao
    .createNewUser(newUser)
    .then((response) => {
      res.status(200).json({ message: response });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};

const loginUser = async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    res.status(400).json({ message: "User name and pasword is required!" });
    return;
  }
  const user = await usersDao.isUserExists(userName);
  if (!user) {
    res.status(401).json({ message: `Invalid user name!` });
    return;
  }
  const authorized = await bcrypt.compare(password, user.userPassword);
  if (authorized) {
    res
      .status(200)
      .json({ message: "Logged in successfully!", token: createJWTToken({userId: user.userId}) });
  } else {
    res.status(401).json({ message: "Incorrect password!" });
  }
};

module.exports = { createNewUser, loginUser };
