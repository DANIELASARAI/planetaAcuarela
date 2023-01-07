import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { url } from "../slices/api";

const PayButton = ({ cartItems }) => {
  const user = useSelector((state) => state.auth);

  const handleCheckout = () => {
    axios
      .post(`${url}/stripe/create-checkout-session`, {
        cartItems,
        userId: user._id,
      })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <CheckOut onClick={() => handleCheckout()}>Pagar</CheckOut>
    </>
  );
};

export default PayButton;
const CheckOut = styled.button`
  cursor: pointer;
  font-size: 15px;
  width: 100%;
  color: #1b3f65;
  background-color: #0bd7d0;
  border-radius: 15px;
  margin-bottom: 1rem;
  border: 1px solid rgb(183, 183, 183);
  padding: 5px;
  height: 8vh;
`;
