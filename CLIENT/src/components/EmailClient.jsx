import emailjs from "@emailjs/browser";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export const EmailClient = ({ values }) => {
  const { name, email, phone, RUT, address, city, country } = values;

  const cart = useSelector((state) => state.cart);

  const item = cart.products?.map((item) => item.name);
  const size = cart.products?.map((item) => item.size);
  const color = cart.products?.map((item) => item.color);
  const desc = cart.products?.map((item) => item.desc);
  const [submit, setSubmit] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    let templateParams = {
      name: name,
      email: email,
      phone: phone,
      city: city,
      rut: RUT,
      country: country,
      address: address,
      message: "Tienes un pedido nuevo con estos detalles",
      color: color,
      size: size,
      desc: desc,
      total: cart.cartTotalAmount,
      quantity: cart.cartTotalQuantity,
      items: item,
    };
    emailjs
      .send(
        "gmailMessage",
        "template_6v7h8qk",
        templateParams,
        "t4yHeDqUjbcehttwu"
      )
      .then(
        (result) => {
          setSubmit(true);
          toast.success(`Orden tomada, verifica tu email!`);
          console.log(result);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <Box py={2}>
      {values ? (
        <Button
          onClick={sendEmail}
          disabled={submit}
          type="submit"
          variant="contained"
        >
          Realizar el pedido
        </Button>
      ) : null}
    </Box>
  );
};
