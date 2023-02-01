import { useEffect } from "react";

import { AddOutlined, RemoveOutlined } from "@mui/icons-material";
import RemoveShoppingCartOutlinedIcon from "@mui/icons-material/RemoveShoppingCartOutlined";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PayButton from "../components/PayButton";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../redux/cartRedux";
import { mobile } from "../responsive";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
  font-family: "Yomogi";
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  border-radius: 15px;
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;

  ${mobile({ flexDirection: "column" })};
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;
const Amount = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 70vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 10px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  border-radius: 15px;
  background-color: black;
  color: white;
  font-weight: 600;
  font-family: "Yomogi";
  cursor: pointer;
`;

const LoginButton = styled.button`
  width: 100%;
  border-radius: 15px;
  background-color: #b279a8;
  color: #1b3f65;
  font-weight: 600;
  font-family: "Poppins";
  cursor: pointer;
  margin-bottom: 1rem;
  border: 1px solid rgb(183, 183, 183);
  padding: 3px;
  height: 8vh;
`;
const GuestButton = styled.button`
  width: 100%;
  border-radius: 15px;
  color: #1b3f65;
  font-weight: 600;
  font-family: "Poppins";
  cursor: pointer;
  margin-bottom: 1rem;
  border: 1px solid rgb(183, 183, 183);
  padding: 3px;
  height: 8vh;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const Remove = styled.div`
  cursor: pointer;

  color: red;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };
  const handleIncreaseCart = (product) => {
    dispatch(addToCart(product));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>Tu Bolsa</Title>
        <Top>
          <Link to="/">
            <TopButton>Continuar Comprando</TopButton>
          </Link>
          <TopTexts>
            {cart.products.length > 0 && (
              <TopButton type="filled" onClick={() => handleClearCart()}>
                Vaciar Carro
              </TopButton>
            )}
          </TopTexts>
        </Top>
        {cart.products?.length === 0 ? (
          <Title>Tu Carro está vacío</Title>
        ) : (
          <>
            <Bottom>
              <Info>
                {cart.products?.map((product) => (
                  <Product>
                    <ProductDetail>
                      <Image src={product.image?.url} />
                      <Details>
                        <ProductName>
                          <b>Producto:</b> {product.name}
                        </ProductName>
                        <ProductId>
                          <b>ID:</b> {product._id}
                        </ProductId>
                        <ProductColor color={product.color} />
                        <ProductSize>
                          <b>Talla:</b> {product.size?.join(", ")}
                        </ProductSize>
                        <Amount>
                          <Amount>
                            <b>Cantidad:</b> {product.cartQuantity}
                          </Amount>
                          <b></b>
                          <Remove>
                            {" "}
                            <RemoveShoppingCartOutlinedIcon
                              onClick={() => handleRemoveFromCart(product)}
                            />
                          </Remove>
                        </Amount>
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductAmountContainer>
                        {" "}
                        <RemoveOutlined
                          onClick={() => handleDecreaseCart(product)}
                        />
                        <AddOutlined
                          onClick={() => handleIncreaseCart(product)}
                        />
                        <ProductAmount>{product.quantity}</ProductAmount>
                      </ProductAmountContainer>
                      <ProductPrice>
                        CLP {product.price * product.cartQuantity}
                      </ProductPrice>
                    </PriceDetail>
                  </Product>
                ))}
                <Hr />
              </Info>
              <Summary>
                <SummaryTitle>Resumen de Orden</SummaryTitle>
                <SummaryItem>
                  <SummaryItemText>Subtotal</SummaryItemText>
                  <SummaryItemPrice>
                    CLP {cart.cartTotalAmount}
                  </SummaryItemPrice>
                </SummaryItem>
                <SummaryItem></SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Subscriptor</SummaryItemText>
                  <SummaryItemPrice>-10%</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem type="total">
                  <SummaryItemText>Total</SummaryItemText>
                  <SummaryItemPrice>
                    CLP {cart.cartTotalAmount}
                  </SummaryItemPrice>
                </SummaryItem>
                {auth._id ? (
                  <PayButton cartItems={cart.products} />
                ) : (
                  <LoginButton onClick={() => navigate("/login")}>
                    Iniciar Sesión
                  </LoginButton>
                )}
                <GuestButton onClick={() => navigate("/guest-address")}>
                  Comprar como invitado
                </GuestButton>
              </Summary>
            </Bottom>
          </>
        )}
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
