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

// router.get("/:orderId", async (req, res, next) => {
//   try {
//     const [orders, created] = await Order.findOrCreate({
//       // where: { transactionComplete: false, id: req.params.orderId },
//       where: { id: req.params.orderId },
//     });

//     console.log("this is created", created);
//     res.json(orders);
//   } catch (error) {
//     next(error);
//   }
// });

router.get("/:userId", async (req, res, next) => {
  try {
    const openOrder = await Order.findAll({
      where: { transactionComplete: false, userId: req.params.userId },
      // through table doenst directly interact so need to do plant
      include: Plant,
    });

    res.json(openOrder);
  } catch (error) {
    next(error);
  }
});

// grab the user id and update it using post???

router.post("/:userId", async (req, res, next) => {
  console.log("router post")
  try {
    const newOrder = await Order.findOrCreate({
      where: { transactionComplete: false, userId: req.params.userId },
      include: Plant,
    });
    console.log("req body", req.body)
    const newPlant = await Plant.findOne({
      where: { id: req.body.plant_id },
    });
    let plantFound = false;
    let plantsArray = newOrder[0].plants;
    if (Array.isArray(plantsArray)) {
      console.log("hellooooo");
      for (let i = 0; i < plantsArray.length; i++) {
        if (plantsArray[i].id === req.body.plant_id) {
          plantFound = true;
          let [throughTable] = await newOrder[0].getPlants({
            id: req.body.plant_id,
          });
          console.log("its meee");
          console.log("pleaseeee", throughTable.Order_Plant);
          // throughTable.quantity = 999;
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

      // console.log(Object.keys(brandNewOrder[0].__proto__));

      // res.json(orders);
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
// check to see if it is over the stock
// connect front end to back end

// GET: all orders w order_plant through table
// api/orders/plants
// router.get("/plants", async (req, res, next) => {
//   try {
//     const orders = await Order.findAll({
//       include: {
//         model: Plant,
//       },
//     });
//     res.json(orders);
//   } catch (error) {
//     next(error);
//   }
// });

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

// router.post("/:orderId", async (req, res, next) => {
//   try {
//     // let { totalPrice,
//     //   transactionComplete,
//     //   userId,
//     //   quantity,
//     //  } = req.body
//     const newOrder = await Order.findOrCreate(req.body);
//     // const newPlantInOrder = await Order.findOrCreate(req.body);
//     res.send(newOrder);
//     // res.send(newPlantInOrder);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
