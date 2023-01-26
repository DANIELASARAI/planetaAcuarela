import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import { loadUser } from "./redux/authRedux";
import { getTotals } from "./redux/cartRedux";
import { ordersFetch } from "./redux/ordersRedux";
import { productsFetch } from "./redux/productsRedux";
import store from "./redux/store";
import { usersFetch } from "./redux/usersredux";

store.dispatch(getTotals());
store.dispatch(loadUser(null));
store.dispatch(productsFetch());
store.dispatch(ordersFetch());
store.dispatch(usersFetch());
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("root")
);
