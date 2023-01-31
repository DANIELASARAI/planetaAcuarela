import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";

import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { addToCart } from "../redux/cartRedux";
import { publicRequest } from "../requestMethods";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
  font-family: "Yomogi";
`;
const Stock = styled.h3`
  font-weight: 200;
  font-family: "Yomogi";
  color: green;
`;
const NoStock = styled.h3`
  font-weight: 200;
  font-family: "Yomogi";
  color: red;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  cursor: pointer;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  margin: 0px 5px 5px;
  cursor: pointer;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  margin-left: 10px;
  border-radius: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  font-family: "Yomogi";
  &:hover {
    background-color: #f8f4f4;
  }
`;
const Loader = styled.p`
  margin-top: 2rem;
  font-family: Yomogi;
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const dispatch = useDispatch();
  const [stock, setInStock] = useState("No");
  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
        setInStock(res.data.inStock);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <>
        {loading ? (
          <Loader>Cargando Detalles del producto...</Loader>
        ) : (
          <Wrapper>
            <ImgContainer>
              <Image src={product.image?.url} />
            </ImgContainer>
            <InfoContainer>
              <Title>{product.name}</Title>

              <Desc>{product.desc}</Desc>
              <Price>{product.price} CLP</Price>

              {stock === true ? (
                <>
                  <Stock>Disponible</Stock>
                </>
              ) : (
                <>
                  {" "}
                  <NoStock>No Disponible</NoStock>
                </>
              )}

              <FilterContainer>
                <Filter>
                  <FilterTitle>Color</FilterTitle>
                  {product.color?.map((c) => (
                    <FilterColor
                      color={c}
                      key={c}
                      onClick={() => setColor(c)}
                    />
                  ))}
                </Filter>
                <Filter>
                  <FilterTitle>Talla</FilterTitle>
                  <FilterSize onChange={(e) => setSize(e)}>
                    {product.size?.map((s, id) => (
                      <FilterSizeOption key={id}>{s}</FilterSizeOption>
                    ))}
                  </FilterSize>
                </Filter>
              </FilterContainer>

              <AddContainer>
                <Button onClick={handleAddToCart}>Añadir al Carro</Button>
              </AddContainer>
            </InfoContainer>
          </Wrapper>
        )}
      </>

      <Footer />
    </Container>
  );
};

export default Product;
