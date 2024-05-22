import React from 'react';
import { useNavigate } from 'react-router-dom';
import OrderItem from './OrderItem';
import './OrderList.css';
import { Menu, Restaurant, CartDataType } from '../../../../types/ordersType';

interface OrderListType {
  restaurant: Restaurant;
  menus: Menu[];
  setCartData?: React.Dispatch<React.SetStateAction<CartDataType | null>>;
  isViewOrderDetail?: boolean;
}

const OrderList: React.FC<OrderListType> = React.memo(
  ({ restaurant, menus, setCartData, isViewOrderDetail }) => {
    const navigate = useNavigate();
    const isClosing = restaurant.status !== 200001;

    return (
      <div className="OLContainer">
        <div
          className="OLrestaurantName"
          onClick={() => navigate(`/restaurant/${restaurant.id}`)}
        >
          {restaurant.name}
        </div>
        <div className="orderListContainer closingRestaurant">
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
              isClosing={isViewOrderDetail ? false : isClosing}
              {...(isViewOrderDetail ? null : { status: menu.status })}
            />
          ))}
        </div>
      </div>
    );
  }
);

export default OrderList;
