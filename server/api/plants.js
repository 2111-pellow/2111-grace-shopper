const router = require("express").Router();
const Plant = require("../db/models/Plant");

// GET: all plants
router.get("/", async (req, res, next) => {
  try {
    const plants = await Plant.findAll();
    res.json(plants);
  } catch (error) {
    next(error);
  }
});

router.get("/:plantId", async (req, res, next) => {
  try {
    const plant = await Plant.findByPk(req.params.plantId);
    if (!plant) {
      res.status(404).send("Sorry this plant does not exist!");
    } else {
      res.json(plant);
    }
  } catch (err) {
    next(err);
  }
});

//PUT api/plants/addPlant
router.post('/addPlant', async(req, res, next) => {
  try {
    const newPlant = await Plant.create(req.body);
    res.send(newPlant)
  } catch (error){
    next(error)
  }
})

// PUT /api/plants/editPlant/:plantId
router.put('/editPlant/:plantId', async (req, res, next) => {
  try {
    const plant = await Plant.findByPk(req.params.plantId);
    const updated = await plant.update(req.body)
    res.send(updated);
  } catch (error) {
    next(error);
  }
});

//DELETE /api/plants/:plantId
router.delete('/:plantId', async(req, res, next) => {
  try {
    const plant = await Plant.findByPk(req.params.plantId);
    await plant.destroy();
    res.send(plant);
  } catch (error){
    next(error)
  }
})

module.exports = router;
