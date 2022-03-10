const Users = require("../models/user");
const Orders = require("../models/orders");

async function getAllUsers(req, res, next) {
  try {
    const users = await Users.find({}, "__id username name");
    res.json(users);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function getMe(req, res, next) {
  try {
    const user = await Users.findOne(
      {
        username: req.user.username,
      },
      "__id username name"
    );
    console.log(user.fullName);
    res.json(user);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function updateMe(req, res, next) {
  const { name } = req.body;
  try {
    await Users.updateOne({ username: req.user.username }, { $set: { name } });
    res.json({
      message: "User updated successfully",
    });
  } catch (err) {
    next(err);
  }
}

async function deleteMe(req, res, next) {
  try {
    await Users.deleteOne({ username: req.user.username });
    res.json({
      message: "User deleted successfully",
    });
  } catch (err) {
    next(err);
  }
}

async function createOrder(req, res, next) {
  try {
    const { products } = req.body;
    console.log(req.user)
    const order = new Orders({
      products,
      user: req.user._id,
    });
    await order.save();
    res.json({
      message: "Order created successfully",
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllUsers,
  getMe,
  updateMe,
  deleteMe,
  createOrder,
};
