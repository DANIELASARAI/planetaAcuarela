import { Box, Card } from "@mui/material";
import FlexBox from "../components/Flexbox";
import { Paragraph } from "../components/Typography";

import City from "../icons/City";

import React from "react"; // -----------------------------------------------------

// -----------------------------------------------------
const BillingAddressCard = ({ selectedValue, values }) => {
  return (
    <>
      {values && (
        <Card
          sx={{
            padding: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: selectedValue ? "1px solid" : 0,
            borderColor: "primary.main",
          }}
        >
          <Box>
            <FlexBox alignItems="center" gap={1} mb={1}>
              <City
                sx={{
                  color: "text.disabled",
                }}
              />
            </FlexBox>

            <Paragraph className="addressCard">
              {values.name} <br />
              <span>{values.phone}</span> <br />
              {values.address} <br />
              {values.city} {values.postal} <br />
              <span className="email">{values.email}</span>
              <br />
              {values.country} <br />
              RUT: {values.RUT ? values.RUT : "N / A"}
            </Paragraph>
          </Box>
        </Card>
      )}
    </>
  );
};

export default BillingAddressCard;
