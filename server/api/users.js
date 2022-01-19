const router = require('express').Router()
const { models: { User, Plant }} = require('../db')
module.exports = router

//GET: all users to api/users/
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // include: {
      //   model: Plant
      // }
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

//GET: all users to api/users/:userId
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

//Add new user to api/users/
router.post('/', async(req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).send(newUser)
  } catch (error){
    next(error)
  }
})

//Update a user to api/users/:userId
router.put('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const updated = await user.update(req.body)
    res.send(updated);
  } catch (error) {
    next(error);
  }
});

//Delete a user to api/users/:userId
router.delet
