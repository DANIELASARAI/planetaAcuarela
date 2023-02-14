import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { loginUser } from "../redux/authRedux";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.unsplash.com/photo-1506272517965-ec6133efee7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: transparent;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-family: "Yomogi";
  font-size: 24px;
  font-weight: 500;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  border-radius: 15px;
  border: none;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  border-radius: 15px;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  font-family: "Yomogi";
`;

const Create = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
  });

  useEffect(() => {
    if (auth._id) {
      navigate("/");
    }
  }, [auth._id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser(user));
  };

  return (
    <Container>
      <Wrapper>
        <Title>Iniciar Sesión</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <Input
            placeholder="Contraseña"
            type="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <Button>
            {" "}
            {auth.loginStatus === "pending" ? "Iniciando..." : "Login"}
          </Button>
          {auth.loginStatus === "rejected" ? <p>{auth.loginError}</p> : null}
          <Link to="/register">
            <Create>Crear Cuenta nueva</Create>
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
