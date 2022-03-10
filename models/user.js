const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 50,
      minlength: 3,
    },
    username: {
      type: String,
      required: true,
      maxlength: 50,
      minlength: 3,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    birthdate: {
      type: Date,
    },
  },
  { collection: "users", timestamps: true }
);

UserSchema.virtual("fullName").get(function getVirtualFullName() {
  return `@${this.username} ${this.name}`;
});

UserSchema.index({ username: 1 }, { unique: true });

const Users = mongoose.model("Users", UserSchema);

module.exports = Users;
