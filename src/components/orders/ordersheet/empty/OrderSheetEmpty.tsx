import React from "react";
import OrderSheetEmptyImg from "./../../../../assets/images/cartEmptyImg.webp";
import "./OrderSheetEmpty.css";

const OrderSheetEmpty: React.FC = () => {
  return (
    <div className="OrderSheetEmptyContainer">
      <img src={OrderSheetEmptyImg} alt="orderSheetEmpty" className="OSImg" />
      <div className="MEmessage">" Your Cart is Currently Empty."</div>
    </div>
  );
};

export default OrderSheetEmpty;
