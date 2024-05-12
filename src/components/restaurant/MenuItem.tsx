import React from "react";
import "./MenuItem.css";
import MenuImg from "../../assets/images/menuImg.png";
import { MenuType } from "src/types/restaurantTypes";

interface MenuItemProps {
  menu: MenuType;
  isPreparing: boolean;
  handleClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  menu,
  handleClick,
  isPreparing,
}) => {
  // 메뉴 품절 여부
  const isSoldOut = menu.status === 2;
  // 메뉴 숨김 여부
  const isHidden = menu.status === 3;
  if (isHidden) return;

  console.log(isPreparing);
  return (
    <div
      className="MenuItemContainer"
      onClick={() => {
        if (!isSoldOut && !isPreparing) handleClick();
      }}
    >
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
      {isSoldOut && (
        <div className="menuMainImgContainer menuSoldOut">Sold Out</div>
      )}
      {menu.picture && (
        // img src 추후에 menu.picture로 교체
        <img src={MenuImg} className="menuMainImgContainer menuMainImg" />
      )}
    </div>
  );
};

export default MenuItem;
