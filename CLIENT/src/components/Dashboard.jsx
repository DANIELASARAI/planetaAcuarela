import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import Picture from "../img/adminDashboard.webp";
import { mobile } from "../responsive";
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
  const location = useLocation();
  const adminPath = location.pathname === "/admin";

  if (!auth.isAdmin)
    return <p>Acceso denegado, usted no es un Administrador!</p>;

  return (
    <StyledDashboard>
      <Sidebar />
      <Content>
        <Outlet />
        {adminPath ? (
          <CreatePicture>
            {" "}
            <img src={Picture} width={800} />
          </CreatePicture>
        ) : null}
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

const CreatePicture = styled.div`
  ${mobile({ display: "none" })};
  margin: 6rem 12rem 20rem 20rem;
  border: "none";
  max-width: 350px;
  width: 100%;
  display: flex;
  align-items: end;
  justify-content: end;
`;
