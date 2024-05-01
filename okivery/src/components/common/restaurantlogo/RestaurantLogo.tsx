import React from "react";
import "./RestaurantLogo.css";

interface RestaurantLogoProps {
  src: string;
}

const RestaurantLogo: React.FC<RestaurantLogoProps> = ({ src }) => {
  return (
    <>
      <img src={src} className="restaurantLogoImg" />
    </>
  );
};

export default RestaurantLogo;
