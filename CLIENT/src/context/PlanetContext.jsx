import { createContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PlanetContext = createContext();

export function PlanetProvider({ children }) {
  const [planet, setPlanet] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const pathContext = location.pathname.split("/")[2];

  return (
    <PlanetContext.Provider value={{ planet: pathContext }}>
      {children}
    </PlanetContext.Provider>
  );
}

export default PlanetContext;
