const Sequelize = require("sequelize");
const db = require("../db");

const Cart = db.define("cart", {
  totalPrice: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  transactionComplete: {
    type: Sequelize.BOOLEAN
  }
});

module.exports = Cart;
