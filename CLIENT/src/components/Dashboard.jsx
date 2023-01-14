import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const auth = useSelector((state) => state.auth);

  if (!auth.isAdmin)
    return <p>Acceso denegado, usted no es un Administrador!</p>;

  return (
    <>
      {/*      <Navbar /> */}
      <StyledDashboard>
        <Sidebar />
        {/* <SideNav>
          <Title>Admin Planet</Title>
          <NavLink
            className={({ isActive }) =>
              isActive ? "link-active" : "link-inactive"
            }
            to="/admin/summary"
          >
            Summary
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "link-active" : "link-inactive"
            }
            to="/admin/products"
          >
            Products
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "link-active" : "link-inactive"
            }
            to="/admin/orders"
          >
            Orders
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "link-active" : "link-inactive"
            }
            to="/admin/users"
          >
            Users
          </NavLink>
        </SideNav> */}
        <Content>
          <Outlet />
        </Content>
      </StyledDashboard>
    </>
  );
};

export default Dashboard;

const StyledDashboard = styled.div`
  display: flex;
  height: 100vh;
`;

const Title = styled.span`
  font-weight: 400;
  font-family: Poppins;
  font-size: 20px;
  color: #1b3f65;
  cursor: pointer;
  padding: 1rem;
`;

const SideNav = styled.div`
  border-right: 1px solid gray;
  height: calc(100vh - 70px);
  position: fixed;
  overflow-y: auto;
  width: 150px;
  display: flex;

  flex-direction: column;
  padding: 2rem;
  h3 {
    margin: 0 0 1rem 0;
    padding: 0;
    text-transform: uppercase;
    font-size: 17px;
  }
  a {
    text-decoration: none;
    margin-bottom: 1rem;
    font-size: 14px;
    font-family: Poppins;
  }
`;

const Content = styled.div`
  margin-left: 200px;
  padding: 2rem 3rem;
  width: 100%;
`;
