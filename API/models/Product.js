const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    categories: { type: Array, required: true },
    subCategories: { type: Array },
    gender: { type: Array },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    color: { type: Array, required: true },
    size: { type: Array, required: true },
    inStock: { type: Boolean },
    image: { type: Object, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
