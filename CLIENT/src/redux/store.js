import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authRedux";
import cartReducer from "./cartRedux";
import ordersReducer from "./ordersRedux";
import productsReducer from "./productsRedux";
import usersReducer from "./usersredux";

export default configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
    orders: ordersReducer,
    users: usersReducer,
  },
});
