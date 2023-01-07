import styled from "styled-components";

import Product from "./Product";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, filters, sort, subCat }) => {
  console.log("🚀 ~ file: Products.jsx:15 ~ Products ~ cat", cat);
  console.log("🚀 ~ file: Products.jsx:15 ~ Products ~ sort", sort);
  console.log("🚀 ~ file: Products.jsx:15 ~ Products ~ sort", sort);
  console.log("🚀 ~ file: Products.jsx:15 ~ Products ~ filters", filters);
  const { items: data, status } = useSelector((state) => state.products);
  console.log("🚀 ~ file: Products.jsx:20 ~ Products ~ data", ...data);

  const [productsByCat, setProductsByCat] = useState([]);

  const [filteredProducts, setFilteredProducts] = useState([]);
  console.log(
    "🚀 ~ file: Products.jsx:24 ~ Products ~ filteredProducts",
    filteredProducts
  );

  let productsCategory = data.filter(function (product) {
    return product.categories == cat;
  });
  console.log(
    "🚀 ~ file: Products.jsx:33 ~ productsCategory ~ productsCategory",
    productsCategory
  );

  useEffect(() => {
    const getProductsByCat = async () => {
      try {
        setProductsByCat(productsCategory);
      } catch (err) {}
    };
    getProductsByCat();
  }, []);

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
