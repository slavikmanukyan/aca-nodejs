const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("test", "newuser", "password", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;