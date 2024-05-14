import Header from "@components/common/header/Header";
import MyOrderList from "@components/orders/myorder/MyOrderList";
import React from "react";
import "./OrdersPage.css";

const OrdersPage: React.FC = () => {
  return (
    <>
      <Header
        hasBackIcon={true}
        title="My Order"
        hasCartIcon={true}
        isFixed={true}
      />

      <div className="orderPageContainer">
        <MyOrderList />
      </div>
    </>
  );
};

export default OrdersPage;
