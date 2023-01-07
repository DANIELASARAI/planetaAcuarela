import styled from "styled-components";
import { categories, subCats } from "../data";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";

import SubCategoryItem from "./SubCategoryItem";

const Container = styled.div`
  display: flex;
  padding: 20px;
  width: 100%;
`;

const Categories = () => {
  return (
    <Carousel>
      {subCats?.map((item) => (
        <SubCategoryItem item={item} key={item.id} subCat={item.value} />
      ))}
    </Carousel>
  );
};

export default Categories;
