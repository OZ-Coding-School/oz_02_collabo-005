import React from "react";
import Header from "../../components/common/header/Header";
import CardManagementSection from "../../components/common/addcard/CardManagementSection";
import "./PaymentPage.css";
import Button from "../../components/common/button/Button";

const index: React.FC = () => {
  return (
    <>
      <Header
        hasBackIcon={true}
        to="/order/sheet"
        title="Payment"
        hasCartIcon={false}
      />
      <div className="paymentMainContainer">
        <div className="cardContainer">
          <CardManagementSection />
        </div>
        <div className="totalAccount">
          <span className="totalText">Your Total:</span>
          <span className="totalValue">41,600원</span>
        </div>
        <div className="payNowButtonSection">
          <Button name="Pay now" backgroundColor="#FF6347" to="/order/status" />
        </div>
      </div>
    </>
  );
};

export default index;
