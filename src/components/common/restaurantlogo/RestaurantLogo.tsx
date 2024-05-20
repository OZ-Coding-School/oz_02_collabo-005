import React from "react";
import "./RestaurantLogo.css";

interface RestaurantLogoProps {
  src: string | undefined;
}

const RestaurantLogo: React.FC<RestaurantLogoProps> = ({ src }) => {
  return (
    <>
      <img src={src} alt="restaurantLogo" className="restaurantLogoImg" />
    </>
  );
};

export default RestaurantLogo;
