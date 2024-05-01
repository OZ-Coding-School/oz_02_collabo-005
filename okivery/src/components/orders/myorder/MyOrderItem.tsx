import React from "react";
import ResImg from "../../../assets/images/restaurantBackgroundImg.png";
import "./MyOrderItem.css";
import RestaurantLogo from "@components/common/restaurantlogo/RestaurantLogo";

const MyOrderItem: React.FC = () => {
  return (
    <div className="myOrderItemContainer">
      <div className="myOrderItemTop">
        <div>04/17(Tue)</div>
        <button>View order</button>
      </div>
      <div className="myOrderItemMainContainer">
        <div className="myOrderItemLogoImg">
          <RestaurantLogo src={ResImg} />
        </div>
        <div className="myOrderInfoSection">
          <div className="MIresName">El Cuban</div>
          <div className="MImenuName">sandwitch</div>
          <div className="MIprice">13,800won</div>
        </div>
      </div>
    </div>
  );
};

export default MyOrderItem;
