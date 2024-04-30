import React from "react";
import OrderItem from "./OrderItem";
import { orderType } from "src/pages/OrderSheetPage";
import "./OrderList.css";

interface OrderListProps {
  order: orderType;
}

const OrderList: React.FC<OrderListProps> = ({ order }) => {
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
          />
        ))}
      </div>
    </div>
  );
};

export default OrderList;
