import React from "react";
import MyOrderItem from "./MyOrderItem";
import "./MyOrderList.css";

const MyOrderList: React.FC = () => {
  return (
    <div className="myOrderListContainer">
      <MyOrderItem />
      <MyOrderItem />
    </div>
  );
};

export default MyOrderList;
