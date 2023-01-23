import { DataGrid } from "@mui/x-data-grid";
import * as React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

export default function AdminProductsList() {
  const { items } = useSelector((state) => state.products);

  const rows = items?.map((item) => {
    return {
      id: item._id,
      imageUrl: item.image.url,
      pName: item.name,
      pDesc: item.desc,
      price: item.price.toLocaleString(),
    };
  });

  const columns = [
    { field: "id", headerName: "ID", width: 250 },
    {
      field: "imageUrl",
      headerName: "Imagen",
      width: 100,
      renderCell: (params) => {
        return (
          <ImageContainer>
            <img src={params.row.imageUrl} alt="" />
          </ImageContainer>
        );
      },
    },
    { field: "pName", headerName: "Nombre", width: 150 },
    {
      field: "pDesc",
      headerName: "Descripción",

      width: 350,
    },
    {
      field: "price",
      headerName: "Precio",

      width: 120,
    },
    {
      field: "actions",
      headerName: "Acciones",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 150,
      renderCell: (params) => {
        return (
          <Actions>
            <Delete>Borrar</Delete>
            <View>Ver</View>
          </Actions>
        );
      },
    },
  ];
  return (
    <>
      <div style={{ height: 600, width: 1200 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
        />
      </div>
    </>
  );
}

const ImageContainer = styled.div`
  img {
    height: 40px;
  }
`;

const Actions = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  button {
    border: none;
    outline: none;
    padding: 5px 5px;
    color: white;
    border-radius: 12px;
    cursor: pointer;
  }
`;

const Delete = styled.button`
  background-color: rgb(255, 77, 73);
`;

const View = styled.button`
  background-color: rgb(0, 192, 163);
`;
