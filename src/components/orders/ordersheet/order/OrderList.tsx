import React from "react";
import OrderItem from "./OrderItem";
import "./OrderList.css";
import { useLocation } from "react-router-dom";
import { Menu, Restaurant } from "src/types/ordersType";

interface OrderListType {
  restaurant: Restaurant;
  menus: Menu[];
}

const OrderList: React.FC<OrderListType> = ({ restaurant, menus }) => {
  const { pathname } = useLocation();
  const isOnDetailsPage = pathname === "/order/details";

  return (
    <div className="OLContainer">
      <div className="OLrestaurantName">{restaurant?.name}</div>
      <div className="orderListContainer">
        {menus.map(({ name, options, menu_total_price, quantity }) => (
          <OrderItem
            name={name}
            options={options}
            price={menu_total_price}
            quantity={quantity}
            isOnDetailsPage={isOnDetailsPage}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderList;
