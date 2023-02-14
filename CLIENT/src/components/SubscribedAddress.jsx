import { Button, Grid, RadioGroup, Stack, styled } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Box } from "@mui/system";
import React, { useState } from "react";
import Add from "../icons/Add";
import Shopping from "../icons/Shopping";
import BillingAddressCard from "../page-sections/BillingAddressCard";
import Heading from "../page-sections/Heading";
import Stepper from "../page-sections/Stepper";
import AppModal from "./AppModal";
import AppRadio from "./AppRadio";
import AppTextField from "./AppTextField";
import FlexBetween from "./FlexBetween";
import FlexBox from "./Flexbox";
import { H5 } from "./Typography";

import Delete from "../icons/Delete";
import MercadoSummary from "../page-sections/MercadoSummary";
import { EmailClient } from "./EmailClient";

const StyledFormControlLabel = styled(FormControlLabel)(() => ({
  "& .MuiTypography-root": {
    fontSize: 12,
    fontWeight: 600,
  },
}));

const SubscribedAddress = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState("RUT");

  const [values, setValues] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const handleNif = () => {
    localStorage.clear();
  };

  const changeHandler = (ev) => {
    console.log(ev.target.value);
    localStorage.setItem(ev.target.name, ev.target.value);
  };

  const handleSubmit = (e) => {
    setValues(localStorage);
    console.log(values);
    setOpenModal(false);
  };
  return (
    <Box pt={2} pb={4}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Heading title="Checkout" Icon={Shopping} />
          <Box mt={3} maxWidth={700}>
            <Stepper stepNo={1} />
          </Box>
        </Grid>

        <Grid item md={8} xs={12}>
          <FlexBetween flexWrap="wrap" gap={1.5} mb={3}>
            <H5>Dirección</H5>
            {values && (
              <Delete cursor="pointer" onClick={() => setValues("")} />
            )}
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setOpenModal(true)}
            >
              Adicionar dirección
            </Button>
          </FlexBetween>
          <h5>
            Llena los datos de dirección y haz click en pedido antes de realizar
            el pago.
          </h5>

          <AppModal open={openModal} handleClose={() => setOpenModal(false)}>
            <H5> Añadir dirección</H5>

            <Box py={2}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <RadioGroup row value={selectedValue} onChange={handleChange}>
                    <StyledFormControlLabel
                      onClick={handleNif}
                      value="RUT"
                      control={<AppRadio />}
                      label="Factura con RUT"
                    />
                    <StyledFormControlLabel
                      onClick={handleNif}
                      value="N/A"
                      control={<AppRadio />}
                      label="Sin RUT"
                    />
                  </RadioGroup>
                </Grid>

                <Grid item sm={6} xs={12}>
                  <AppTextField
                    fullWidth
                    required
                    size="small"
                    label="Nombre"
                    name="name"
                    autoFocus
                    onChange={changeHandler}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <AppTextField
                    fullWidth
                    required
                    size="small"
                    label="Email"
                    name="email"
                    autoFocus
                    onChange={changeHandler}
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <AppTextField
                    fullWidth
                    size="small"
                    required
                    label="Teléfono"
                    name="phone"
                    onChange={changeHandler}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <AppTextField
                    fullWidth
                    size="small"
                    required
                    label="Còdigo Postal"
                    name="postal"
                    onChange={changeHandler}
                  />
                </Grid>

                <Grid item xs={12}>
                  <AppTextField
                    fullWidth
                    size="small"
                    required
                    name="address"
                    label="Dirección"
                    onChange={changeHandler}
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <AppTextField
                    fullWidth
                    size="small"
                    required
                    label="Ciudad"
                    name="city"
                    onChange={changeHandler}
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <AppTextField
                    fullWidth
                    size="small"
                    required
                    label="País"
                    name="country"
                    onChange={changeHandler}
                  />
                </Grid>
                {selectedValue === "RUT" ? (
                  <Grid item sm={6} xs={12}>
                    <AppTextField
                      fullWidth
                      size="small"
                      required
                      label="RUT"
                      name="RUT"
                      onChange={changeHandler}
                    />
                  </Grid>
                ) : null}
              </Grid>
            </Box>

            <FlexBox alignItems="center" justifyContent="end" gap={1} mt={1}>
              <Button
                variant="GreyOutlined"
                onClick={() => setOpenModal(false)}
              >
                Cancelar
              </Button>
              <Button variant="contained" onClick={handleSubmit}>
                Enviar a esta Dirección
              </Button>
            </FlexBox>
          </AppModal>

          <Stack gap={2}>
            <BillingAddressCard selectedValue={selectedValue} values={values} />
          </Stack>

          <Box mt={2}>
            {" "}
            <EmailClient values={values} />
          </Box>
        </Grid>

        <Grid item md={4} xs={12}>
          <MercadoSummary
            values={values}
            submit={handleSubmit}
            buttonText="Payment"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SubscribedAddress;
