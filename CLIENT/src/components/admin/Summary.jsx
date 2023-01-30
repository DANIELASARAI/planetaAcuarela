import { MoneyOutlined, PieChartOutlined } from "@mui/icons-material";
import { useTheme } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import User from "../../icons/User";
import { mobile } from "../../responsive";
import { setHeaders, url } from "../../slices/api";
import AllTimeData from "../summaryComponents/AllTimeData";
import Chart from "../summaryComponents/Chart";
import Transactions from "../summaryComponents/Transactions";
import Widget from "../summaryComponents/Widget";
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
      digits: income[0]?.total ? income[0]?.total : "0",
      isMoney: true,
      title: "Ganancias",
      color: theme.palette.success.dark,
      bgcolor: theme.palette.success.light,
      percentage: incomePerc,
    },
  ];

  const StyledSummary = styled.div`
    width: 60%;
    display: flex;
    padding-top: 2rem;
    ${mobile({
      flexDirection: "column",

      justifyContent: "space-between",
      width: "60%",
      marginTop: "20px",
      marginRight: "25px",
      marginLeft: "5px",
    })};
  `;

  const MainStats = styled.div`
    flex: 2;
    width: 100%;
    ${mobile({
      marginRight: "20px",
      width: "100%",
    })};
  `;

  const Title = styled.div`
    font-size: 22px;

    p {
      font-family: Yomogi;
      font-size: 20px;
      color: rgba(234, 234, 255, 0.68);
    }
  `;
  const WidgetWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    ${mobile({
      flexDirection: "column",
      height: "600px",
    })};
  `;
  const Icon = styled.div`
    margin-right: 0.5 rem;
    padding: 0.5rem;
    color: ${({ color }) => color};
    background: ${({ bgcolor }) => bgcolor};
    border-radius: 3px;
    font-size: 10px;
  `;

  const SideStats = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 5rem;
    width: 100%;
    ${mobile({
      flex: 2,
      marginTop: "20px",
      marginLeft: "15px",

      width: "300px",
    })};
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
    ${mobile({
      height: "350px",
      width: "250px",
      marginLeft: "20px",
    })};
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
        <Chart />
      </MainStats>
      <SideStats>
        <Transactions />
        <AllTimeData />
      </SideStats>
    </StyledSummary>
  );
};

export default Summary;
