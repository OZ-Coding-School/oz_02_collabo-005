import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./MenuCategory.css";

interface MenuCategoryProps {
  categories: string[];
  handleMenuCategoryClick: (category: string) => void;
}

const MenuCategory: React.FC<MenuCategoryProps> = ({
  categories,
  handleMenuCategoryClick,
}) => {
  return (
    <div className="menuCategoryRow">
      <Swiper
        slidesPerView="auto"
        spaceBetween={15}
        freeMode={true}
        modules={[FreeMode]}
        className="menuCategorySwiper"
      >
        {categories.map((category, index) => (
          <SwiperSlide
            key={index}
            className="menuCategory"
            onClick={() => {
              handleMenuCategoryClick(category);
            }}
          >
            {category}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MenuCategory;
