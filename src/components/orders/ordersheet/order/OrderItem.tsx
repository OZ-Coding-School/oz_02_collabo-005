import QuantityButton from "@components/common/button/QuantityButton";
import React, { useState } from "react";
import { menuType } from "src/pages/OrderSheetPage";
import { BiSolidTrash } from "react-icons/bi";
import "./OrderItem.css";

interface OrderItemProps extends menuType {
  isOnDetailsPage?: boolean;
}

const OrderItem: React.FC<OrderItemProps> = ({
  name,
  options,
  price,
  quantity,
  isOnDetailsPage,
}) => {
  const optionList = options.length === 0 ? "unselected" : options.join(",");
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
        <div className="OIprice">{price}won</div>
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
