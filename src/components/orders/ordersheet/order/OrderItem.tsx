import QuantityButton from "@components/common/button/QuantityButton";
import React, { useState } from "react";
import { BiSolidTrash } from "react-icons/bi";
import "./OrderItem.css";
import { MenuOption } from "src/types/ordersType";
import { addCommasToNumberString } from "./../../../../utils/addCommas";

interface OrderItemProps {
  name: string;
  options: MenuOption[];
  price: number;
  quantity: number;
  isOnDetailsPage?: boolean;
}

const OrderItem: React.FC<OrderItemProps> = ({
  name,
  options,
  price,
  quantity,
  isOnDetailsPage,
}) => {
  const optionList =
    options.length === 0
      ? "unselected"
      : options.map((option) => option.name).join(", ");
  const [count, setCount] = useState(quantity);

  const handlePlusBtnClick = (): void => {
    setCount((prev) => prev + 1);
  };

  const handleMinusBtnClick = (): void => {
    if (count == 1) return;
    setCount((prev) => prev - 1);
  };

  return (
    <div className="orderItemContainer">
      <button className="deleteButton">
        {!isOnDetailsPage && <BiSolidTrash className="deleteBtnIcon" />}
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
