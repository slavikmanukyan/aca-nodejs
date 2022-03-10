const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Users GET");
});

router.post("/", (req, res) => {
  console.log(req.body);
  res.send("Users POST");
});

router.get("/me", (req, res) => {
  res.send("Users GET /me");
});

module.exports = router;