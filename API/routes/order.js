const Order = require("../models/Order");
const {
  verifyToken,
  verifyTokenAuthorization,
  verifyTokenAdmin,
} = require("./verifyToken");
const moment = require("moment");
const { auth, isUser, isAdmin } = require("../middleware/auth");

const router = require("express").Router();

//CREATE

router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE ORDER
router.put("/:id", isAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updatedOrder);
  } catch (err) {
    res.status(500).send(err);
  }
});

//GET AN ORDER
router.get("/findOne/:id", auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (req.user._id !== order.userId || !req.user.isAdmin)
      return res.status(403).send("Acceso denegado. Sin autorización...");
    res.status(200).send(order);
  } catch (err) {
    res.status(500).send(err);
  }
});
//DELETE
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER ORDERS
router.get("/find/:userId", isAdmin, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get Orders
router.get("/", isAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const orders = query
      ? await Order.find().sort({ _id: -1 }).limit(3)
      : await Order.find().sort({ _id: -1 });
    res.status(200).send(orders);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET MONTHLY INCOME

router.get("/income/stats", isAdmin, async (req, res) => {
  const previousMonth = moment()
    .month(moment().month() - 1)
    .set("date", -1)
    .format("YYYY-MM-DD HH:mm:ss");

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: new Date(previousMonth) } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$total",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});
// GET TOTAL INCOME

router.get("/income", async (req, res) => {
  try {
    const income = await Order.aggregate([
      {
        $project: {
          sales: "$total",
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$sales" },
        },
      },
    ]);

    res.status(200).json(income);
    console.log("🚀 ~ file: order.js:119 ~ router.get ~ income", income);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get Order Stats
router.get("/stats", async (req, res) => {
  const previousMonth = moment()
    .month(moment().month() - 1)
    .set("date", -1)
    .format("YYYY-MM-DD HH:mm:ss");

  /* const lastYear = new Date(date.setFullYear(date.getFullYear() - 1)); */

  try {
    const orders = await Order.aggregate([
      { $match: { createdAt: { $gte: new Date(previousMonth) } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).send(orders);
    console.log("🚀 ~ file: order.js:124 ~ router.get ~ orders", orders);
  } catch (err) {
    console.log("🚀 ~ file: order.js:125 ~ router.get ~ err", err);

    res.status(500).send(err);
  }
});
//Get 1 Week Sales
router.get("/week-sales", async (req, res) => {
  const last7Days = moment()
    .day(moment().day() - 7)
    .format("YYYY-MM-DD HH:mm:ss");

  /* const lastYear = new Date(date.setFullYear(date.getFullYear() - 1)); */

  try {
    const weekSales = await Order.aggregate([
      { $match: { createdAt: { $gte: new Date(last7Days) } } },
      {
        $project: {
          day: { $dayOfWeek: "$createdAt" },
          sales: "$total",
        },
      },
      {
        $group: {
          _id: "$day",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).send(weekSales);
    console.log("🚀 ~ file: order.js:124 ~ router.get ~ orders", weekSales);
  } catch (err) {
    console.log("🚀 ~ file: order.js:125 ~ router.get ~ err", err);

    res.status(500).send(err);
  }
});

module.exports = router;
