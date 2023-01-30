import { Dvr, Summarize } from "@mui/icons-material";
import ListIcon from "@mui/icons-material/List";
import PersonIcon from "@mui/icons-material/Person";

export const SIDEBAR_DATA = [
  {
    id: 1,
    name: "Resumen",
    path: "summary",
    icon: <Summarize />,
  },
  {
    id: 2,
    name: "Productos",
    path: "products",
    icon: <ListIcon />,
  },
  {
    id: 4,
    name: "Órdenes",
    path: "orders",
    icon: <Dvr />,
  },
  {
    id: 5,
    name: "Usuarios",
    path: "users",
    icon: <PersonIcon />,
  },
];
