import React from "react";
import RestaurantImage from "../../../assets/images/restaurantImg.jpg";
import "./RestaurantItem.css";
import { useNavigate } from "react-router-dom";
import { RestaurantType } from "../../../types/types";

interface RestaurantItemProps extends Omit<RestaurantType, "category"> {}

const RestaurantItem: React.FC<RestaurantItemProps> = ({
  id,
  name,
  image,
  hashtag,
}) => {
  const navigate = useNavigate();
  const handleRestaurantClick = () => {
    navigate("/restaurant");
  };
  const descroption = hashtag ? hashtag.join("") : "";

  return (
    <div
      className="restaurantItemContainer"
      key={id}
      onClick={handleRestaurantClick}
    >
      <img
        src={RestaurantImage}
        className="restaurantMainImg"
        alt="restaurant main image" //image로 대체
      />
      <div className="restaurantInfoSection">
        <p>{name}</p>
        <p>{descroption}</p>
      </div>
    </div>
  );
};

export default RestaurantItem;
