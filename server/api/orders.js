const router = require("express").Router();
const Order = require("../db/models/Order");
const Plant = require("../db/models/Plant");
const User = require("../db/models/User");
const Order_Plant = require("../db");
const { requireToken } = require("../authMiddleware");

// router.get("/:userId", async (req, res, next) => {
//   try {
//     const cart = await Order.findOne({
//       where: {
//         userId: req.params.userId,
//         transactionComplete: false,
//       },
//     });
//     if (cart) {
//       const plants = await Order.findAll({
//         where: {
//           cartId: cart.id,
//         },
//       });
//       res.json(plants);
//     }
//   } catch (err) {
//     next(err);
//   }
// });

router.get("/:orderId", requireToken, async (req, res, next) => {
  try {
    const [orders, created] = await Order.findOrCreate({
      // where: { transactionComplete: false, id: req.params.orderId },
      where: { id: req.params.orderId },
    });

    console.log("user id?", req.user);

    console.log("this is order", orders);
    console.log("this is created", created);
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.post("/orders", async (req, res, next) => {
  try {
    // const orders = await Order.Create({
    //   where: { transactionComplete: false },
    // });
    const newOrder = await Order.create(req.body);
    // const newPlantInOrder = await Order.findOrCreate(req.body);
    res.send(newOrder);

    // res.json(orders);
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
        model: Plant,
      },
    });
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

// GET: get specific order w order_plant through table

// api/orders/:orderId
// router.get("/:orderId", async (req, res, next) => {
//   try {
//     console.log("hello world");
//     const orderId = req.params.orderId;
//     const order = await Order.findOne({
//       where: {
//         id: orderId,
//       },
//       include: {
//         model: Plant,
//       },
//     });
//     if (!order) {
//       res.status(404).send("Sorry this order does not exist!");
//     } else {
//       res.json(order);
//     }
//   } catch (err) {
//     next(err);
//   }
// });

// POST - create new
// PUT - insert, replace if already exist/ edit

router.post("/:orderId", async (req, res, next) => {
  try {
    // let { totalPrice,
    //   transactionComplete,
    //   userId,
    //   quantity,
    //  } = req.body
    const newOrder = await Order.findOrCreate(req.body);
    // const newPlantInOrder = await Order.findOrCreate(req.body);
    res.send(newOrder);
    // res.send(newPlantInOrder);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
