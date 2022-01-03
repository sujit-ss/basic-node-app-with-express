const jwt = require("jsonwebtoken");
require("dotenv").config();

const createJWTToken = (key) => {
  return (accessToken = jwt.sign(key, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  }));
};

const jwtAuthorization = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.sendStatus(401); // forbidden
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
    if (error) {
      return res.sendStatus(403); //Invalid Token
    }
    console.log("active user : " + decoded.userId);
    req.userId = decoded.userId;
    next();
  });
};

module.exports = { jwtAuthorization, createJWTToken };
