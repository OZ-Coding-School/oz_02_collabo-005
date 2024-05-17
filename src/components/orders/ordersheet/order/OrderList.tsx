import React from "react";
import { useNavigate } from "react-router-dom";
import OrderItem from "./OrderItem";
import "./OrderList.css";
import { Menu, Restaurant, CartDataType } from "src/types/ordersType";

interface OrderListType {
  restaurant: Restaurant;
  menus: Menu[];
  setCartData?: React.Dispatch<React.SetStateAction<CartDataType | null>>;
  isViewOrderDetail?: boolean;
  setIsViewOrderDetail?: React.Dispatch<React.SetStateAction<boolean>>;
}

const OrderList: React.FC<OrderListType> = ({
  restaurant,
  menus,
  setCartData,
  isViewOrderDetail,
}) => {
  const navigate = useNavigate();

  return (
    <div className="OLContainer">
      <div
        className="OLrestaurantName"
        onClick={() => navigate(`/restaurant/${restaurant.id}`)}
      >
        {restaurant.name}
      </div>
      <div className="orderListContainer">
        {menus.map((menu) => (
          <OrderItem
            isOnDetailsPage={isViewOrderDetail}
            key={menu.id}
            id={menu.id}
            name={menu.name}
            options={menu.options}
            price={menu.menu_total_price}
            quantity={menu.quantity}
            setCartData={setCartData}
            {...(isViewOrderDetail ? null : { status: menu.status })}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderList;
