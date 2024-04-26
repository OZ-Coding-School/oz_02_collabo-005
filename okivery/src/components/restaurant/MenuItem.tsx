import React from "react";
import "./MenuItem.css";
import MenuImg from "../../assets/images/menuImg.png";

interface MenuItemProps {
  label?: string;
  handleClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, handleClick }) => {
  return (
    <div className="MenuItemContainer" onClick={handleClick}>
      <div className="menuInformation">
        <div className="menuTitle">
          <p className="menuName">Menu name</p>
          {label && <div className="menuLabel">{label}</div>}
        </div>
        <p className="menuPrice">14,900 won</p>
        <div className="menuDescription">
          Bowl of rice topped with bulgogi beef and sauce.
        </div>
      </div>
      <img src={MenuImg} className="menuMainImg" />
    </div>
  );
};

export default MenuItem;
