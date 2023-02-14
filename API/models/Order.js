const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    /*  userId: { type: String, required: true }, */
    customerId: { type: String },
    paymentIntentId: { type: String },
    products: [],
    /* subtotal: { type: Number, required: true }, */

    total: { type: Number, required: true },
    name: { type: String },
    city: { type: String },
    shipping: { type: String },
    email: {
      type: String,
    },
    country: { type: String },
    delivery_status: { type: String, default: "pending" },
    payment_status: { type: String, required: true },
    address: { type: Object },

    phone: { type: Object },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
