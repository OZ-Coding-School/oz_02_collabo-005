import React from "react";
import Header from "@components/common/header/Header";
import CardManagementSection from "@components/common/addcard/CardManagementSection";
import "./PaymentPage.css";
import Button from "@components/common/button/Button";
import { useNavigate } from "react-router-dom";

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const handlePayNow = (): void => {
    navigate("/order/status");
  };

  return (
    <>
      <Header hasBackIcon={true} title="Payment" hasCartIcon={false} />
      <div className="paymentMainContainer">
        <div className="cardContainer">
          <CardManagementSection />
        </div>
        <div className="bottomSection">
          <div className="totalAccount">
            <span className="totalText">Your Total:</span>
            <span className="totalValue">41,600원</span>
          </div>
          <div className="payNowButtonSection">
            <Button
              name="Pay now"
              handleClick={handlePayNow}
              buttonType="bigButton"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
