import { MoneyOutlined, PieChartOutlined } from "@mui/icons-material";
import { useTheme } from "@mui/material";
import React from "react";
import styled from "styled-components";

import User from "../icons/User";
import Widget from "./summaryComponents/Widget";

const Summary = () => {
  const theme = useTheme();
  const data = [
    {
      Icon: <User />,
      digits: 50,
      isMoney: false,
      title: "Usuarios",
      color: theme.palette.info.main,
      percentage: 30,
      bgcolor: theme.palette.info.light,
    },
    {
      Icon: <PieChartOutlined />,
      digits: 70,
      isMoney: false,
      title: "Órdenes",
      color: theme.palette.secondary.dark,
      bgcolor: theme.palette.secondary.light,
      percentage: -20,
    },
    {
      Icon: <MoneyOutlined />,
      digits: 500000,
      isMoney: true,
      title: "Ganancias",
      color: theme.palette.success.dark,
      bgcolor: theme.palette.success.light,
      percentage: 60,
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
