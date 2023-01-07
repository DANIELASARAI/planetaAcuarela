import styled from "styled-components";
import { mobile } from "../responsive";

/* 1. Create the styled container and import styled from components.
 Then, add it below into the returning with a text.
 Add it into our Home page. */
const Container = styled.div`
  height: 30px;
  background-color: #853b7d;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 200;
  font-family: Poppins;
  ${mobile({ margin: "12px", borderRadius: "5px", fontSize: "8px" })}
`;
/* 2) Go and create Slider Component */
const Announcement = () => {
  return (
    <Container>
      Super Ventas! Envío gratis Santiago Centro en órdenes superiores a CLP
      30.000
    </Container>
  );
};

export default Announcement;
