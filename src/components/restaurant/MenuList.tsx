import React from "react";
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
  return (
    <div className="menuListContainer">
      {selectedMenuList?.menus?.map((menu) => (
        <MenuItem menu={menu} key={menu.id} isPreparing={isPreparing} />
      ))}
    </div>
  );
};

export default MenuList;
