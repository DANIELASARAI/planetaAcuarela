import {
  Button,
  Card,
  Divider,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";
import React from "react"; // ---------------------------------------------------------------------
import { useSelector } from "react-redux";
import FlexBetween from "../components/FlexBetween";
import FlexBox from "../components/Flexbox";
import { H5, H6 } from "../components/Typography";
import Edit from "../icons/Edit";
import ShoppingCart from "../icons/ShoppingCart";
// ---------------------------------------------------------------------
const MercadoSummary = ({ showCoupon, showEditBtn, values }) => {
  const user = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  const cartItems = cart.products;
  const receiverAddress = values;
  console.log(values);
  const handleCheckout = () => {
    axios
      .post(
        "https://planeta-acuarela.vercel.app/api/mercadoPago/create_preference",
        {
          cartItems,
          userId: user._id,
          receiverAddress,
        }
      )
      .then((res) => {
        if (res.data) {
          window.location.href = res.data.response.body.init_point;
        }
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <Card
      sx={{
        padding: 3,
      }}
    >
      <FlexBetween mb={4}>
        <H5>Tu Pedido</H5>
        {showEditBtn && (
          <IconButton>
            <Edit
              sx={{
                fontSize: 16,
                color: "text.disabled",
              }}
            />
          </IconButton>
        )}
      </FlexBetween>

      <Stack spacing={1.5} mb={4}>
        {/*  <ListItem title="Produtos" value={cartItems?.length} />
        <ListItem title="Total de ítens" value={totalQuantities} /> */}

        <Divider />
        <ListItem
          title="Total a pagar"
          /*  value={"€" + totalPrice} */
          valueColor="error.main"
        />
      </Stack>

      {showCoupon && (
        <FlexBox alignItems="center" gap={1} mb={3}>
          <TextField
            color="grey"
            placeholder="Apply Coupon"
            size="small"
            fullWidth
          />
          <Button
            variant="contained"
            size="small"
            sx={{
              padding: 1,
            }}
          >
            Apply
          </Button>
        </FlexBox>
      )}

      <Button
        variant="contained"
        onClick={handleCheckout}
        startIcon={<ShoppingCart />}
        fullWidth
      >
        Pagar
      </Button>
    </Card>
  );
};

export default MercadoSummary; // -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
function ListItem({ title, value, valueColor }) {
  return (
    <FlexBetween>
      <H6 fontWeight={500}>{title}</H6>
      <H6 fontWeight={500} color={valueColor}>
        {value}
      </H6>
    </FlexBetween>
  );
}
