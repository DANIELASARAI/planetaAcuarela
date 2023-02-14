const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
////const authRoute = require("./routes/auth");
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const productRoute = require("./routes/products");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/orders");
const stripeRoute = require("./routes/stripe");
const mercadoPagoRoute = require("./routes/mercadoPago");
const cors = require("cors");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());

app.use(
  express.json({
    limit: "5mb",
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);

//app.use("/api/auth", authRoute);

app.use("/api/users", userRoute);
app.use("/api/register", registerRoute);
app.use("/api/login", loginRoute);
app.use("/api/stripe", stripeRoute);
app.use("/api/mercadoPago", mercadoPagoRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
