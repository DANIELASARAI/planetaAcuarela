import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { productsDelete } from "../../redux/productsRedux";
import EditProduct from "../admin/EditProduct";

export default function AdminProductsList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

      width: 90,
    },
    {
      field: "actions",
      headerName: "Acciones",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 180,
      renderCell: (params) => {
        return (
          <Actions>
            <Delete onClick={() => handleDelete(params.row.id)}>Borrar</Delete>
            <EditProduct prodId={params.row.id} />
            <View onClick={() => navigate(`/producto/${params.row.id}`)}>
              Ver
            </View>
          </Actions>
        );
      },
    },
  ];

  const handleDelete = (id) => {
    dispatch(productsDelete(id));
  };

  return (
    <>
      <div style={{ height: 600, width: 1200 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          disableSelectionOnClick
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
