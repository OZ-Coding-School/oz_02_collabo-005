import Header from "@components/common/header/Header";
import MyOrderList from "@components/orders/myorder/MyOrderList";
import React from "react";
import "./OrdersPage.css";
import MyOrderEmpty from "@components/orders/myorder/MyOrderEmpty";

const OrdersPage: React.FC = () => {
  const isOrdersEmpty = false;
  return (
    <>
      <Header
        hasBackIcon={true}
        title="My Order"
        hasCartIcon={true}
        isFixed={true}
      />
      {!isOrdersEmpty ? (
        <div className="orderPageContainer">
          <MyOrderList />
        </div>
      ) : (
        <MyOrderEmpty />
      )}
    </>
  );
};

export default OrdersPage;
