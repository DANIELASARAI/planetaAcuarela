import { Outlet, useNavigate } from "react-router-dom";
import { AdminHeaders, PrimaryButton, H1 } from "./CommonStyled";
import Navbar from "./Navbar";

const Products = () => {
  const navigate = useNavigate();

  return (
    <>
      <AdminHeaders>
        <H1>Productos</H1>
        <PrimaryButton
          onClick={() => navigate("/admin/products/create-product")}
        >
          Crear
        </PrimaryButton>
      </AdminHeaders>
      <Outlet />
    </>
  );
};

export default Products;
