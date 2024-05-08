import React from "react";
import RestaurantItem from "./RestaurantItem";
import { Restaurant } from "../../../pages/HomePage";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./RestaurantCategory.css";

interface CategoryProps {
  title: string;
  id: string;
  restaurants: Restaurant[];
}

const Category: React.FC<CategoryProps> = ({ title, id, restaurants }) => {
  return (
    <div className="categoryContainer" id={id}>
      <h2 className="restaurantCategoryTitle">{title}</h2>
      <div className="restaurantRow">
        <Swiper
          slidesPerView="auto"
          spaceBetween={50}
          freeMode={true}
          modules={[FreeMode]}
        >
          {restaurants.map((restaurant, index) => (
            <SwiperSlide key={index} className="restaurantItem">
              <RestaurantItem
                name={restaurant.name}
                intro={restaurant.intro}
                key={index}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Category;
