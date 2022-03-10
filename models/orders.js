const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    products: [{ name: { type: String } }],
  },
  { collection: "orders" }
);

module.exports = mongoose.model("Orders", OrderSchema);;
