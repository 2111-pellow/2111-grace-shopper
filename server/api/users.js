const router = require('express').Router()
const { models: { User, Plant }} = require('../db')
module.exports = router
const { requireToken, isAdmin } = require('../authMiddleware')


//GET: all users to api/users/
router.get('/',requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id','firstName', 'lastName', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

//GET: all users to api/users/:userId
router.get('/:userId', requireToken, async (req, res, next) => {
  try {
    if(req.params.userId != req.user.id){
      res.send('You dont have access!')
    }
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
    const { firstName, lastName, email, password } = req.body;
    const newUser = await User.create({ firstName, lastName, email, password });
    res.status(201).send(newUser)
  } catch (error){
    next(error)
  }
})

//Update a user to api/users/:userId
router.put('/:userId', requireToken, async (req, res, next) => {
  try {
    if(req.params.userId != req.user.id){
      res.send('You dont have access!')
    }
    const user = await User.findByPk(req.user.id);
    const updated = await user.update(req.body)
    res.send(updated);
  } catch (error) {
    next(error);
  }
});


