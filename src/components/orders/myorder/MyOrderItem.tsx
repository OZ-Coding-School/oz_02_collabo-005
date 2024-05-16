import React from "react";
import ResImg from "../../../assets/images/restaurantBackgroundImg.png";
import "./MyOrderItem.css";
import RestaurantLogo from "@components/common/restaurantlogo/RestaurantLogo";
import { useNavigate } from "react-router-dom";
import { OrderHistoryDataType } from "../../../types/ordersType";
import { addCommasToNumberString } from "../../../utils/addCommas";

interface MyOrderItemProps {
  orderHistoryList: OrderHistoryDataType;
}

const MyOrderItem: React.FC<MyOrderItemProps> = ({ orderHistoryList }) => {
  const navigate = useNavigate();
  const handleViewOrderClick = () => {
    navigate("/order/details");
  };

  const handleRestaurantClick = (restaurantId: string) => {
    return () => {
      navigate(`/restaurant/${restaurantId}`);
    };
  };

  return (
    <div className="myOrderItemContainer">
      <div className="myOrderItemTop">
        <div className="myOrderDate">{orderHistoryList.date}</div>
        <button className="viewOrderBtn" onClick={handleViewOrderClick}>
          View order
        </button>
      </div>
      {Object.entries(orderHistoryList.details).map(([key, value]) => {
        return (
          <>
            <div
              className="myOrderItemMainContainer"
              key={orderHistoryList.id}
              onClick={handleRestaurantClick(key)}
            >
              <div className="myOrderItemLogoImg">
                <RestaurantLogo src={ResImg} />
              </div>
              <div className="myOrderInfoSection">
                <div className="MIresName">{value.restaurant_name}</div>
                {value.quantity === 1 ? (
                  <div className="MImenuName">{value.menu_name}</div>
                ) : (
                  <div className="MImenuName">
                    {value.menu_name} and {value.quantity - 1} more
                  </div>
                )}

                <div className="MIprice">
                  {addCommasToNumberString(value.total_price)} won
                </div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default MyOrderItem;
