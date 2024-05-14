import React from "react";
import RestaurantItem from "./RestaurantItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { RestaurantType } from "../../../types/restaurantTypes";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./RestaurantCategory.css";

interface RestaurantCategoryProps {
  title: string;
  restaurants: RestaurantType[];
}

const RestaurantCategory: React.FC<RestaurantCategoryProps> = ({
  title,
  restaurants,
}) => {
  return (
    <div className="restaurantCategoryContainer">
      <h2 className="restaurantCategoryTitle">{title}</h2>
      <div className="restaurantRow">
        <Swiper
          slidesPerView="auto"
          spaceBetween={50}
          freeMode={true}
          modules={[FreeMode]}
        >
          {restaurants.map((restaurant) => (
            <SwiperSlide key={restaurant.id} className="restaurantItem">
              <RestaurantItem
                id={restaurant.id}
                name={restaurant.name}
                image={restaurant.image}
                hashtag={restaurant.hashtag}
                status={restaurant.status}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default RestaurantCategory;
