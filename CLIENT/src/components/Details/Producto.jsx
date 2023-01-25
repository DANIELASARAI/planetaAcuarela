import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { addToCart } from "../../redux/cartRedux";
import { setHeaders, url } from "../../slices/api";
const Producto = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [producto, setProducto] = useState({});
  console.log("🚀 ~ file: Producto.jsx:9 ~ Producto ~ producto", producto);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const res = await axios.get(
          `${url}/products/find/${params.id}`,
          setHeaders()
        );

        setProducto(res.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };
  return (
    <StyledProduct>
      <ProductContainer>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <>
            <ImageContainer>
              <img src={producto.image?.url} alt="producto" />
            </ImageContainer>
            <ProductDetails>
              <h3>{producto.name}</h3>
              <p>
                <span>Planeta: </span>
                {producto.categories}
              </p>
              <p>
                <span>Sub-Categoria: </span>
                {producto.subCategories}
              </p>
              <p>
                <span>Descripción: </span>
                {producto.desc}
              </p>
              <p>
                <span>Color: </span>
                {producto.color}
              </p>
              <p>
                <span>Talla: </span>
                {producto.size}
              </p>
              <Price>CLP {producto.price?.toLocaleString()}</Price>
              <button
                className="product-add-to-cart"
                onClick={() => handleAddToCart(producto)}
              >
                Añadir al Carro
              </button>
            </ProductDetails>
          </>
        )}
      </ProductContainer>
    </StyledProduct>
  );
};

export default Producto;

const StyledProduct = styled.div`
  margin: 15rem;
  display: flex;
  justify-content: center;
`;
const ProductContainer = styled.div`
  max-width: 500px;
  width: 100%;
  height: auto;
  display: flex;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 5px;
  padding: 2rem;
`;
const ImageContainer = styled.div`
  flex: 1;
  img {
    width: 100%;
  }
`;

const ProductDetails = styled.div`
  flex: 2;
  margin-left: 2rem;
  h3 {
    font-size: 45px;
    font-family: "Yomogi";
  }
  p span {
    font-weight: bold;
  }
`;
const Price = styled.div`
  margin: 1rem 0;
  font-weight: bold;
  font-size: 25px;
`;
