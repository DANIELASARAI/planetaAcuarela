import {
  Instagram,
  MailTwoTone,
  PhoneIphoneTwoTone,
  RoomTwoTone,
  WhatsApp,
} from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import logo from "../img/acuarela.png";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1`
  margin-left: 40px;
  font-family: "Yomogi";
`;

const Desc = styled.p`
  margin: 20px 0px;
  font-family: "Poppins";
  font-weight: 200;
`;
const TextUs = styled.p`
  margin: 15px 0px;
  font-family: "Yomogi";
  font-weight: 200;
`;

const SocialContainer = styled.div`
  display: flex;
`;
const ContactUs = styled.div`
  display: flex;
  padding: 20px;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  margin-left: 20px;
  cursor: pointer;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
`;
const Title = styled.h3`
  margin-bottom: 30px;
  font-size: 16px;
  font-family: "Poppins";
  font-weight: 400;
  color: #853b7d;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  font-family: Poppins;
  font-size: 12px;
  cursor: pointer;
`;

const Right = styled.div`
  flex: 1;
  font-family: Poppins;

  font-size: 12px;
  padding: 20px;
  backgroundcolor: "#fff8f8";
  ${mobile({ backgroundColor: "#fff8f8" })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 50%;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>
          {" "}
          <img src={logo} width={200} />
        </Logo>
        <Desc>Estampados y Sublimados.</Desc>
      </Left>
      <Center>
        <Title>Enlaces Útiles</Title>

        <TextUs>Escríbenos!</TextUs>
        <ContactUs>
          <SocialContainer>
            <a
              href="https://www.instagram.com/planetacuarela/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialIcon color="C13584">
                <Instagram />
              </SocialIcon>
            </a>
            <a
              href="https://wa.me/+56994723165"
              className="whatsapp_float"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialIcon color="25D366">
                <WhatsApp />
              </SocialIcon>
            </a>
          </SocialContainer>
        </ContactUs>
      </Center>
      <Right>
        <Title>Contactos</Title>
        <ContactItem>
          <RoomTwoTone style={{ marginRight: "10px" }} /> Zañartu 1100, Ñuñoa,
          Santiago de Chile.
        </ContactItem>
        <ContactItem>
          <PhoneIphoneTwoTone style={{ marginRight: "10px" }} /> +56 9 94723165
        </ContactItem>
        <ContactItem>
          <MailTwoTone style={{ marginRight: "10px" }} />{" "}
          planetacuarela@gmail.com
        </ContactItem>
      </Right>
    </Container>
  );
};

export default Footer;
