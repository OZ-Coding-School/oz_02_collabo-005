import Header from "@components/common/header/Header";
import MyOrderList from "@components/orders/myorder/MyOrderList";
import React from "react";
import { useNavigate } from "react-router-dom";

const OrdersPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header
        hasBackIcon={true}
        title="My Order"
        hasCartIcon={true}
        isFixed={true}
        handleBackIconClick={() => navigate("/home")}
      />
      <div className="orderPageContainer">
        <MyOrderList />
      </div>
    </>
  );
};

export default OrdersPage;
