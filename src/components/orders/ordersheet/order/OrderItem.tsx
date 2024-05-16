import React, { useState } from "react";
import { BiSolidTrash } from "react-icons/bi";
import QuantityButton from "@components/common/button/QuantityButton";
import "./OrderItem.css";
import {
  MenuOption,
  CartDataType,
  cartType,
  Order,
} from "src/types/ordersType";
import { addCommasToNumberString } from "./../../../../utils/addCommas";
import customAxios from "./../../../../api/axios";
import apiRoutes from "./../../../../api/apiRoutes";
import useLatLngStore from "./../../../../store/useLatLngStore";

interface OrderItemProps {
  id: number;
  name: string;
  options: MenuOption[];
  price: number;
  quantity: number;
  setCartData: React.Dispatch<React.SetStateAction<CartDataType | null>>;
  isOnDetailsPage?: boolean;
}

const OrderItem: React.FC<OrderItemProps> = ({
  id,
  name,
  options,
  price,
  quantity,
  setCartData,
  isOnDetailsPage,
}) => {
  const optionList =
    options.length === 0
      ? "unselected"
      : options.map((option) => option.name).join(", ");
  const { lat, lng } = useLatLngStore();
  const [count, setCount] = useState(quantity);

  const handlePlusBtnClick = (): void => {
    setCount((prev) => prev + 1);
  };

  const handleMinusBtnClick = (): void => {
    if (count === 1) return;
    setCount((prev) => prev - 1);
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

      try {
        const response = await customAxios.post(apiRoutes.cart, postOrderData);
        localStorage.setItem(
          "orderData",
          JSON.stringify({ orders: updatedOrders })
        );
        localStorage.setItem("cartData", JSON.stringify(response.data.data));

        setCartData(response.data.data);
        if (response?.status !== 200) throw new Error("An error occurred.");
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
      }
    }
  };

  return (
    <div className="orderItemContainer">
      <button className="deleteButton">
        {!isOnDetailsPage && (
          <BiSolidTrash className="deleteBtnIcon" onClick={handleDeleteClick} />
        )}
      </button>
      <div className="orderInfoSection">
        <div className="OImenuName">{name}</div>
        <div className="OIoptionList">options: {optionList}</div>
        <div className="OIprice">{addCommasToNumberString(price)} won</div>
      </div>
      <div className="orderBtnSection">
        <QuantityButton
          quantity={count}
          handlePlusBtnClick={handlePlusBtnClick}
          handleMinusBtnClick={handleMinusBtnClick}
          disabled={isOnDetailsPage}
        />
      </div>
    </div>
  );
};

export default OrderItem;
