import React, { useState } from "react";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import styled from "styled-components";
import Subscribe from "./SubscribeModal";
const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h1`
  font-family: Poppins;
  font-weight: 300;
  font-size: 70px;
  margin-bottom: 20px;
`;
const Description = styled.div`
  font-size: 24px;
  font-family: Poppins;
  font-weight: 200;
  margin-bottom: 20px;
`;
const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  font-family: Poppins;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
`;

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`;

const Button = styled.button`
  flex: 1;
  background-color: teal;
  color: white;
  border: none;
  cursor: pointer;
`;

const Newsletter = () => {
  const [openSubscribe, setOpenSubscribe] = useState(false);
  const toggleSubscribe = () => setOpenSubscribe(!openSubscribe);

  /*   const handleCloseModal = (e) => {
    e.preventDefault();

    setOpenSubscribe(false);
  }; */

  return (
    <Container>
      <Title>Newsletter</Title>
      <Description>
        ¿Quiéres recibir actualizaciones de tus productos favoritos?
      </Description>
      <InputContainer>
        <Input placeholder="Tu Email" />
        <Button onClick={toggleSubscribe}>
          <SendRoundedIcon />
          <Subscribe
            open={openSubscribe}
            close={() => setOpenSubscribe(false)}
          />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
