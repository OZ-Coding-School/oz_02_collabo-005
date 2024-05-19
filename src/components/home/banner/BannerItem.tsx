import React from "react";
import { BannerType } from "../../../pages/HomePage";
import "./BannerItem.css";

interface BannerItemProps extends BannerType {}

const BannerItem: React.FC<BannerItemProps> = ({ name }) => {
  return (
    <div className="bannerItemContainer">
      <div className="bannerItem">{name}</div>
    </div>
  );
};

export default BannerItem;
