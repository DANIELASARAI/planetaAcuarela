import { Button, Card, Grid, Modal, styled } from "@mui/material";
import logo from "../img/acuarela.png";

import React from "react";
import { Link, useLocation } from "react-router-dom";
import FlexBox from "./Flexbox";
import { H2, H6 } from "./Typography";

// styled components
const StyledModalCard = styled(Card)(() => ({
  top: "50%",
  left: "50%",
  maxWidth: 400,
  minWidth: 200,
  position: "absolute",
  padding: "1.5rem",

  transform: "translate(-50%, -50%)",
  width: "100%",
}));

const Subscribe = ({ close, open, cat, subCat }) => {
  console.log("🚀 ~ file: SubscribeModal.jsx:23 ~ Subscribe ~ cat", cat);
  /*    const [dbUsers, setDbUsers] = useState([]); */

  /*     const [isSubmitting, setIsSubmitting] = useState(false); */

  /*     useEffect(async () => {
      {
        const users = await API.getAvailableUsers(projectId);
        console.log(users);
        setDbUsers(users);
      }
    }, [setSelectedUsers]); */

  /*     const handleChange = (e) => {
      let values = Array.from(e.target.value);
      console.log("values: ", values);
      setSelectedUsers(values);
      console.log("Selected Developers: ", selectedUsers);
    };
   */
  const location = useLocation();
  const subCatLocation = location.pathname.split("/")[1];
  console.log(
    "🚀 ~ file: SubCategoriesList.jsx:48 ~ SubCategoriesList ~ subCat",
    subCatLocation
  );

  return (
    <Modal open={open} onClose={close}>
      <StyledModalCard>
        <H2 mb={2}>Subscríbete</H2>

        <form>
          <Grid container spacing={2} className="main-form">
            <Grid item sm={6} xs={12}>
              <H6 mb={1}>
                ¿Quiéres recibir descuentos especiales en nuestros Productos?
              </H6>
            </Grid>
            <Grid item sm={6} xs={12}>
              <img src={logo} width={200} />
            </Grid>
          </Grid>

          <FlexBox justifyContent="flex-end" marginTop={4}>
            {cat && (
              <Link to={`/products/${cat}`}>
                <Button
                  fullWidth
                  size="small"
                  variant="outlined"
                  sx={{
                    width: 124,
                    fontSize: 12,
                    marginRight: 2,
                    color: "text.disabled",
                    borderColor: "text.disabled",
                  }}
                >
                  Comprar como invitado.
                </Button>
              </Link>
            )}

            <Link to={`/register/`}>
              <Button
                fullWidth
                size="small"
                type="submit"
                variant="outlined"
                sx={{
                  width: 124,
                  fontSize: 12,
                  color: "#660a5d",
                  borderColor: "#660a5d",
                }}
              >
                Si, deseo comprar con descuentos.
              </Button>
            </Link>
          </FlexBox>
        </form>
      </StyledModalCard>
    </Modal>
  );
};

export default Subscribe;
