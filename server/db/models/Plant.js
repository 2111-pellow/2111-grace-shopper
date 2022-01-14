const Sequelize = require("sequelize");
const db = require("../db");

const Plant = db.define("plant", {
  plant_name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      "https://envato-shoebox-0.imgix.net/d82a/febe-b0fa-4a3a-9ea8-20abf252c53e/0604-coffee-1373.jpg?auto=compress%2Cformat&fit=max&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark2.png&markalign=center%2Cmiddle&markalpha=18&w=700&s=c9e1d1661bf88a92bf1d3bef64333be7",
  },
  category: {
    type: Sequelize.STRING,
  },
  easeOfCare: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.DECIMAL(4, 2),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      notEmpty: true,
    },
    defaultValue: 25,
  },
});

module.exports = Plant;
