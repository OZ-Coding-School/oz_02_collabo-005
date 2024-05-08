import React from "react";
import OrderItem from "./OrderItem";
import { orderType } from "src/pages/OrderSheetPage";
import "./OrderList.css";
import { useLocation } from "react-router-dom";

interface OrderListProps {
  order: orderType;
}

const OrderList: React.FC<OrderListProps> = ({ order }) => {
  const { pathname } = useLocation();
  const isOnDetailsPage = pathname === "/order/details";

  return (
    <div className="OLContainer">
      <div className="OLrestaurantName">{order.restaurant}</div>
      <div className="orderListContainer">
        {order.menus.map(({ name, options, price, quantity }) => (
          <OrderItem
            name={name}
            options={options}
            price={price}
            quantity={quantity}
            isOnDetailsPage={isOnDetailsPage}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderList;
