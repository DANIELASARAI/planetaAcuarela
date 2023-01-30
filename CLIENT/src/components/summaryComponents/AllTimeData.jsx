import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { setHeaders, url } from "../../slices/api";
const AllTimeData = () => {
  const { items } = useSelector((state) => state.products);
  const [orders, setOrders] = useState([]);
  const [income, setIncome] = useState([]);
  const [users, setUsers] = useState([]);
  console.log("🚀 ~ file: AllTimeData.jsx:11 ~ AllTimeData ~ users", users);

  //Get Total History Orders
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${url}/orders/?new=true`, setHeaders());
        setOrders(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  //Get Total History Incomes
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${url}/orders/income`, setHeaders());
        setIncome(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  //Get Total History Users
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${url}/users`, setHeaders());
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  return (
    <>
      <Main>
        <Title> 🌌 Desde el Big Bang</Title>
        <Info>
          <Title>Usuarios</Title>
          <Data>{users.length}</Data>
        </Info>
        <Info>
          <Title>Productos</Title>
          <Data>{items.length}</Data>
        </Info>
        <Info>
          <Title>Órdenes</Title>
          <Data>{orders.length}</Data>
        </Info>
        <Info>
          <Title>Ganancias</Title>
          <Data>CLP {income[0]?.total}</Data>
        </Info>
      </Main>
    </>
  );
};

export default AllTimeData;

const Main = styled.div`
  background: rgb(48, 51, 78);
  color: rgba(234, 234, 255, 0.87);
  margin-top: 1.5rem;
  width: 92%;
  border-radius: 5px;
  padding: 1rem;
  font-size: 14px;
`;

const Info = styled.div`
  display: flex;
  margin-top: 1rem;
  padding: 0.3rem;
  border-radius: 3px;
  background: rgba(38, 198, 249, 0.12);
  &:nth-child(even) {
    background: rgba(102, 108, 255, 0.12);
  }
`;

const Title = styled.div`
  flex: 1;
  font-size: 15px;
  margin-left: 1rem;
`;

const Users = styled.div`
  flex: 1;
`;

const Data = styled.div`
  flex: 1;
  font-weight: 700;
`;
