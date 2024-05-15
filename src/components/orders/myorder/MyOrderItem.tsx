import React from "react";
import ResImg from "../../../assets/images/restaurantBackgroundImg.png";
import "./MyOrderItem.css";
import RestaurantLogo from "@components/common/restaurantlogo/RestaurantLogo";
import { useNavigate } from "react-router-dom";
import { OrderHistoryDataType } from "../../../types/ordersType";

interface MyOrderItemProps {
  orderHistoryList: OrderHistoryDataType;
}

const MyOrderItem: React.FC<MyOrderItemProps> = ({ orderHistoryList }) => {
  const navigate = useNavigate();
  const handleViewOrderClick = () => {
    navigate("/order/details");
  };

  const handleRestaurantClick = (restaurantId: number) => {
    return () => {
      navigate(`/restaurant/${restaurantId}`);
    };
  };

  const orderDate = new Date(orderHistoryList.order_time);
  const formattedOrderDate = `${orderDate.getFullYear()}-${String(orderDate.getMonth() + 1).padStart(2, "0")}-${String(orderDate.getDate()).padStart(2, "0")}`;

  return (
    <div className="myOrderItemContainer">
      <div className="myOrderItemTop">
        <div className="myOrderDate">{formattedOrderDate}</div>
        <button className="viewOrderBtn" onClick={handleViewOrderClick}>
          View order
        </button>
      </div>
      {orderHistoryList.menus.map((menu, index) => (
        <div
          className="myOrderItemMainContainer"
          key={index}
          onClick={handleRestaurantClick(menu.restaurant_id)}
        >
          <div className="myOrderItemLogoImg">
            <RestaurantLogo src={ResImg} />
          </div>
          <div className="myOrderInfoSection">
            <div className="MIresName">{menu.restaurant_name}</div>
            {menu.menu_name.quantity === 1 ? (
              <div className="MImenuName">{menu.menu_name.name}</div>
            ) : (
              <div className="MImenuName">
                {menu.menu_name.name} and {menu.menu_name.quantity - 1} more
              </div>
            )}

            <div className="MIprice">{menu.menu_name.total_price} won</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrderItem;
