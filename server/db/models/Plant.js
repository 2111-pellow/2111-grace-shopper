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
      "https://media.istockphoto.com/photos/monstera-in-a-pot-isolated-on-white-background-close-up-of-tropical-picture-id1278906674?b=1&k=20&m=1278906674&s=170667a&w=0&h=PRsEw9KpsggCTUEqH_DqgtEKRt884wAGfQCQTeS8xBY=",
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
