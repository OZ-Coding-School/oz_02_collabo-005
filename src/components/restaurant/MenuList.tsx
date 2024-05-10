import React from "react";
import { useNavigate } from "react-router-dom";
import MenuItem from "./MenuItem";
import "./MenuList.css";
import { MenuGroupType } from "src/types/types";

interface MenuListProps {
  selectedMenuList: MenuGroupType | undefined;
}

const MenuList: React.FC<MenuListProps> = ({ selectedMenuList }) => {
  const navigate = useNavigate();
  const handleClick = (): void => navigate("/restaurant/menu");
  return (
    <div className="menuListContainer">
      {selectedMenuList?.menus?.map((menu) => (
        <MenuItem menu={menu} handleClick={handleClick} key={menu.id} />
      ))}
    </div>
  );
};

export default MenuList;
