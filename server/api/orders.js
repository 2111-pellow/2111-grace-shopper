const router = require("express").Router();
const Order = require("../db/models/Order");
const Plant = require("../db/models/Plant");
const User = require('../db/models/User')

// GET: all orders w associated user
// api/orders
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

// GET: all orders w order_plant through table
// api/orders/plants
router.get("/plants", async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: {
        model: Plant
      }
    });
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

// GET: get specific order w order_plant through table

// api/orders/:orderId
router.get("/:orderId", async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findOne({
      where: {
        id: orderId
      },
      include: {
        model: Plant
      }
    });
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
