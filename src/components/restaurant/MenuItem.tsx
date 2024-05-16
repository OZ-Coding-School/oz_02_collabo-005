import React from "react";
import "./MenuItem.css";
import { MenuType } from "src/types/restaurantTypes";
import { useNavigate } from "react-router-dom";

interface MenuItemProps {
  menu: MenuType;
  isPreparing: boolean;
  restaurantId: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  menu,
  isPreparing,
  restaurantId,
}) => {
  const navigate = useNavigate();
  const handleClick = (): void => {
    navigate(`/restaurant/${restaurantId}/menu/${menu.id}`);
  };

  // 메뉴 품절 여부
  const isSoldOut = menu.status === 0;

  return (
    <div
      className="MenuItemContainer"
      onClick={() => {
        if (!isSoldOut && !isPreparing) handleClick();
      }}
    >
      <div className="menuItemInformation">
        {menu.represent && (
          <div className="menuItemLabel">{menu.represent}</div>
        )}
        <div className="menuItemTitle">
          <p className="menuItemName">{menu.name}</p>
        </div>
        {menu.description && (
          <div className="menuItemDescription">{menu.description}</div>
        )}
        <p className="menuItemPrice">{menu.price} won</p>
      </div>
      {isSoldOut && (
        <div className="menuMainImgContainer menuSoldOut">Sold Out</div>
      )}
      {menu.picture && (
        <img src={menu.picture} className="menuMainImgContainer menuMainImg" />
      )}
    </div>
  );
};

export default MenuItem;
