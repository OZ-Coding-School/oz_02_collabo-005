import React from "react";
import OrderSheetEmptyImg from "./../../../../assets/images/cartEmptyImg.png";
import "./OrderSheetEmpty.css";

const OrderSheetEmpty: React.FC = () => {
  return (
    <div className="OrderSheetEmptyContainer">
      <img src={OrderSheetEmptyImg} className="OSImg" />
      <div className="MEmessage">" Your Cart is Currently Empty."</div>
    </div>
  );
};

export default OrderSheetEmpty;
