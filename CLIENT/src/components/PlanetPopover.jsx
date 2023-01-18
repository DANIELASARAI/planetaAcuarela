import PublicIcon from "@mui/icons-material/Public";
import { Box, ButtonBase, Divider, styled } from "@mui/material";
import { H6, Small, Tiny } from "./Typography";

import { Fragment, useRef, useState } from "react";

import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import PopoverLayout from "./PopoverLayout"; // styled components

const StyledButtonBase = styled(ButtonBase)(({ theme }) => ({
  padding: 5,
  marginLeft: 4,
  borderRadius: 30,
  border: `1px none ${theme.palette.divider}`,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));
const StyledSmall = styled(Small)(({ theme }) => ({
  display: "block",
  cursor: "pointer",
  padding: "5px 1rem",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const PlanetPopover = () => {
  const anchorRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { items: data, status } = useSelector((state) => state.products);
  const [productsByCat, setProductsByCat] = useState([]);
  /*   const { logout, user } = useAuth(); */
  const [open, setOpen] = useState(false);

  const handleMenuItem = (path) => {
    navigate(path);
    setOpen(false);
  };

  /*  const handleLogout = () => {
    logout();
    navigate("/login");
  }; */

  return (
    <Fragment>
      <StyledButtonBase
        disableRipple
        ref={anchorRef}
        onClick={() => setOpen(true)}
      >
        <Small fontWeight="600" display="inline">
          <PublicIcon />
        </Small>
      </StyledButtonBase>

      <PopoverLayout
        hiddenViewButton
        maxWidth={230}
        minWidth={200}
        popoverOpen={open}
        anchorRef={anchorRef}
        popoverClose={() => setOpen(false)}
        title={
          <Box>
            <H6>{/* user?.name || */ "Ya estas registrado?"}</H6>
            <Tiny display="block" fontWeight={500} color="text.disabled">
              {/* user?.email || */ "Házlo y obten más descuentos."}
            </Tiny>
          </Box>
        }
      >
        <Box pt={1}>
          <StyledSmall onClick={() => handleMenuItem("/products/kids")}>
            Kids
          </StyledSmall>

          <StyledSmall onClick={() => handleMenuItem("/products/music")}>
            Music
          </StyledSmall>

          <StyledSmall onClick={() => handleMenuItem("/products/sports")}>
            Sports
          </StyledSmall>

          <StyledSmall onClick={() => handleMenuItem("/products/tv")}>
            TV
          </StyledSmall>

          <StyledSmall onClick={() => handleMenuItem("/products/hogar")}>
            Hogar
          </StyledSmall>

          <Divider
            sx={{
              my: 1,
            }}
          />
        </Box>
      </PopoverLayout>
    </Fragment>
  );
};

export default PlanetPopover;
