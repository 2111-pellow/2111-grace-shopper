const router = require('express').Router()
const { models: { User, Plant }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: {
        model: Plant
      }
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    if (!user){
      res.status(404).send("Sorry this user does not exist!")
    } else {
    res.json(user)
    }
  } catch (err) {
    next(err)
  }
})
