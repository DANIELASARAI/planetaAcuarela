import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authRedux";
import cartReducer from "./cartRedux";
import ordersReducer from "./ordersRedux";
import productsReducer from "./productsRedux";

export default configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
    orders: ordersReducer,
  },
});
