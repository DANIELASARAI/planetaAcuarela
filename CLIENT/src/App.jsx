import CheckoutSuccess from "./components/CheckoutSuccess";
import Cart from "./pages/Cart";
import GuestAddress from "./pages/GuestAddress";
import Pagamento from "./pages/GuestPayment";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CreateProduct from "./components/CreateProduct";
import Dashboard from "./components/Dashboard";

import NotFound from "./components/NotFound";
import Orders from "./components/Orders";
import ProductsTable from "./components/ProductsTable";
import Summary from "./components/Summary";
import Users from "./components/Users";

import SubCategoriesList from "./pages/SubCategoriesList";

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/:subcat" element={<SubCategoriesList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/guest-address" element={<GuestAddress />} />
        <Route path="/pago" element={<Pagamento />} />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Dashboard />}>
          <Route path="summary" element={<Summary />} />
          <Route path="products" element={<ProductsTable />}>
            <Route path="create-product" element={<CreateProduct />} />
          </Route>
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<Orders />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
