const router = require("express").Router();
const Order = require("../db/models/Order");
const Plant = require("../db/models/Plant");
const User = require("../db/models/User");
const Order_Plant = require("../db");
const { requireToken } = require("../authMiddleware");


router.get("/:userId", async (req, res, next) => {
  try {
    const openOrder = await Order.findAll({
      where: { transactionComplete: false, userId: req.params.userId },
      include: Plant,
    });

    res.json(openOrder);
  } catch (error) {
    next(error);
  }
});


router.post("/:userId", async (req, res, next) => {
  try {
    const newOrder = await Order.findOrCreate({
      where: { transactionComplete: false, userId: req.params.userId },
      include: Plant,
    });
    const newPlant = await Plant.findOne({
      where: { id: req.body.plant_id },
    });
    let plantFound = false;
    let plantsArray = newOrder[0].plants;
    if (Array.isArray(plantsArray)) {
      for (let i = 0; i < plantsArray.length; i++) {
        if (plantsArray[i].id === req.body.plant_id) {
          plantFound = true;
          let [throughTable] = await newOrder[0].getPlants({
            id: req.body.plant_id,
          });
          throughTable.Order_Plant.quantity =
            Number(req.body.quantity);
          throughTable.Order_Plant.plant_price = newPlant.price;
          await throughTable.Order_Plant.save();
        }
      }
    }
    if (!plantFound) {
      let [throughTable] = await newOrder[0].addPlant(newPlant);

      throughTable.quantity = 1;
      throughTable.plant_price = newPlant.price;
      await throughTable.save();
    }
    const finalOrder = await Order.findOne({
      where: { transactionComplete: false, userId: req.params.userId },
      include: Plant,
    });

    res.send(finalOrder);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
