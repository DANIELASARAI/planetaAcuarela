import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Subscribe from "./SubscribeModal";
const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: WHITE;
  font-family: Yomogi;
  margin-bottom: 20px;
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;
`;

const SubCategoryItem = ({ item, subCat }) => {
  const [subCategory, setSubCategory] = useState("");
  const [openSubscribe, setOpenSubscribe] = useState(false);
  return (
    <Container>
      <Link to={`/${subCat}`}>
        <Image src={item.img} />
        <Info>
          <Title>{item.title}</Title>
          <Button
            onClick={() => {
              setSubCategory(subCat);
              setOpenSubscribe(true);
            }}
          >
            COMPRAR AHORA{" "}
            <Subscribe
              subCat={subCategory}
              open={openSubscribe}
              close={() => setOpenSubscribe(false)}
            />
          </Button>
        </Info>
      </Link>
    </Container>
  );
};

export default SubCategoryItem;
