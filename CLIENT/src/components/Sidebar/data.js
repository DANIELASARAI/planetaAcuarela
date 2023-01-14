import {
  BallotIcon,
  FolderSharedIcon,
  InventoryIcon,
  SummarizeIcon,
} from "../icons/Sidebar";

export const SIDEBAR_DATA = [
  {
    id: 1,
    name: "Resumen",
    path: "summary",
    icon: <SummarizeIcon />,
  },
  {
    id: 2,
    name: "Productos",
    path: "products",
    icon: <InventoryIcon />,
  },
  {
    id: 4,
    name: "Órdenes",
    path: "orders",
    icon: <BallotIcon />,
  },
  {
    id: 5,
    name: "Usuarios",
    path: "users",
    icon: <FolderSharedIcon />,
  },
];
