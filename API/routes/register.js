const bcrypt = require("bcryptjs");
const Joi = require("joi");
const express = require("express");
const User = require("../models/User");
const jwtGen = require("../utils/jwtGen");

const router = express.Router();

router.post("/", async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(6).max(200).required(),
  });
  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("Usuario ya existe en el Planeta...");
  user = User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user = await user.save();
  const token = jwtGen(user);
  console.log(token);
  res.send(token);
});

module.exports = router;
