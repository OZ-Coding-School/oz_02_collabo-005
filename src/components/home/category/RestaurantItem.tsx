import React from "react";
import RestaurantImage from "../../../assets/images/restaurantImg.jpg";
import "./RestaurantItem.css";
import { useNavigate } from "react-router-dom";
import { RestaurantType } from "../../../types/restaurantTypes";

interface RestaurantItemProps extends Omit<RestaurantType, "category"> {}

const RestaurantItem: React.FC<RestaurantItemProps> = ({
  id,
  name,
  image,
  hashtag,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/restaurant/${id}`);
  };

  const description = hashtag ? hashtag.join("") : "";

  return (
    <div className="restaurantItemContainer" key={id} onClick={handleClick}>
      <img
        src={RestaurantImage}
        className="restaurantMainImg"
        alt="restaurant main image" //image로 대체
      />
      <div className="restaurantInfoSection">
        <p className="RIname">{name}</p>
        <p className="RIintro">{description}</p>
      </div>
    </div>
  );
};

export default RestaurantItem;
