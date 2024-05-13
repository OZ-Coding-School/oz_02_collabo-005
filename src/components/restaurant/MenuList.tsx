import React from "react";
import { useNavigate } from "react-router-dom";
import MenuItem from "./MenuItem";
import "./MenuList.css";
import { MenuGroupType } from "src/types/restaurantTypes";

interface MenuListProps {
  selectedMenuList: MenuGroupType | undefined;
  isPreparing: boolean;
}

const MenuList: React.FC<MenuListProps> = ({
  selectedMenuList,
  isPreparing,
}) => {
  const navigate = useNavigate();
  const handleClick = (): void => {
    navigate("/restaurant/menu");
  };
  return (
    <div className="menuListContainer">
      {selectedMenuList?.menus?.map((menu) => (
        <MenuItem
          menu={menu}
          handleClick={handleClick}
          key={menu.id}
          isPreparing={isPreparing}
        />
      ))}
    </div>
  );
};

export default MenuList;
