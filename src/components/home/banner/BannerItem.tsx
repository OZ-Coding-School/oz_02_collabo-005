import React from "react";
import { BannerType } from "../../../pages/HomePage";
import "./BannerItem.css";

interface BannerItemProps extends BannerType {
  key: number;
}

const BannerItem: React.FC<BannerItemProps> = ({ name, key }) => {
  return (
    <div className="bannerItemContainer">
      <div className="bannerItem" key={key}>
        {name}
      </div>
    </div>
  );
};

export default BannerItem;
