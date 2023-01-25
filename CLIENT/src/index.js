import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import { loadUser } from "./redux/authRedux";
import { getTotals } from "./redux/cartRedux";
import { ordersFetch } from "./redux/ordersRedux";
import { productsFetch } from "./redux/productsRedux";
import store from "./redux/store";

store.dispatch(getTotals());
store.dispatch(loadUser(null));
store.dispatch(productsFetch());
store.dispatch(ordersFetch());
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("root")
);
