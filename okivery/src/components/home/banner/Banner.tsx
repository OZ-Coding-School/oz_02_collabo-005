import React from "react";
import BannerItem from "./BannerItem";
import { BannerType } from "../../../pages/HomePage";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./Banner.css";

interface BannerProps {
  banners: BannerType[];
}

const Banner: React.FC<BannerProps> = ({ banners }) => {
  return (
    <div className="bannerRow">
      <Swiper
        slidesPerView="auto"
        spaceBetween={15}
        freeMode={true}
        modules={[FreeMode]}
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index} className="bannerSwiperSlide">
            <BannerItem name={banner.name} key={index} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
