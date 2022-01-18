const router = require('express').Router()
const { models: { User, Plant }} = require('../db')
module.exports = router
const { requireToken, isAdmin } = require('../authMiddleware')

router.get('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', requireToken, async (req, res, next) => {
  try {
    console.log('server route')
    if(req.params.userId != req.user.id){
      res.send('You dont have access!')
    }
    const user = await User.findByPk(req.params.userId)
    console.log(user)
    if (!user){
      res.status(404).send("Sorry this user does not exist!")
    } else {
    res.json(user)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/:userId', async(req, res, next) => {
  try {
    const newPlant = await Plant.create(req.body);
    res.send(newPlant)
  } catch (error){
    next(error)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.plantId);
    const updated = await user.update(req.body)
    res.send(updated);
  } catch (error) {
    next(error);
  }
});
