import React, { useState } from "react";
import { BiSolidTrash } from "react-icons/bi";
import QuantityButton from "@components/common/button/QuantityButton";
import "./OrderItem.css";
import {
  MenuOption,
  CartDataType,
  cartType,
  Order,
} from "../../../../types/ordersType";
import { addCommasToNumberString } from "./../../../../utils/addCommas";
import customAxios from "./../../../../api/axios";
import apiRoutes from "./../../../../api/apiRoutes";
import { useLatLngStore } from "./../../../../store/useLatLngStore";

interface OrderItemProps {
  id: number;
  name: string;
  options: MenuOption[];
  price: number;
  quantity: number;
  setCartData?: React.Dispatch<React.SetStateAction<CartDataType | null>>;
  isOnDetailsPage?: boolean;
  status?: number;
  isClosing?: boolean;
}

const OrderItem: React.FC<OrderItemProps> = ({
  id,
  name,
  options,
  price,
  quantity,
  setCartData,
  isOnDetailsPage,
  status,
  isClosing,
}) => {
  const optionList =
    options.length === 0
      ? "unselected"
      : options.map((option) => option.name).join(", ");

  const { lat, lng } = useLatLngStore();
  const [count, setCount] = useState(quantity);

  const orders: Order = JSON.parse(localStorage.getItem("orderData")!);
  const coordinate =
    lat === "" && lng === "" ? [] : [parseFloat(lat), parseFloat(lng)];

  const isSoldOut = status === 210002;

  const handlePlusBtnClick = async () => {
    setCount((prev) => prev + 1);
    if (orders !== null && orders !== undefined) {
      const updatedOrders = orders.orders.map((order) => {
        return {
          ...order,
          menus: order.menus.map((menu) => {
            if (menu.id === id) {
              return {
                ...menu,
                quantity: quantity + 1,
              };
            } else return menu;
          }),
        };
      });

      const postOrderData: cartType = {
        orders: updatedOrders,
        coordinate,
      };

      if (setCartData)
        try {
          const response = await customAxios.post(
            apiRoutes.cart,
            postOrderData
          );
          localStorage.setItem(
            "orderData",
            JSON.stringify({ orders: updatedOrders })
          );
          localStorage.setItem("cartData", JSON.stringify(response.data.data));

          setCartData(response.data.data);
          changeCartCount();
          if (response?.status !== 200) throw new Error("An error occurred.");
        } catch (error) {
          console.error("Failed to fetch restaurants:", error);
        }
    }
  };

  const handleMinusBtnClick = async () => {
    if (count === 1) return;
    setCount((prev) => prev - 1);
    if (orders !== null && orders !== undefined) {
      const updatedOrders = orders.orders.map((order) => {
        return {
          ...order,
          menus: order.menus.map((menu) => {
            if (menu.id === id) {
              return {
                ...menu,
                quantity: quantity - 1,
              };
            } else return menu;
          }),
        };
      });

      const postOrderData: cartType = {
        orders: updatedOrders,
        coordinate,
      };
      if (setCartData)
        try {
          const response = await customAxios.post(
            apiRoutes.cart,
            postOrderData
          );
          localStorage.setItem(
            "orderData",
            JSON.stringify({ orders: updatedOrders })
          );
          localStorage.setItem("cartData", JSON.stringify(response.data.data));
          setCartData(response.data.data);
          changeCartCount();
        } catch (error) {
          console.error("Failed to fetch restaurants:", error);
        }
    }
  };

  const handleDeleteClick = async () => {
    const orders: Order = JSON.parse(localStorage.getItem("orderData")!);
    const coordinate =
      lat === "" && lng === "" ? [] : [parseFloat(lat), parseFloat(lng)];

    if (orders !== null && orders !== undefined) {
      const updatedOrders = orders.orders
        .map((order) => {
          return {
            ...order,
            menus: order.menus.filter((menu) => menu.id !== id),
          };
        })
        .filter((order) => order.menus.length > 0);

      const postOrderData: cartType = {
        orders: updatedOrders,
        coordinate,
      };

      if (setCartData)
        try {
          const response = await customAxios.post(
            apiRoutes.cart,
            postOrderData
          );
          localStorage.setItem(
            "orderData",
            JSON.stringify({ orders: updatedOrders })
          );
          localStorage.setItem("cartData", JSON.stringify(response.data.data));
          setCartData(response.data.data);
          changeCartCount();
        } catch (error) {
          console.error("Failed to fetch restaurants:", error);
        }
    }
  };

  const changeCartCount = () => {
    const orders: Order = JSON.parse(localStorage.getItem("orderData")!);

    const totalQuantity = orders.orders
      .map((order) =>
        order.menus.reduce((acc, cur) => {
          return acc + cur.quantity;
        }, 0)
      )
      .reduce((acc, cur) => {
        return acc + cur;
      }, 0);

    localStorage.setItem("cartCount", JSON.stringify(totalQuantity));
  };

  return (
    <div className="orderItemContainer">
      <button className="deleteButton">
        {!isOnDetailsPage && (
          <BiSolidTrash className="deleteBtnIcon" onClick={handleDeleteClick} />
        )}
      </button>
      <div className="orderInfoSection">
        <div
          className={`OImenuName ${isSoldOut || isClosing ? "OInotice" : ""}`}
        >
          {name}
        </div>
        <div className="OIoptionList">options: {optionList}</div>
        <div className="OIprice">{addCommasToNumberString(price)} won</div>
      </div>
      <div className="orderBtnSection">
        {!isSoldOut && !isClosing && (
          <QuantityButton
            quantity={count}
            handlePlusBtnClick={handlePlusBtnClick}
            handleMinusBtnClick={handleMinusBtnClick}
            disabled={isOnDetailsPage}
          />
        )}
        {isSoldOut && <div className="noticeLabel">Sold out</div>}
        {isClosing && <div className="noticeLabel">Close</div>}
      </div>
    </div>
  );
};

export default OrderItem;
