import React, { useEffect, useState } from "react";
import "./MyOrderItem.css";
import RestaurantLogo from "@components/common/restaurantlogo/RestaurantLogo";
import { useNavigate } from "react-router-dom";
import { OrderHistoryDataType } from "../../../types/ordersType";
import { addCommasToNumberString } from "../../../utils/addCommas";
import setOrderStatusMessage from "./OrderStatus";

interface MyOrderItemProps {
  orderHistoryList: OrderHistoryDataType;
  orderId: number;
}

const MyOrderItem: React.FC<MyOrderItemProps> = ({
  orderHistoryList,
  orderId,
}) => {
  const navigate = useNavigate();
  const [ordersStatusMessage, setOrdersStatusMessage] = useState<string>("");
  const [ordersStatus, setOrdersStatus] = useState<string>("");
  const handleViewOrderClick = () => {
    navigate(`/order/${orderId}/details`);
  };

  useEffect(() => {
    const { message, status } = setOrderStatusMessage(
      orderHistoryList.order_status
    );
    setOrdersStatus(status);
    setOrdersStatusMessage(message);
  }, [orderHistoryList.order_status]);

  const handleRestaurantClick = (restaurantId: string) => {
    return () => {
      navigate(`/restaurant/${restaurantId}`);
    };
  };

  return (
    <div className="myOrderItemContainer">
      <div className="myOrderItemTop">
        <div className="myOrderDate">{orderHistoryList.date}</div>
        <div className={ordersStatus}>{ordersStatusMessage}</div>
        <button className="viewOrderBtn" onClick={handleViewOrderClick}>
          View order
        </button>
      </div>
      {Object.entries(orderHistoryList.details).map(([id, value], index) => (
        <div
          className="myOrderItemMainContainer"
          key={id + index}
          onClick={handleRestaurantClick(id)}
        >
          <div className="myOrderItemLogoImg">
            <RestaurantLogo src={value.logo} />
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
      ))}
    </div>
  );
};

export default MyOrderItem;
