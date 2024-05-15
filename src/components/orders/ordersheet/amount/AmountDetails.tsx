import React from "react";
import "./AmountDetails.css";

const AmountDetails: React.FC = () => {
  return (
    <div className="amountDetailsContainer">
      <div className="amountDetailsItemSection">
        <div className="amountDetailsItem">
          <div>주문 금액</div>
          <div>41,400 won</div>
        </div>
        <div className="amountDetailsItem">
          <div>배달비</div>
          <div>4,400 won</div>
        </div>
      </div>
      <div className="amountDetailsSection">
        <div className="amountText">
          <div className="totalText">Total</div>
          <div className="totalAmountText">45,800 won</div>
        </div>
        <div className="deliveryNotification">
          * minimum free delivery free 14,900won
        </div>
      </div>
    </div>
  );
};

export default AmountDetails;
