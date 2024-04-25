import React from "react";
import "./MenuItem.css";
import MenuImg from "../../assets/images/menuImg.png";

const MenuItem: React.FC = () => {
  return (
    <div className="MenuItemContainer">
      <div className="menuInformation">
        <div className="menuTitle">
          <p className="menuName">Menu name</p>
          <div className="menuLabel">Bestseller</div>
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
