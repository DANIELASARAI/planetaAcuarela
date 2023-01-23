import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "./Sidebar";

/* const Wrapper = styled(Box)(({ theme, show }) => ({
  paddingLeft: "3rem",
  display: "table",
  paddingRight: "3rem",
  transition: "all 0.3s",
  marginLeft: show ? 320 : 80,
  [theme.breakpoints.down(1200)]: {
    width: "100%",
    marginLeft: 2,
    paddingLeft: "2rem",
    paddingRight: "2rem",
  },
})); */

const Dashboard = ({ children }) => {
  const auth = useSelector((state) => state.auth);

  if (!auth.isAdmin)
    return <p>Acceso denegado, usted no es un Administrador!</p>;

  return (
    <StyledDashboard>
      <Sidebar />
      <Content>
        <Outlet />
      </Content>
    </StyledDashboard>
  );
};

export default Dashboard;

const Content = styled.div`
  margin-right: 150px;
  margin-left: 5px;
  padding: 2rem 3rem;
  width: 100%;
`;

const StyledDashboard = styled.div`
  display: flex;
  height: 100vh;
`;
