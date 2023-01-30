import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import styled from "styled-components";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import {
  Box,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { cat, colors, genders, sizes, subCats } from "../../data";
import { productsEdit } from "../../redux/productsRedux";
import { mobile } from "../../responsive";

import { H4 } from "../Typography";
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

export default function EditProduct({ prodId }) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { items, editStatus } = useSelector((state) => state.products);
  const [currentProd, setCurrentProd] = useState({});
  const [previewImg, setPreviewImg] = useState("");
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

  const handleClickOpen = () => {
    setOpen(true);
    let selectedProd = items.filter((item) => item._id === prodId);
    selectedProd = selectedProd[0];
    setCurrentProd(selectedProd);
    setPreviewImg(selectedProd.image.url); //To see what we have currently
    setProductImg(""); //Approach to Cloudinary
    setName(selectedProd.name);
    setDesc(selectedProd.desc);

    setPrice(selectedProd.price);
    setCategories(selectedProd.categories);
    setSubCategories(selectedProd.subCategories);
    setGender(selectedProd.gender);
    setSize(selectedProd.size);
    setColor(selectedProd.color);
    setInStock(selectedProd.inStock);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        setPreviewImg(reader.result);
      };
    } else {
      setProductImg("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      productsEdit({
        productImg,
        product: {
          ...currentProd,
          name: name,
          categories: categories,
          subCategories: subCategories,
          gender: gender,
          price: price,
          desc: desc,
          size: size,
          color: color,
          inStock: inStock,
        },
      })
    );
  };

  const handleCategory = (e) => {
    let values = Array.from(e.target.value);
    setCategories(values);
  };
  const handleSize = (e) => {
    let sizeValues = Array.from(e.target.value);
    setSize(sizeValues);
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
  };

  return (
    <div>
      <Edit variant="outlined" onClick={handleClickOpen}>
        Editar
      </Edit>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"xl"}
      >
        <DialogTitle>Editar Producto</DialogTitle>
        <DialogContent>
          <StyledEditProduct>
            <StyledForm onSubmit={handleSubmit}>
              <ThemeProvider theme={theme}>
                <Box
                  sx={{
                    width: 300,
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <TextField
                  id="standard-basic"
                  label={<H4>Descripción</H4>}
                  variant="outlined"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <TextField
                  type="number"
                  id="standard-basic"
                  label={<H4>Precio</H4>}
                  value={price}
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
                {editStatus === "pending" ? <H4>Editando</H4> : <H4>Editar</H4>}
              </CargarProducto>
            </StyledForm>

            <ImagePreview>
              {previewImg ? (
                <>
                  <img src={previewImg} alt="Imagen de Producto" />{" "}
                </>
              ) : (
                <p>Previsualización de Imagen</p>
              )}
            </ImagePreview>
          </StyledEditProduct>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const Edit = styled.button`
border: none;
outline: none;
padding; 3px 5px;
color: white;
border-radius: 3px;
cursor: pointer;
background-color: #4b70e2`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: 6rem;
  select,
  input {
    padding: 7px;
    min-height: 30px;
    outline: none;
    border-radius: 5px;
  }
  select {
    color: rgb(95, 95, 95);
  }
  ${mobile({ margin: "1rem 0.5rem 1rem" })}
`;

const StyledEditProduct = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const CargarProducto = styled.button`
  cursor: pointer;
  width: 90%;
  padding: 1.5rem;
  color: white;
  border-radius: 20px;
  margin-top: 1rem;
  margin-left: 1rem;
  border: 1px solid rgb(183, 183, 183);
  background-color: #b279a8;
`;

const ImagePreview = styled.div`
  margin: 6rem 4rem 6rem 4rem;
  border-radius: 10px;
  width: 100%;

  border: 1px solid rgb(183, 183, 183);
  ${mobile({ width: "65%", height: "15vh", margin: "0  2rem 0 0 " })};
  display: flex;
  align-items: center;
  padding: 2rem;
  justify-content: center;

  color: rgb(78, 78, 78);
`;
const CreatePicture = styled.div`
  ${mobile({ display: "none" })};
  margin: 6rem 12rem 6rem 4rem;
  border: "none";
  max-width: 150px;
  width: 100%;
  display: flex;
  align-items: end;
  justify-content: end;
`;
