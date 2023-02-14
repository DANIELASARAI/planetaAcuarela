// SDK de Mercado Pago
const mercadopago = require("mercadopago");
require("dotenv").config();
const express = require("express");

const Order = require("../models/Order");

require("dotenv").config();
const router = express.Router();
// Agrega credenciales
mercadopago.configure({
  access_token:
    "APP_USR-7755728946194320-020215-b7146f5abcb7a19c4d40bc73a13dc764-1300548213",
});

router.post("/create_preference", (req, res) => {
  const receiverAddress = req.body.receiverAddress;
  console.log(
    "🚀 ~ file: mercadoPago.js:17 ~ router.post ~ receiverAddress",
    receiverAddress
  );

  const items = req.body.cartItems?.map((item) => {
    return {
      title: item.name,
      category_id: item.categories[0],
      description: item.desc,
      unit_price: item.price,
      quantity: item.cartQuantity,
      currency_id: "CLP",
      picture_url: item.image.url,
    };
  });

  let preference = {
    items,
    metadata: {
      email: receiverAddress.email,
    },
    payer: {
      name: receiverAddress.name,
      phone: { number: Number(receiverAddress.phone) },
      identification: { type: "RUT", number: receiverAddress.RUT },
      email: receiverAddress.email,
      address: {
        street_name: "De Cepaes",
        street_number: 321,
        zip_code: receiverAddress.postal,
      },
    },
    shipments: {
      cost: 2000,
      mode: "not_specified",
      receiver_address: {
        zip_code: receiverAddress.postal,
        street_name: receiverAddress.address,
        street_number: 1,
        floor: "",
        apartment: "",

        city_name: receiverAddress.city,
        state_name: null,
        country_name: receiverAddress.country,
      },
    },

    notification_url:
      "https://planeta-acuarela.vercel.app/api/mercadopago/notifications", //url where mercado pago sends a post request for this order
    back_urls: {
      success: "https://www.planetacuarela.com/checkout-success",
      failure: "https://planetacuarela.com/",
      pending: "https://planetacuarela.com/",
    },
    auto_return: "approved",
    binary_mode: true,
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.json({
        response,
      });
    })
    .catch(function (error) {
      console.log(error.message);
    });
});

const createOrder = async (payment) => {
  const newOrder = new Order({
    /*  userId: customer.metadata.userId,
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    subtotal: data.amount_subtotal,
    shipping: data.customer_details, */
    name: payment.body.additional_info.payer.first_name,
    email: payment.body.additional_info.payer.email,
    city: payment.body.additional_info.shipments.receiver_address.city_name,
    country:
      payment.body.additional_info.shipments.receiver_address.country_name,
    shipping:
      payment.body.additional_info.shipments.receiver_address.street_name,
    products: payment.body.additional_info.items,
    total: payment.body.transaction_details.total_paid_amount,
    payment_status: payment.body.status_detail,
    phone: payment.body.additional_info.payer.phone.number,
  });

  try {
    const savedOrder = await newOrder.save();
    console.log("Processed Order:", savedOrder);
  } catch (err) {
    console.log(err);
  }
};

/* router.post("/notifications", async function (req, res) {
  let merchant_order = null;
  const { query } = req;
  const topic = query.topic || query.type;
  switch (topic) {
    case "payment":
      mercadopago.payment.findById(id).then((payment) => {
        // Get the payment and the corresponding merchant_order reported by the IPN.
        merchant_order = mercadopago.merchantOrder.findById(payment.order.id);
      });
      break;
    case "merchant_order":
      merchant_order = mercadopago.merchantOrder.findById(id);
      break;
  }

  let paid_amount = 0;
  merchant_order.payments.forEach((payment) => {
    if (payment.status === "approved") {
      paid_amount += payment.transaction_amount;
    }
  });

  // If the payment's transaction amount is equal (or bigger) than the merchant_order's amount you can release your items
  if (paid_amount >= merchant_order.total_amount) {
    if (merchant_order.shipments.length > 0) {
      // The merchant_order has shipments
      if (merchant_order.shipments[0].status === "ready_to_ship") {
        console.log("Totally paid. Print the label and release your item.");
      }
    } else {
      // The merchant_order don't has any shipments
      console.log("Totally paid. Release your item.");
    }
  } else {
    console.log("Not paid yet. Do not release your item.");
  }

  res.send();
}); */

//Mercdo Pago Webhooks Colombiano
router.post("/notifications", async (req, res) => {
  const { query } = req;
  /*  console.log("🚀 ~ file: mercadoPago.js:126 ~ router.post ~ body, query", {
    query,
  }); */
  const topic = query.topic || query.type;
  switch (topic) {
    case "payment":
      const paymentId = query.id || query["data.id"];
      const payment = await mercadopago.payment.findById(paymentId);
      const items = payment.body.additional_info.items;
      const email = payment.body.additional_info.payer.email;

      if (
        payment.body.status === "approved" &&
        payment.body.status_detail === "accredited"
      ) {
        createOrder(payment, items);
      }
      merchantOrder = await mercadopago.merchant_orders.findById(
        payment.body.order.id
      );

      break;
    case "merchant_order":
      const orderId = query.id;

      merchantOrder = await mercadopago.merchant_orders.findById(orderId);

      break;
  }
  return res.send();
});

module.exports = router;
