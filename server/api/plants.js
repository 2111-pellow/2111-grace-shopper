const router = require('express').Router()
const Plant  = require('../db/models/Plant')

router.get('/:plantId', async (req, res, next) => {
  try {
    const plant = await Plant.findByPk(req.params.plantId)
    if (!plant){
      res.status(404).send("Sorry this plant does not exist!")
    } else {
    res.json(plant)
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
