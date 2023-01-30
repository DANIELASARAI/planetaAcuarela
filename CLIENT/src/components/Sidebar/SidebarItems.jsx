import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ItemContainer,
  ItemName,
  ItemsList,
  ItemWrapper,
} from "./SidebarStyles";

import { SIDEBAR_DATA } from "./data";

const SidebarItems = ({ displaySidebar }) => {
  const [activeItem, setActiveItem] = useState(0);

  return (
    <ItemsList>
      {SIDEBAR_DATA.map((itemData, index) => (
        <ItemContainer
          key={index}
          onClick={() => setActiveItem(itemData.id)}
          className={itemData.id === activeItem ? "active" : ""}
        >
          <Link to={itemData.path}>
            <ItemWrapper>
              {itemData.icon}
              <ItemName displaySidebar={displaySidebar}>
                {itemData.name}
              </ItemName>
            </ItemWrapper>
          </Link>
        </ItemContainer>
      ))}
    </ItemsList>
  );
};

export default SidebarItems;
