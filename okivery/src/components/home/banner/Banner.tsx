import React from "react";
import BannerItem from "./BannerItem";
import { BannerType } from "../../../pages/HomePage";
import "./Banner.css";

interface BannerProps {
  banners: BannerType[];
}

const Banner: React.FC<BannerProps> = ({ banners }) => {
  return (
    <div className="bannerRow">
      {banners.map((banner, index) => (
        <BannerItem name={banner.name} key={index} />
      ))}
    </div>
  );
};

export default Banner;
