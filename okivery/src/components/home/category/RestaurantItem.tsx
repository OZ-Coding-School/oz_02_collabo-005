import React from "react";
import RestaurantImage from "../../../assets/images/restaurantImg.jpg";
import "./RestaurantItem.css";
import { Restaurant } from "../../../pages/HomePage";
import { useNavigate } from "react-router-dom";

interface RestaurantItemProps extends Restaurant {
  key: number;
}

const RestaurantItem: React.FC<RestaurantItemProps> = ({
  name,
  intro,
  key,
}) => {
  const navigate = useNavigate();
  const handleRestaurantClick = () => {
    navigate("/restaurant");
  };
  return (
    <div className="restaurantItem" key={key} onClick={handleRestaurantClick}>
      <img
        src={RestaurantImage}
        className="restaurantImg"
        alt="restaurant image"
      />
      <div>
        <p>{name}</p>
        <p>{intro}</p>
      </div>
    </div>
  );
};

export default RestaurantItem;
