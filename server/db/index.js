//this is the access point for all things database related!

const db = require('./db')
const Plant = require('./models/Plant')
const User = require('./models/User')

User.belongsToMany(Plant, { through: 'cart' })

module.exports = {
  db,
  models: {
    User,
    Plant,
  },
}
