import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
//1.8a npm install @mui/icons-material @mui/material @emotion/styled @emotion/react and import it
//1.13.1
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
//1) We are gonna use styled components, instead of div, we use our Container to use our style component, npm i styled-components
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { Badge, Button } from "@mui/material";
import { toast } from "react-toastify";
import styled from "styled-components";
import { logoutUser } from "../redux/authRedux";
import { mobile } from "../responsive";

import logo from "../img/acuarela.png";

//1.1 We could use div className container and create a css file .container class,
//or we can use styled container like this Useful for larger applications.
//For the child and parent not to have conflict when having same class container. Useful for larger applications.

const Container = styled.div`
  height: 60px;
  position: sticky;
  top: 0;

  width: 100%;

  background-color: ${(props) =>
    props.admin === "/admin" ||
    props.admin === "/admin/summary" ||
    props.admin === "/admin/products" ||
    props.admin === "/admin/users" ||
    props.admin === "/admin/orders"
      ? "#b279a8"
      : "#fffe"};
  ${mobile({ height: "50px" })}
`;
//1.2 Wrapper, add padding to left ant top.
const Wrapper = styled.div`
  padding: 5px 20px;

  display: flex; //1.4 to make them horizontally
  justify-content: space-between; //1.5 add space bettween them
  //1.10
  align-items: center;
  ${mobile({ padding: "10px 0px" })}
`;

//1.3 Left, Center, Right
const Left = styled.div`
  display: flex; //1.8b to display the search icon horizontally
  flex: 1; //1.6 to have width for the three values, try not width: 33% it won't work
  align-items: center;
  margin-bottom: 12px;
`;
const Center = styled.div`
  flex: 1; //1.6a if we put flex: 2 we get double space for center element
  //11.12.2 align the logo text, then find icons to the right element
  text-align: center;
`;
//1.12 Logo, and insert it into center container
const Logo = styled.h1`
  font-weight: bold;
  font-family: Poppins;
  font-size: 20px;
  ${mobile({ fontSize: "16px", padding: "0px 5px" })};
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  //1.14
  justify-content: flex-end;
  ${mobile({ flex: 3, justifyContent: "center" })};
`;
//1.13 Create the items for the right side, then insert into Right container,
// import the badge and icons

const StyledIconButton = styled(Button)(() => ({
  marginBottom: "1rem",

  justifyContent: "center",
  "&:hover": {
    backgroundColor: "transparent",
  },
}));
const AcuarelaLogo = styled(Button)(() => ({
  marginBottom: "1rem",
  fontFamily: "Yomogi",
  fontWeight: "600",
  justifyContent: "center",
  "&:hover": {
    backgroundColor: "transparent",
  },
}));

const MenuItem = styled.div`
  font-size: 12px;
  color: #853b7d;
  cursor: pointer;
  //1.15 After 1.15, go and create  Announcement component
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })};
`;
const AdminItem = styled.div`
  font-size: 12px;

  cursor: pointer;
  display: flex;
  font-family: Poppins;
  margin-left: 25px;
  color: #853b7d;

  ${mobile({ fontSize: "12px", marginLeft: "10px" })};
`;
//1.7 Language element, to then be displayed on Left parent
const Language = styled.span`
  font-size: 12px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

//1.8 Search Container
const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  //1.9
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

//1.11 Input Container, inside the Search container
const Input = styled.input`
  border: none;
  ${mobile({ width: "40px" })};
  border-radius: 15px;
`;

const Navbar = () => {
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const adminPath = location.pathname;

  const handleHome = () => {
    navigate("/");
  };

  return (
    <Container admin={adminPath}>
      <Wrapper>
        <Left>
          <StyledIconButton onClick={handleHome}>
            <img src={logo} width={80} />
          </StyledIconButton>
        </Left>
        <Center></Center>
        <Right>
          {auth._id ? (
            <Right admin={adminPath}>
              {auth.isAdmin ? (
                <AdminItem onClick={() => navigate("/admin")}>
                  <AdminPanelSettingsIcon />
                </AdminItem>
              ) : null}
              <MenuItem
                onClick={() => {
                  dispatch(logoutUser(null));
                  toast.warning("Sesión Cerrada!", { position: "bottom-left" });
                }}
              >
                <LogoutIcon />
              </MenuItem>
            </Right>
          ) : (
            <>
              <Link to="/register">
                <MenuItem>
                  <AppRegistrationIcon />
                </MenuItem>
              </Link>
              <Link to="/login">
                <MenuItem>
                  <LoginIcon />
                </MenuItem>
              </Link>
            </>
          )}

          {cartTotalQuantity > 0 && (
            <Link to="/cart">
              <MenuItem>
                <Badge badgeContent={cartTotalQuantity} color="success">
                  <ShoppingCartTwoToneIcon />
                </Badge>
              </MenuItem>
            </Link>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
