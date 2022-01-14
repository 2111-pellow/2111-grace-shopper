const router = require("express").Router();
const Order = require("../db/models/Order");
const User = require('../db/models/User')

// GET: all plants
router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: {
        model: User
      }
    });
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.get("/:orderId", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId);
    if (!order) {
      res.status(404).send("Sorry this order does not exist!");
    } else {
      res.json(order);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
