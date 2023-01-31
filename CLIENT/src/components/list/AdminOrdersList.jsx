import React from "react";

import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ordersEdit, ordersFetch } from "../../redux/ordersRedux";

export default function AdminOrdersList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.orders);

  React.useEffect(() => {
    dispatch(ordersFetch);
  }, [dispatch]);

  const rows = list?.map((order) => {
    return {
      id: order._id,
      cName: order.shipping.name,
      amount: order.total,
      dStatus: order.delivery_status,
      date: moment(order.createdAt).fromNow(),
    };
  });

  const columns = [
    { field: "id", headerName: "ID", width: 250 },
    {
      field: "cName",
      headerName: "Nombre",
      width: 200,
    },
    { field: "amount", headerName: "Monto", width: 150 },
    {
      field: "dStatus",
      headerName: "Estado del envío",

      width: 120,
      renderCell: (params) => {
        return (
          <div>
            {params.row.dStatus === "pending" ? (
              <Pending>Pendiente</Pending>
            ) : params.row.dStatus === "dispatched" ? (
              <Dispatched>Despachado</Dispatched>
            ) : params.row.dStatus === "delivered" ? (
              <Delivered>Enviado</Delivered>
            ) : (
              "error"
            )}
          </div>
        );
      },
    },
    {
      field: "date",
      headerName: "Fecha",

      width: 120,
    },
    {
      field: "actions",
      headerName: "Acciones",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 300,
      renderCell: (params) => {
        return (
          <Actions>
            <DispatchBtn onClick={() => handleOrderDispatch(params.row.id)}>
              Despachar
            </DispatchBtn>
            <DeliveredBtn onClick={() => handleOrderDelivered(params.row.id)}>
              Enviar
            </DeliveredBtn>
            <View onClick={() => navigate(`/orden/${params.row.id}`)}>Ver</View>
          </Actions>
        );
      },
    },
  ];

  const handleOrderDispatch = (id) => {
    dispatch(ordersEdit({ id, delivery_status: "dispatched" }));
  };
  const handleOrderDelivered = (id) => {
    dispatch(ordersEdit({ id, delivery_status: "delivered" }));
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

const DispatchBtn = styled.button`
  background-color: rgb(38, 198, 249);
`;
const DeliveredBtn = styled.button`
  background-color: rgb(102, 108, 255);
`;
const View = styled.button`
  background-color: rgb(0, 192, 163);
`;
const Pending = styled.button`
  color: rgb(253, 181, 40);
  background-color: rgb(253, 181, 40, 0.12);
  padding: 3px 5px;
  border-radius: 12px;
  border: none;
  font-size: 14px;
`;
const Dispatched = styled.button`
  color: rgb(38, 198, 249);
  background-color: rgb(38, 198, 249, 0.12);
  padding: 3px 5px;
  border-radius: 12px;
  border: none;
  font-size: 14px;
`;
const Delivered = styled.button`
  color: rgb(102, 108, 255);
  background-color: rgb(102, 108, 255, 0.12);
  padding: 3px 5px;
  border-radius: 12px;
  border: none;
  font-size: 14px;
`;

const Actions = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  button {
    border: none;
    outline: none;
    padding: 5px 8px;
    color: white;
    border-radius: 12px;
    cursor: pointer;
  }
`;
