import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { usersDelete, usersFetch } from "../../redux/usersredux";

export default function AdminUsersList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.users);
  console.log("🚀 ~ file: AdminUsersList.jsx:14 ~ AdminUsersList ~ list", list);

  useEffect(() => {
    dispatch(usersFetch);
  }, [dispatch]);

  const rows = list?.map((user) => {
    return {
      id: user._id,
      uName: user.name,
      uEmail: user.email,
      isAdmin: user.isAdmin,
    };
  });

  const columns = [
    { field: "id", headerName: "ID", width: 230 },
    {
      field: "uName",
      headerName: "Nombre",
      width: 150,
    },
    { field: "uEmail", headerName: "Email", width: 300 },
    {
      field: "isAdmin",
      headerName: "Rol",

      width: 100,
      renderCell: (params) => {
        return (
          <div>
            {params.row.isAdmin ? (
              <Admin>Admin</Admin>
            ) : (
              <Customer>Usuario</Customer>
            )}
          </div>
        );
      },
    },

    {
      field: "actions",
      headerName: "Acciones",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 120,
      renderCell: (params) => {
        return (
          <Actions>
            <Delete onClick={() => handleDelete(params.row.id)}>Borrar</Delete>

            <View onClick={() => navigate(`/user/${params.row.id}`)}>Ver</View>
          </Actions>
        );
      },
    },
  ];

  const handleDelete = (id) => {
    dispatch(usersDelete(id));
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

const Admin = styled.div`
  color: rgb(253, 181, 40);
  background: rgb(253, 181, 40, 0.12);
  padding: 5px 5px;
  border-radius: 12px;
  font-size: 14px;
`;
const Customer = styled.div`
  color: rgb(38, 198, 249);
  background: rgb(38, 198, 249, 0.12);
  padding: 5px 5px;
  border-radius: 12px;
  font-size: 14px;
`;
