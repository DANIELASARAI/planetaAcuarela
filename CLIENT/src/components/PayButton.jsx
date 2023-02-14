import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const PayButton = ({ cartItems }) => {
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <>
      <CheckOut onClick={() => navigate("/subscribed-address")}>Pagar</CheckOut>
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
