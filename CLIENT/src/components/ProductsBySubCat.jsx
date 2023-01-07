import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Product from "./Product";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ProductsBySubCat = ({ cat, filters, sort, subCat }) => {
  const { items: data, status } = useSelector((state) => state.products);

  const [productsBySubCat, setProductsBySubCat] = useState([]);

  const [filteredProducts, setFilteredProducts] = useState([]);
  console.log(
    "🚀 ~ file: Products.jsx:24 ~ Products ~ filteredProducts",
    filteredProducts
  );

  let productsSubCategory = data?.filter(function (product) {
    return product.subCategories == subCat;
  });
  console.log(
    "🚀 ~ file: ProductsBySubCat.jsx:29 ~ productsSubCategory ~ productsSubCategory",
    productsSubCategory
  );

  useEffect(() => {
    const getProductsBySubCat = async () => {
      try {
        setProductsBySubCat(productsSubCategory);
      } catch (err) {}
    };
    getProductsBySubCat();
  }, []);

  useEffect(() => {
    subCat &&
      setFilteredProducts(
        productsBySubCat?.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [productsBySubCat, subCat, filters]);

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
      {subCat
        ? filteredProducts.map((item) => <Product item={item} key={item.id} />)
        : productsBySubCat
            .slice(0, 8)
            .map((item) => <Product item={item} key={item.id} />)}
    </Container>
  );
};

export default ProductsBySubCat;
