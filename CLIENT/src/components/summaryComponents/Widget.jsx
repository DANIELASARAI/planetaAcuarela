import React from "react";
import styled from "styled-components";
import { H3 } from "../Typography";
const Widget = ({ data }) => {
  return (
    <StyledWidget>
      <Icon color={data.color} bgcolor={data.bgcolor}>
        {data.Icon}
      </Icon>
      <Text>
        <H3>
          {data.isMoney
            ? "CLP " + data.digits?.toLocaleString()
            : data.digits?.toLocaleString()}
        </H3>
        <p>{data.title}</p>
      </Text>
      {data.percentage < 0 ? (
        <>
          <Percentage isPositive={false}>
            {Math.floor(data.percentage) + "%"}
          </Percentage>
        </>
      ) : (
        <>
          <Percentage isPositive={true}>
            {Math.floor(data.percentage) + "%"}
          </Percentage>
        </>
      )}
    </StyledWidget>
  );
};

export default Widget;

const StyledWidget = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  margin-right: 0.5 rem;
  padding: 0.1rem;
  color: ${({ color }) => color};
  background: ${({ bgcolor }) => bgcolor};
  border-radius: 3px;
  font-size: 12px;
`;

const Text = styled.div`
  padding-left: 0.5rem;
  h3 {
    font-weight: 900;
    font-size: 20px;
  }
  p {
    font-size: 15px;
    color: rgba(234, 234, 255, 0.68);
  }
`;

const Percentage = styled.div`
  margin-left: 0.5rem;
  font-size: 18px;
  color: ${({ isPositive }) =>
    isPositive ? "rgb(115, 250, 40)" : "rgb(255, 77, 73)"};
`;
