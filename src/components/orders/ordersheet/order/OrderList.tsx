import React from "react";
import OrderItem from "./OrderItem";
import "./OrderList.css";
import { useLocation } from "react-router-dom";

const OrderList: React.FC = () => {
  const { pathname } = useLocation();
  const isOnDetailsPage = pathname === "/order/details";

  return (
    <div className="OLContainer">
      <div className="OLrestaurantName">Kogi BBQ</div>
      <div className="orderListContainer">
        {/* {order.menus.map(({ name, options, price, quantity }) => ( */}
        <OrderItem
          name="Chicken BBQ Rice Bowl (Large)"
          options={["Lettuce", "YumYum"]}
          price="13800"
          quantity={3}
          isOnDetailsPage={isOnDetailsPage}
        />
        {/* ))} */}
      </div>
    </div>
  );
};

export default OrderList;
