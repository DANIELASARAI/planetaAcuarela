import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { clearCart, getTotals } from "../redux/cartRedux";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.unsplash.com/photo-1506272517965-ec6133efee7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80")
      center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Button = styled.button`
  width: 100%;

  border-radius: 15px;
  background-color: black;
  color: white;
  font-weight: 600;
  font-family: "Yomogi";
  cursor: pointer;
  margin-top: 20px;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: transparent;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-family: "Yomogi";
  font-size: 24px;
  font-weight: 500;
`;

const CheckoutSuccess = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  return (
    <Container>
      <Wrapper>
        <Title>Compra Exitosa</Title>
        <p>Tu orden podría tomar unos minutos en procesar.</p>
        <p>Revisa el estado de tu orden en aprox. 10mins.</p>
        <p>
          En caso de alguna duda, escríbenos a{" "}
          <strong>planeta.acuarela@gmail.com</strong>
        </p>
        <Link to="/">
          <Button>Continuar Comprando</Button>
        </Link>
      </Wrapper>
    </Container>
  );
};

export default CheckoutSuccess;
