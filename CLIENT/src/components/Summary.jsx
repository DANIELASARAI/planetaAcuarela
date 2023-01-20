import { MoneyOutlined, PieChartOutlined } from "@mui/icons-material";
import { useTheme } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import User from "../icons/User";
import { setHeaders, url } from "../slices/api";
import Widget from "./summaryComponents/Widget";
const Summary = () => {
  const theme = useTheme();

  const [users, setUsers] = useState([]);
  const [usersPerc, setUsersPerc] = useState(0);
  const [orders, setOrders] = useState([]);
  const [ordersPerc, setOrdersPerc] = useState(0);
  const [income, setIncome] = useState([]);
  const [incomePerc, setIncomePerc] = useState(0);
  console.log("🚀 ~ file: Summary.jsx:17 ~ Summary ~ income", income);
  console.log("🚀 ~ file: Summary.jsx:19 ~ Summary ~ incomePerc", incomePerc);

  function compare(a, b) {
    if (a._id < b._id) {
      return 1;
    }
    if (a._id > b._id) {
      return -1;
    }
    return 0;
  }

  //Fetching Users
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${url}/users/stats`, setHeaders());
        res.data.sort(compare);
        console.log(
          "🚀 ~ file: Summary.jsx:23 ~ fetchData ~ response data",
          res.data
        );
        setUsers(res.data);
        setUsersPerc(
          ((res.data[0].total - res.data[1].total) / res.data[1].total) * 100
        );
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  //Fetching Orders
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${url}/orders/stats`, setHeaders());
        res.data.sort(compare);
        setOrders(res.data);
        setOrdersPerc(
          ((res.data[0].total - res.data[1].total) / res.data[1].total) * 100
        );
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  //Fetching Incomes
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${url}/orders/income/stats`, setHeaders());
        res.data.sort(compare);
        setIncome(res.data);
        setIncomePerc(
          ((res.data[0].total - res.data[1].total) / res.data[1].total) * 100
        );
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const data = [
    {
      Icon: <User />,
      digits: users[0]?.total,
      isMoney: false,
      title: "Usuarios",
      color: theme.palette.info.main,
      percentage: usersPerc,
      bgcolor: theme.palette.info.light,
    },
    {
      Icon: <PieChartOutlined />,
      digits: orders[0]?.total,
      isMoney: false,
      title: "Órdenes",
      color: theme.palette.secondary.dark,
      bgcolor: theme.palette.secondary.light,
      percentage: ordersPerc,
    },
    {
      Icon: <MoneyOutlined />,
      digits: income[0]?.total,
      isMoney: true,
      title: "Ganancias",
      color: theme.palette.success.dark,
      bgcolor: theme.palette.success.light,
      percentage: incomePerc,
    },
  ];

  const StyledSummary = styled.div`
    width: 100%;
    display: flex;
    padding-left: 6rem;
    padding-top: 2rem;
  `;

  const MainStats = styled.div`
    flex: 2;
    width: 100%;
  `;

  const Title = styled.div`
    font-size: 20px;

    p {
      font-family: Yomogi;
      font-size: 12px;
      color: rgba(234, 234, 255, 0.68);
    }
  `;
  const WidgetWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
  `;
  const Icon = styled.div`
    margin-right: 0.5 rem;
    padding: 0.5rem;
    color: ${({ color }) => color};
    background: ${({ bgcolor }) => bgcolor};
    border-radius: 3px;
    font-size: 20px;
  `;

  const SideStats = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 2rem;
    width: 100%;
  `;
  const Overview = styled.div`
    color: rgba(234, 234, 255, 0.87);
    background: #603b81;
    width: 100%;
    padding: 1.5rem;
    height: 170px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `;

  return (
    <StyledSummary>
      <MainStats>
        <Overview>
          <Title>
            Resumen
            <p>Rendimiento de tu tienda en comparación al mes anterior.</p>
          </Title>
          <WidgetWrapper>
            {data?.map((data, index) => (
              <Widget key={index} data={data} />
            ))}
          </WidgetWrapper>
        </Overview>
      </MainStats>
      <SideStats></SideStats>
    </StyledSummary>
  );
};

export default Summary;
