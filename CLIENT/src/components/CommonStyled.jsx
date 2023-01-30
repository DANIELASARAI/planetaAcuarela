import styled from "styled-components";

export const AdminHeaders = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;
export const AdminProductsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
`;

export const Title = styled.div`
  font-size: 22px;

  p {
    font-family: Yomogi;
    font-size: 20px;
    color: rgba(234, 234, 255, 0.68);
  }
`;

export const H1 = styled.h1`
  font-weight: bold;
  font-family: Poppins;
  font-size: 20px;
  color: gray;
`;

export const PrimaryButton = styled.button`
  padding: 9px 12px;
  border-radius: 15px;
  font-weight: 600;
  letter-spacing: 1.15px;
  font-family: Yomogi;
  background-color: #0bd7d0;
  color: #ffff;
  border: none;
  outline: none;
  cursor: pointer;
  margin: 0.5rem 0;
`;
