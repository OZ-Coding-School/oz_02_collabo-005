import React from "react";
import { useNavigate } from "react-router-dom";
import MenuItem from "./MenuItem";
import "./MenuList.css";

const MenuList: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = (): void => navigate("/restaurant/menu");
  return (
    <div className="menuListContainer">
      <MenuItem label="BestSeller" handleClick={handleClick} />
      <MenuItem handleClick={handleClick} />
      <MenuItem handleClick={handleClick} />
      <MenuItem handleClick={handleClick} />
    </div>
  );
};

export default MenuList;
