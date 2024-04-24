import React from "react";
import RestaurantItem from "./RestaurantItem";
import { Restaurant } from "../../../pages/HomePage";
import "./Category.css";

interface CategoryProps {
  title: string;
  id: string;
  restaurants: Restaurant[];
}

const Category: React.FC<CategoryProps> = ({ title, id, restaurants }) => {
  return (
    <div className="CategoryContainer" id={id}>
      <h2>{title}</h2>
      <div className="restaurantRow">
        {restaurants.map((restaurant, index) => (
          <RestaurantItem
            name={restaurant.name}
            intro={restaurant.intro}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Category;
