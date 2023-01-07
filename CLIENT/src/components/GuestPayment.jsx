import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Stack,
  styled,
  TableRow,
} from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import React from "react";
import { H3, H6, Small, Span, Tiny } from "../components/Typography";
import FlexBetween from "./FlexBetween";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import Stepper from "../page-sections/Stepper";

const HeadTableCell = styled(TableCell)(({ theme }) => ({
  padding: 0,
  fontSize: 12,
  fontWeight: 600,
  paddingBottom: 5,
  color: theme.palette.text.secondary,
}));
const BodyTableCell = styled(TableCell)(() => ({
  fontSize: 12,
  padding: "10px 0",
  "&:last-of-type": {
    textAlign: "right",
    fontWeight: 600,
  },
}));
const StyledSmall = styled(Small)(({ theme, type }) => ({
  fontSize: 12,
  color: "white",
  padding: "4px 10px",
  borderRadius: "4px",
  backgroundColor:
    type === "success"
      ? theme.palette.success.main
      : theme.palette.primary.main,
}));
const Pagamento = () => {
  /* const { totalPrice, totalQuantities, cartItems } = useStateContext();
   */

  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  return (
    <Box pt={2} pb={4}>
      <Box mt={3} maxWidth={700}>
        <Stepper stepNo={2} />
      </Box>
      <Card
        sx={{
          padding: "2rem 1rem",
        }}
      >
        <Grid container spacing={3}>
          <Grid item md={7} xs={12}>
            <FlexBetween>
              <Stack textAlign="left">
                <H3>Tu Compra:</H3>
              </Stack>
            </FlexBetween>

            <FlexBetween my={3}>
              <Tiny fontWeight={500} lineHeight={1.6} textAlign="left">
                Planeta Acuarela <br />
                Zañartu 1100,
                <br /> Tel: +56 952042856 <br /> Ñuñoa, Santiago de Chile <br />{" "}
                Chile
              </Tiny>
            </FlexBetween>

            <H6 color="text.secondary">
              Fecha:{" "}
              <Span
                sx={{
                  color: "text.primary",
                  fontWeight: 500,
                }}
              >
                {date}
              </Span>
            </H6>

            <Table
              sx={{
                mt: 3,
              }}
            >
              <TableHead>
                <TableRow>
                  <HeadTableCell>Nombre</HeadTableCell>
                  <HeadTableCell>Descripción</HeadTableCell>
                  <HeadTableCell>Color</HeadTableCell>
                  <HeadTableCell>Talla</HeadTableCell>
                  <HeadTableCell>Cantidad</HeadTableCell>
                  <HeadTableCell>Precio</HeadTableCell>
                  <HeadTableCell>Valor</HeadTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {cart.products?.map((item) => (
                  <TableRow key={item._id}>
                    <BodyTableCell>{item.name}</BodyTableCell>
                    <BodyTableCell>{item.desc}</BodyTableCell>
                    <BodyTableCell>{item.color}</BodyTableCell>
                    <BodyTableCell>{item.size}</BodyTableCell>
                    <BodyTableCell>{item.cartQuantity}</BodyTableCell>
                    <BodyTableCell>{item.price}</BodyTableCell>
                    <BodyTableCell>
                      {item.price * item.cartQuantity}
                    </BodyTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Divider />

            <Stack mt={3} spacing={1} maxWidth={200} marginLeft="auto">
              <FlexBetween>
                <Tiny fontWeight={500}>Total de Items:</Tiny>
                <H6>{cart.cartTotalQuantity}</H6>
              </FlexBetween>

              <FlexBetween>
                <Tiny fontWeight={500}>Total a pagar:</Tiny>
                <H6>€{cart.cartTotalAmount}</H6>
              </FlexBetween>
            </Stack>

            <Stack direction="row" justifyContent="flex-end" mt={4} spacing={2}>
              <Button
                size="small"
                variant="outlined"
                onClick={() => window.print()}
                sx={{
                  marginRight: 2,
                }}
              >
                Imprimir datos
              </Button>
            </Stack>
          </Grid>

          <Grid item md={5} xs={12}>
            <Box
              sx={{
                padding: 3,
                height: "100%",
                borderRadius: "4px",
                backgroundColor: "action.selected",
              }}
            >
              <Stack spacing={2} direction="row" alignItems="center">
                <StyledSmall>Pendiente para pagar</StyledSmall>
              </Stack>

              <Stack mt={3} spacing={2}>
                <H3 fontSize={16}>Detalles del pago:</H3>

                <Tiny fontWeight={500}>
                  Enviar comprobante a: <br />
                  <Span color="text.primary" fontSize={13} fontWeight={600}>
                    planetacuarela@gmail.com
                  </Span>
                </Tiny>
                <Tiny fontWeight={500}>
                  Entidad Bancaria: <br />
                  <Span color="text.primary" fontSize={13} fontWeight={600}>
                    Banco de Chile
                  </Span>
                </Tiny>
                <Tiny fontWeight={500}>
                  Tipo de Cuenta: <br />
                  <Span color="text.primary" fontSize={13} fontWeight={600}>
                    Cuenta Vista
                  </Span>
                </Tiny>
                <Tiny fontWeight={500}>
                  Número de Cuenta: <br />
                  <Span color="text.primary" fontSize={13} fontWeight={600}>
                    403722038
                  </Span>
                </Tiny>
                <Tiny fontWeight={500}>
                  RUT: <br />
                  <Span color="text.primary" fontSize={13} fontWeight={600}>
                    25.853.502-2
                  </Span>
                </Tiny>
                <Tiny fontWeight={500}>
                  Términos de pago: <br />
                  <Span color="text.primary" fontSize={13} fontWeight={600}>
                    1-3 dias
                  </Span>
                </Tiny>
              </Stack>

              <Stack mt={3} spacing={2}>
                <H3 fontSize={16}>Resumen de Pago:</H3>

                <Tiny fontWeight={500}>
                  Nombre: <br />
                  <Span color="text.primary" fontSize={13} fontWeight={600}>
                    Planeta Acuarela
                  </Span>
                </Tiny>

                <Tiny fontWeight={500}>
                  Tiempo de entrega estimado
                  <br />
                  <Span color="text.primary" fontSize={13} fontWeight={600}>
                    1 a 3 dìas útiles
                  </Span>
                </Tiny>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Card>
      <Stack direction="row" justifyContent="flex-end" mt={4} spacing={2}>
        <Link to={`/checkout-success`}>
          <Button
            type="button"
            size="small"
            variant="outlined"
            sx={{
              marginRight: 2,
            }}
          >
            Pago realizado
          </Button>
        </Link>
      </Stack>
    </Box>
    //Acuse a rafael de encomienda numero para preparar producto,
    //una vez que llegue la transferencia, se realiza el envio.
  );
};

export default Pagamento;
