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
});

// const Order_Plant = db.define("Order_Plants", {
//   plant_price: { type: Sequelize.DECIMAL(4, 2) },
//   quantity: { type: Sequelize.INTEGER },
// });

module.exports = Order;
