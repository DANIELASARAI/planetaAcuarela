import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./cartRedux";
import authReducer from "./authRedux";
import productsReducer from "./productsRedux";

export default configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});
