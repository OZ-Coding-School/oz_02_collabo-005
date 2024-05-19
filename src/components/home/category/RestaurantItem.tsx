import React from "react";
import "./RestaurantItem.css";
import { useNavigate } from "react-router-dom";
import { RestaurantType } from "../../../types/restaurantTypes";

interface RestaurantItemProps extends Omit<RestaurantType, "category"> {}

const RestaurantItem: React.FC<RestaurantItemProps> = ({
  id,
  name,
  image,
  hashtag,
  status,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/restaurant/${id}`);
  };

  const description = hashtag ? hashtag.join(" ") : "";
  const isOpen = status === 200001;
  const noticeMessage =
    status !== 200001 && status === 200003 ? "Close" : "Preparing";

  return (
    <div className="restaurantItemContainer" key={id} onClick={handleClick}>
      {!isOpen && (
        <div className="restaurantMainImg resPreparing">{noticeMessage}</div>
      )}
      <img
        src={image}
        className="restaurantMainImg"
        alt="restaurant main image"
      />
      <div className="restaurantInfoSection">
        <p className="RIname">{name}</p>
        <p className="RIintro">{description}</p>
      </div>
    </div>
  );
};

export default RestaurantItem;
