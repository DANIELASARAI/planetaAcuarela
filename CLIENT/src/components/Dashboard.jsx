import { Box, styled } from "@mui/material";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Wrapper = styled(Box)(({ theme, show }) => ({
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
}));

const InnerWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    maxWidth: 1200,
    margin: "auto",
  },
}));

const Dashboard = ({ children }) => {
  const auth = useSelector((state) => state.auth);

  if (!auth.isAdmin)
    return <p>Acceso denegado, usted no es un Administrador!</p>;

  return (
    <Fragment>
      <Wrapper>
        <Sidebar />
        <InnerWrapper>{children || <Outlet />}</InnerWrapper>
      </Wrapper>
    </Fragment>
  );
};

export default Dashboard;
