//this is the access point for all things database related!
const Sequelize = require("sequelize");
const db = require("./db");
const Plant = require("./models/Plant");
const User = require("./models/User");
const Order = require("./models/Order");

// User.belongsTo(Order);
// Order.hasMany(User);
User.hasMany(Order);
Order.belongsTo(User);

const Order_Plant = db.define("Order_Plant", {
  plant_price: { type: Sequelize.DECIMAL(4, 2) },
  quantity: { type: Sequelize.INTEGER },
});

Plant.belongsToMany(Order, { through: Order_Plant });
Order.belongsToMany(Plant, { through: Order_Plant });

module.exports = {
  db,
  models: {
    User,
    Plant,
    Order,
    Order_Plant,
  },
};
