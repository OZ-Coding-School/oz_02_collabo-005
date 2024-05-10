import React from "react";
import RestaurantItem from "./RestaurantItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { RestaurantType } from "../../../types/types";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./RestaurantCategory.css";

interface RestaurantCategoryProps {
  title: string;
  id?: string;
  restaurants: RestaurantType[];
}

const RestaurantCategory: React.FC<RestaurantCategoryProps> = ({
  title,
  id,
  restaurants,
}) => {
  return (
    <div className="RestaurantcategoryContainer" id={id}>
      <h2 className="restaurantRestaurantCategoryTitle">{title}</h2>
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
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default RestaurantCategory;
