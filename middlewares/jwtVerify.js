const jwt = require("jsonwebtoken");
const Users = require("../models/user");
require("dotenv").config();

async function verifyJwt(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.status(401).json({
      error: "You must be logged in to access this resource",
    });
    return;
  }
  try {
    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await Users.findOne({
      username: decoded.username,
    });
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({
      error: "You must be logged in to access this resource",
    });
  }
}

module.exports = verifyJwt;
