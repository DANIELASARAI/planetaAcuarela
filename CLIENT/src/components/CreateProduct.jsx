import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "./CommonStyled";
import { productsCreate } from "../redux/productsRedux";
import { cat } from "../data";
import { sizes } from "../data";
import { genders } from "../data";
import { subCats } from "../data";
import { colors } from "../data";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  ThemeProvider,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { H4 } from "./Typography";

const theme = createTheme({
  status: {
    danger: "#d32f2f",
    success: "#4caf50",
    warning: "#ef5350",
    info: "#0288d1",
  },
  palette: {
    primary: {
      main: "#853b7d",
      darker: "#0288d1",
    },
    noColor: {
      main: "#242424",
      white: "#ffffff",
    },
  },
});

const CreateProduct = () => {
  const dispatch = useDispatch();
  const createStatus = useSelector((state) => state);
  const [productImg, setProductImg] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [gender, setGender] = useState([]);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const [inStock, setInStock] = useState(true);
  console.log(createStatus);

  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];
    //console.log(file);
    TransformFile(file);
  };
  //To look the img file like a string
  const TransformFile = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProductImg(reader.result);
      };
    } else {
      setProductImg("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    dispatch(
      productsCreate({
        name,
        categories,
        subCategories,
        gender,
        price,
        desc,
        image: productImg,
        size,
        color,
        inStock,
      })
    );
  };

  const handleCategory = (e) => {
    let values = Array.from(e.target.value);
    setCategories(values);
    console.log("Selected Categories: ", values);
  };
  const handleSize = (e) => {
    let sizeValues = Array.from(e.target.value);
    setSize(sizeValues);
    console.log("Selected Sizes: ", sizeValues);
  };
  const handleColor = (e) => {
    setColor(e.target.value);
  };
  const handleGender = (e) => {
    setGender(e.target.value);
  };
  const handleSubCategories = (e) => {
    let subCatValues = Array.from(e.target.value);
    setSubCategories(subCatValues);
    console.log("Selected SubCategory: ", subCatValues);
  };

  return (
    <StyledCreateProduct>
      <StyledForm onSubmit={handleSubmit}>
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              width: 100,

              padding: 1,
              display: "flex",
            }}
          >
            <label htmlFor="upload-photo">
              <input
                style={{ display: "none" }}
                id="upload-photo"
                name="upload-photo"
                type="file"
                onChange={handleProductImageUpload}
              />

              <Fab
                size="string"
                component="span"
                aria-label="add"
                variant="extended"
              >
                <AddPhotoAlternateIcon />
                <H4>Fotografia</H4>
              </Fab>
            </label>
          </Box>
        </ThemeProvider>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <TextField
            id="standard-basic"
            label={<H4>Nombre</H4>}
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <TextField
            id="standard-basic"
            label={<H4>Descripción</H4>}
            variant="outlined"
            onChange={(e) => setDesc(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <TextField
            type="number"
            id="standard-basic"
            label={<H4>Precio</H4>}
            variant="outlined"
            onChange={(e) => setPrice(e.target.value)}
          />
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="planeta">
            {" "}
            <H4>Planeta</H4>
          </InputLabel>
          <Select
            labelId="planeta"
            id="planeta"
            label="Planeta"
            value={categories}
            onChange={handleCategory}
            type="select"
            multiple
          >
            {cat.map((cat, id) => (
              <MenuItem key={id} value={cat.value}>
                <H4>{cat.title}</H4>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="subCategorias">
            {" "}
            <H4>SubCategorias</H4>
          </InputLabel>
          <Select
            labelId="subCategorias"
            id="subCategorias"
            label="Sub Categorias"
            value={subCategories}
            onChange={handleSubCategories}
            type="select"
            multiple
          >
            {subCats.map((subCat, id) => (
              <MenuItem key={id} value={subCat.value}>
                <H4>{subCat.title}</H4>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="talla">
            <H4>Talla</H4>
          </InputLabel>
          <Select
            labelId="talla"
            id="talla"
            value={size}
            label="Talla"
            onChange={handleSize}
            multiple
          >
            {sizes.map((size, id) => (
              <MenuItem key={id} value={size.value}>
                {size.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="genero">
            {" "}
            <H4>Género</H4>
          </InputLabel>
          <Select
            labelId="genero"
            id="genero"
            value={gender}
            label="Género"
            onChange={handleGender}
            type="select"
          >
            {genders.map((gender, id) => (
              <MenuItem key={id} value={gender.value}>
                <H4>{gender.title}</H4>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="color">
            {" "}
            <H4>Color</H4>
          </InputLabel>
          <Select
            labelId="color"
            id="color"
            value={color}
            label="Color"
            onChange={handleColor}
            type="select"
            multiple
          >
            {colors.map((color, id) => (
              <MenuItem key={id} value={color.value}>
                {color.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="stock">
            {" "}
            <H4>En Stock?</H4>
          </InputLabel>
          <Select
            labelId="stock"
            id="stock"
            value={inStock}
            label="En Stock"
            onChange={(e) => setInStock(e.target.value)}
          >
            <MenuItem value={true}>
              <H4>Si</H4>
            </MenuItem>
            <MenuItem value={false}>
              <H4>No</H4>
            </MenuItem>
          </Select>
        </FormControl>
        <CargarProducto type="submit">
          {" "}
          {createStatus === <H4>Pendiente</H4> ? (
            <H4>Cargando</H4>
          ) : (
            <H4>Cargar</H4>
          )}
        </CargarProducto>
      </StyledForm>

      <ImagePreview>
        {productImg ? (
          <>
            <img src={productImg} alt="Imagen de Producto" />{" "}
          </>
        ) : (
          <p>Previsualización de Imagen</p>
        )}
      </ImagePreview>
    </StyledCreateProduct>
  );
};

export default CreateProduct;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  select,
  input {
    padding: 10px;
    min-height: 20px;
    outline: none;
    border-radius: 5px;
  }
  select {
    color: rgb(95, 95, 95);
  }
`;

const StyledCreateProduct = styled.div`
  display: flex;
  justify-content: space-between;
`;
const CargarProducto = styled.button`
  cursor: pointer;
  width: 100%;
  color: primary;
  border-radius: 10px;
  margin-bottom: 1rem;
  border: 1px solid rgb(183, 183, 183);
`;

const ImagePreview = styled.div`
  margin: 2rem 0 2rem 2rem;
  border-radius: 10px;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgb(78, 78, 78);
  img {
    max-width: 100%;
  }
`;
