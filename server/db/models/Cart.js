const Sequelize = require("sequelize");
const db = require("../db");

const Cart = db.define("car", {
  plant_name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      "https://envato-shoebox-0.imgix.net/d82a/febe-b0fa-4a3a-9ea8-20abf252c53e/0604-coffee-1373.jpg?auto=compress%2Cformat&fit=max&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark2.png&markalign=center%2Cmiddle&markalpha=18&w=700&s=c9e1d1661bf88a92bf1d3bef64333be7",
  },

  price: {
    type: Sequelize.DECIMAL(4, 2),
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Cart;
