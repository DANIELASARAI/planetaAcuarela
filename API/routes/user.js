const User = require("../models/User");
const {
  verifyToken,
  verifyTokenAuthorization,
  verifyTokenAdmin,
} = require("./verifyToken");
const bcrypt = require("bcryptjs");

const { auth, isUser, isAdmin } = require("../middleware/auth");
const moment = require("moment");
const router = require("express").Router();

//Update User

router.put("/:id", isUser, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!(user.email === req.body.email)) {
      const emailInUse = await User.findOne({ email: req.body.email });
      if (emailInUse) return res.status(400).send("Email ya ha sido tomado...");
    }
    if (req.body.password && user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        isadmin: req.body.isAdmin,
        password: user.password,
      },
      { new: true }
    );
    res.status(200).send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } catch (error) {
    console.log(error);
  }
});

//Delete

router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).send(deletedUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Get User

router.get("/find/:id", isUser, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).send(
      others /* {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    } */
    );
  } catch (error) {
    res.status(500).send(error);
  }
});

//Get all Users
router.get("/", isAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5) //localhost:8000/api/users?new=true returns the last 5 users, after that, we go for an action creator
      : await User.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Get User Stats
router.get("/stats", async (req, res) => {
  const previousMonth = moment()
    .month(moment().month() - 1)
    .set("date", -1)
    .format("YYYY-MM-DD HH:mm:ss");

  /* const lastYear = new Date(date.setFullYear(date.getFullYear() - 1)); */

  try {
    const users = await User.aggregate([
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
    res.status(200).send(users);
  } catch (err) {
    console.log("🚀 ~ file: user.js:97 ~ router.get ~ err", err);
    res.status(500).send(err);
  }
});

module.exports = router;
