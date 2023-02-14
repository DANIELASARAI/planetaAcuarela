import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { setHeaders, url } from "../../slices/api";

const Order = () => {
  const params = useParams();
  const [order, setOrder] = useState({});

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const res = await axios.get(
          `${url}/orders/find/${params.id}`,
          setHeaders()
        );

        setOrder(res.data);
      } catch (error) {
        console.log(error.message);
      }
      setLoading(false);
    }
    fetchData();
  }, [params.id]);

  return (
    <StyledOrder>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <OrdersContainer>
            <h2>Detalles de Orden</h2>
            <p>
              {" "}
              Estado de pago:{" "}
              {order.payment_status === "accredited" && <Pagada>Pagada</Pagada>}
            </p>

            <p>
              Estado de envío:{" "}
              {order.delivery_status === "pending" ? (
                <Pending>Pendiente</Pending>
              ) : order.delivery_status === "dispatched" ? (
                <Dispatched>Despachado</Dispatched>
              ) : order.delivery_status === "delivered" ? (
                <Delivered>Enviado</Delivered>
              ) : (
                "error"
              )}
            </p>
            <h3>Productos Ordenados</h3>
            <Items>
              {order.products?.map((product, index) => (
                <Item key={index}>
                  <span>{product.quantity}</span>
                  <span>{product.title}</span>
                  <span>{"CLP " + product.unit_price}</span>
                </Item>
              ))}
            </Items>
            <div>
              <h3>Precio Total con Envío</h3>
              <p>{order.total + " CLP"}</p>
            </div>
            <h3>Detalles de Envío</h3>
            <p>Cliente: {order.name}</p>
            <p>Ciudad: {order.city}</p>
            <p>Dirección: {order.shipping}</p>
            <p>Email: {order.email}</p>
            <p>Teléfono: {order.phone}</p>
          </OrdersContainer>
        </>
      )}
    </StyledOrder>
  );
};

export default Order;

const StyledOrder = styled.div`
  margin: 3rem;
  display: flex;
  justify-content: center;
  h3 {
    margin: 1.5rem 0 0.5 rem 0;
  }
`;

const OrdersContainer = styled.div`
  max-width: 500px;
  width: 100%;
  height: auto;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 5px;
  padding: 2rem;
`;

const Items = styled.div`
  span {
    margin-right: 1.5rem;
    &:first-child {
      font-weight: bold;
    }
  }
`;

const Item = styled.div`
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Pending = styled.button`
  color: rgb(253, 181, 40);
  background-color: rgb(253, 181, 40, 0.12);
  padding: 3px 5px;
  border-radius: 12px;
  border: none;
  font-size: 14px;
`;
const Pagada = styled.button`
  color: #57ff57;
  background-color: #f3fef3;
  padding: 3px 5px;
  margin-bottom: 0.5rem;
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
