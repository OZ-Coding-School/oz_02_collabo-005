import React from "react";
import OrderItem from "./OrderItem";
import "./OrderList.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, Restaurant } from "src/types/ordersType";

interface OrderListType {
  restaurant: Restaurant;
  menus: Menu[];
}

const OrderList: React.FC<OrderListType> = ({ restaurant, menus }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isOnDetailsPage = pathname === "/order/details";

  return (
    <div className="OLContainer">
      <div
        className="OLrestaurantName"
        onClick={() => navigate(`/restaurant/${restaurant.id}`)}
      >
        {restaurant?.name}
      </div>
      <div className="orderListContainer">
        {menus.map(
          ({ id, name, options, menu_total_price, quantity, resId }) => (
            <OrderItem
              id={id}
              name={name}
              options={options}
              price={menu_total_price}
              quantity={quantity}
              isOnDetailsPage={isOnDetailsPage}
              resId={restaurant.id}
            />
          )
        )}
      </div>
    </div>
  );
};

export default OrderList;
