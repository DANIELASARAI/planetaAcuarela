import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import { getTotals } from "./redux/cartRedux";
import { loadUser } from "./redux/authRedux";
import { productsFetch } from "./redux/productsRedux";

store.dispatch(getTotals());
store.dispatch(loadUser(null));
store.dispatch(productsFetch());
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("root")
);
