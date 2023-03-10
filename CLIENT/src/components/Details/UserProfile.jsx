import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { setHeaders, url } from "../../slices/api";

const UserProfile = () => {
  const params = useParams();

  const [user, setUser] = useState({
    name: "",
    email: "",
    isAdmin: false,
    password: "",
  });
  console.log("🚀 ~ file: UserProfile.jsx:16 ~ UserProfile ~ user", user);

  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${url}/users/find/${params.id}`,
          setHeaders()
        );

        setUser({
          ...res.data,
          password: "",
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
    setLoading(false);
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const res = await axios.put(
        `${url}/users/${params.id}`,
        {
          ...user,
        },
        setHeaders()
      );
      setUser({ ...res.data, password: "" });
      toast.success("Perfil actualizado!");
    } catch (error) {
      console.log(error);
    }
    setUpdating(false);
  };

  return (
    <StyledProfile>
      <ProfileContainer>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <h3>Perfil de Usuario</h3>
            {user.isAdmin ? <Admin>Admin</Admin> : <Customer>Cliente</Customer>}
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />

            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <label htmlFor="password">Contraseña:</label>
            <input
              type="text"
              id="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <button>{updating ? "Actualizando" : "Actualizar perfil"}</button>
          </form>
        )}
      </ProfileContainer>
    </StyledProfile>
  );
};

export default UserProfile;

const StyledProfile = styled.div`
  margin: 3rem;
  display: flex;
  justify-content: center;
`;
const ProfileContainer = styled.div`
  max-width: 600px;
  width: 100%;
  height: auto;
  display: flex;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 2rem;
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    h3 {
      margin-bottom: 0.5rem;
    }
    label {
      margin-bottom: 0.2rem;
      color: gray;
    }
    input {
      margin-bottom: 1rem;
      outline: none;
      border: none;
      border-bottom: 1px solid gray;
    }
  }
`;

const Admin = styled.div`
  color: rgb(253, 181, 40);
  background: rgb(253, 181, 40, 0.12);
  padding: 5px 5px;
  border-radius: 12px;
  font-size: 14px;
  margin-bottom: 1rem;
`;
const Customer = styled.div`
  color: rgb(38, 198, 249);
  background: rgb(38, 198, 249, 0.12);
  padding: 5px 5px;
  border-radius: 12px;
  font-size: 14px;
  margin-bottom: 1rem;
`;
