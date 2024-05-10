import React from "react";
import "./MenuItem.css";
import MenuImg from "../../assets/images/menuImg.png";
import { MenuType } from "src/types/types";

interface MenuItemProps {
  menu: MenuType;
  handleClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ menu, handleClick }) => {
  return (
    <div className="MenuItemContainer" onClick={handleClick}>
      <div className="menuItemInformation">
        <div className="menuItemTitle">
          <p className="menuItemName">{menu.name}</p>
          {menu.represent && (
            <div className="menuItemLabel">{menu.represent}</div>
          )}
        </div>
        <p className="menuItemPrice">{menu.price} won</p>
        {menu.description && (
          <div className="menuItemDescription">{menu.description}</div>
        )}
      </div>
      {menu.picture && <img src={MenuImg} className="menuMainImg" />}
    </div>
  );
};

export default MenuItem;
