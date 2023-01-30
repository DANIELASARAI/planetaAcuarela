import styled from "styled-components";

import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PlanetContext from "../context/PlanetContext";
import Product from "./Product";
const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, filters, sort, subCat }) => {
  const { items: data, status } = useSelector((state) => state.products);
  const { planet } = useContext(PlanetContext);
  console.log("🚀 ~ file: Products.jsx:17 ~ Products ~ planet", planet);
  const [productsByCat, setProductsByCat] = useState([]);

  const [filteredProducts, setFilteredProducts] = useState([]);

  let productsCategory = data.filter(function (product) {
    return product.categories == planet;
  });
  console.log(
    "🚀 ~ file: Products.jsx:25 ~ productsCategory ~ productsCategory",
    productsCategory
  );

  useEffect(() => {
    const getProductsByCat = async () => {
      try {
        setProductsByCat(productsCategory);
      } catch (err) {}
    };
    getProductsByCat();
  }, [planet]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        productsByCat?.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [productsByCat, cat, filters]);

  useEffect(() => {
    if (sort === "nuevo") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      {cat
        ? filteredProducts.map((item) => <Product item={item} key={item.id} />)
        : productsByCat
            .slice(0, 8)
            .map((item) => <Product item={item} key={item.id} />)}
    </Container>
  );
};

export default Products;
