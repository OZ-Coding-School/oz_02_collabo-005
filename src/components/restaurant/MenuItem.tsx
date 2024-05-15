import React from "react";
import "./MenuItem.css";
import MenuImg from "../../assets/images/menuImg.png";
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
  const isSoldOut = menu.status === 2;
  // 메뉴 숨김 여부
  const isHidden = menu.status === 3;
  if (isHidden) return;

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
