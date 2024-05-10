import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./MenuCategory.css";

interface MenuCategoryProps {
  categories: string[] | undefined;
  selectedCategory?: string;
  handleMenuCategoryClick: (category: string) => void;
}

const MenuCategory: React.FC<MenuCategoryProps> = ({
  categories,
  selectedCategory,
  handleMenuCategoryClick,
}) => {
  return (
    <div className="menuCategoryRow">
      <Swiper
        slidesPerView="auto"
        spaceBetween={15}
        freeMode={true}
        modules={[FreeMode]}
      >
        {categories?.map((category) => (
          <SwiperSlide
            key={category}
            className={`menuCategory ${selectedCategory === category ? "selected" : ""}`}
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
