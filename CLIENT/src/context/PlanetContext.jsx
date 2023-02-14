import { createContext, useState } from "react";
import { useLocation } from "react-router-dom";

const PlanetContext = createContext();

export function PlanetProvider({ children }) {
  const [planet, setPlanet] = useState([]);
  const location = useLocation();

  const pathContext = location.pathname.split("/")[2];

  return (
    <PlanetContext.Provider value={{ planet: pathContext }}>
      {children}
    </PlanetContext.Provider>
  );
}

export default PlanetContext;
