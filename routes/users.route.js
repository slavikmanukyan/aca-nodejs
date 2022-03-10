const { Router } = require("express");
const usersController = require("../controllers/users.controller");
const verifyJwt = require("../middlewares/jwtVerify");

const router = Router();

router.get("/", verifyJwt, usersController.getAllUsers);
router.get("/me", verifyJwt, usersController.getMe);
router.patch("/me", verifyJwt, usersController.updateMe);
router.delete("/me", verifyJwt, usersController.deleteMe);

router.post("/orders", verifyJwt, usersController.createOrder);

module.exports = router;
