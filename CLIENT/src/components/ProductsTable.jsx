import { styled } from "@mui/material";
import { Box } from "@mui/system";
import { Fragment } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { H1, PrimaryButton } from "./CommonStyled";

const Products = () => {
  const navigate = useNavigate();

  const Wrapper = styled(Box)(({ theme, show }) => ({
    [theme.breakpoints.down(1200)]: {
      width: "80%",

      marginLeft: 60,
      paddingLeft: "2rem",
      paddingRight: "2rem",
    },
  }));
  const InnerWrapper = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up("sm")]: {
      paddingTop: "12px",
      display: "flex",
      flexDirection: "row",
      paddingLeft: "60px",
      justifyContent: "space-between",
    },
  }));

  return (
    <Fragment>
      <Wrapper>
        <InnerWrapper>
          <H1>Productos</H1>

          <PrimaryButton
            onClick={() => navigate("/admin/products/create-product")}
          >
            Crear
          </PrimaryButton>
        </InnerWrapper>
        <Outlet />
      </Wrapper>
    </Fragment>
  );
};

export default Products;
