import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { registerUser } from "../redux/authRedux";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.unsplash.com/photo-1584974292709-5c2f0619971b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: transparent;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-family: "Yomogi";
  font-size: 24px;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  border-radius: 15px;
  border: none;
  min-width: 40%;
  margin: 20px 0px 20px 20px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 10px;
  margin: 20px 0px;
  font-family: "Yomogi";
  font-weight: 500;
`;

const Button = styled.button`
  width: 43%;
  border: none;
  border-radius: 15px;
  padding: 5px;
  background-color: teal;
  color: white;
  margin: 20px 10px 20px 20px;
  cursor: pointer;
  font-family: "Yomogi";
`;

const Register = () => {
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (auth._id) {
      navigate("/");
    }
  }, [auth._id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user.name);
    dispatch(registerUser(user));
  };
  return (
    <Container>
      <Wrapper>
        <Title>Crear una cuenta</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="Nombre y Apellido"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />

          <Input
            placeholder="Tu Email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <Input
            placeholder="Elige una Contraseña"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          <Button>
            {auth.registerUser === "pending" ? "Registrando..." : "Crear"}
          </Button>
          {auth.registerUser === "rejected" ? (
            <>
              <Agreement>Ha ocurrido un error de Registro...</Agreement>
            </>
          ) : null}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
