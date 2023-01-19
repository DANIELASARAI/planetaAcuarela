import React, { useState } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import { mobile } from "../responsive";

const Container = styled.div``;
const Title = styled.h1`
  margin: 20px;
  font-family: "Yomogi";
`;
const FilterContainer = styled.div`
  display: flex;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;
const Filter = styled.div`
  margin: 20px;
  display: flex;

  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 10px;
  font-family: Poppins;
  font-weight: 300;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 20px;

  ${mobile({ margin: "5px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("nuevo");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };
  console.log(filters);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{cat}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filtrar productos:</FilterText>
          <Select name="subCategories" onChange={handleFilters}>
            <Option>Sub-Categoria</Option>
            <Option>poleras</Option>
            <Option>tazas</Option>
            <Option>polerones</Option>
            <Option>gorras</Option>
            <Option>cojines</Option>
            <Option>mochilas</Option>
            <Option>shorts</Option>
          </Select>
          <Select name="color" onChange={handleFilters}>
            <Option>Color</Option>
            <Option>white</Option>
            <Option>black</Option>
            <Option>red</Option>
            <Option>blue</Option>
            <Option>pink</Option>
            <Option>green</Option>
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option>Talla</Option>
            <Option>xs</Option>
            <Option>s</Option>
            <Option>m</Option>
            <Option>l</Option>
            <Option>xl</Option>
          </Select>

          <Select name="gender" onChange={handleFilters}>
            <Option>Género</Option>
            <Option>femenino</Option>
            <Option>masculino</Option>
            <Option>unisex</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Ordenar por:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="nuevo">Nuevo</Option>
            <Option value="asc">Precio (asc)</Option>
            <Option value="desc">Precio (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort} />

      <Footer />
    </Container>
  );
};

export default ProductList;
