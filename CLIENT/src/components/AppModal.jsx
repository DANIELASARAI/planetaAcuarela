import { Box, Modal, styled } from "@mui/material";
import React from "react";

// ---------------------------------------------------------
const Wrapper = styled(Box)(() => ({
  top: "50%",
  left: "50%",
  padding: 24,
  maxWidth: 680,
  width: "100%",
  borderRadius: "4px",
  position: "absolute",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#fff",
}));

const AppModal = ({ children, open, handleClose, ...props }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Wrapper {...props}>{children}</Wrapper>
    </Modal>
  );
};

export default AppModal;
