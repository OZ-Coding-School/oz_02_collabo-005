import React from "react";
import MenuItem from "./MenuItem";
import "./MenuList.css";
import { MenuGroupType } from "src/types/restaurantTypes";

interface MenuListProps {
  selectedMenuList: MenuGroupType | undefined;
  isPreparing: boolean;
  restaurantId: string;
}

const MenuList: React.FC<MenuListProps> = ({
  selectedMenuList,
  isPreparing,
  restaurantId,
}) => {
  return (
    <div className="menuListContainer">
      {selectedMenuList?.menus?.map((menu) => (
        <MenuItem
          menu={menu}
          key={menu.id}
          isPreparing={isPreparing}
          restaurantId={restaurantId}
        />
      ))}
    </div>
  );
};

export default MenuList;
