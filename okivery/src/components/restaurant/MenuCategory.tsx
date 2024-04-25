import React from "react";
import "./MenuCategory.css";

interface MenuCategoryProps {
  categories: string[];
}

const MenuCategory: React.FC<MenuCategoryProps> = ({ categories }) => {
  return (
    <div className="menuCategoryRow">
      {categories.map((category) => (
        <div className="menuCategory">{category}</div>
      ))}
    </div>
  );
};

export default MenuCategory;
