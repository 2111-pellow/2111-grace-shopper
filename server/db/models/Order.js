const Sequelize = require("sequelize");
const db = require("../db");
// const User = require("./User");

const Order = db.define("order", {
  totalPrice: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  transactionComplete: {
    type: Sequelize.BOOLEAN,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      notEmpty: true,
    },
    defaultValue: 0,
  },
});

module.exports = Order;
