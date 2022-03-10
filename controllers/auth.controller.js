const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { omit } = require("lodash");
const Users = require("../models/user");
require("dotenv").config();

async function register(req, res) {
  try {
    const { username, password, firstName, lastName } = req.body;
    if (!username || !password) {
      res.status(400).json({
        error: "username and password are required",
      });
      return;
    }

    const existingUser = await Users.findOne({
      username,
    });

    const usernameExists = existingUser !== null;

    if (usernameExists) {
      res.status(409).json({
        error: "username already exists",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new Users({
      username,
      name: `${firstName} ${lastName}`,
      hashedPassword,
    });
    await user.save();

    res.status(201).json(omit(user.toObject(), ["hashedPassword", "__v"]));
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "something went wrong",
    });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({
        error: "username and password are required",
      });
      return;
    }

    const user = await Users.findOne({
      username,
    });

    if (!user) {
      res.status(401).json({
        error: "username is incorrect",
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isPasswordValid) {
      res.status(401).json({
        error: "password is incorrect",
      });
      return;
    }

    const token = await jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET);

    res.status(200).json({
      message: "login successful",
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "something went wrong",
    });
  }
}

module.exports = {
  register,
  login,
};
