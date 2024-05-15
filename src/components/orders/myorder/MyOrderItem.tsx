import React from "react";
import ResImg from "../../../assets/images/restaurantBackgroundImg.png";
import "./MyOrderItem.css";
import RestaurantLogo from "@components/common/restaurantlogo/RestaurantLogo";
import { useNavigate } from "react-router-dom";

const MyOrderItem: React.FC = () => {
  const navigate = useNavigate();
  const handleViewOrderClick = () => {
    navigate("/order/details");
  };

  return (
    <div className="myOrderItemContainer">
      <div className="myOrderItemTop">
        <div className="myOrderDate">2024-04-17</div>
        <button className="viewOrderBtn" onClick={handleViewOrderClick}>
          View order
        </button>
      </div>
      <div className="myOrderItemMainContainer">
        <div className="myOrderItemLogoImg">
          <RestaurantLogo src={ResImg} />
        </div>
        <div className="myOrderInfoSection">
          <div className="MIresName">BBQ overrice</div>
          <div className="MImenuName">불고기덮밥 외 3개</div>
          <div className="MIprice">13,800won</div>
        </div>
      </div>
      <div className="myOrderItemMainContainer">
        <div className="myOrderItemLogoImg">
          <RestaurantLogo src={ResImg} />
        </div>
        <div className="myOrderInfoSection">
          <div className="MIresName">El Cuban</div>
          <div className="MImenuName">sandwitch 외 1개</div>
          <div className="MIprice">13,800won</div>
        </div>
      </div>
    </div>
  );
};

export default MyOrderItem;
