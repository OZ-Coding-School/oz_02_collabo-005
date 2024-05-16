import React from "react";
import "./AmountDetails.css";
import { addCommasToNumberString } from "./../../../../utils/addCommas";

interface AmountDetailsProps {
  orderPrice?: number;
  deliveryFee?: number;
  totalPrice?: number;
}

const AmountDetails: React.FC<AmountDetailsProps> = ({
  orderPrice = 0,
  deliveryFee = 0,
  totalPrice = 0,
}) => {
  return (
    <div className="amountDetailsContainer">
      <div className="amountDetailsItemSection">
        <div className="amountDetailsItem">
          <div>Order Price</div>
          <div>{addCommasToNumberString(orderPrice)} won</div>
        </div>
        <div className="amountDetailsItem">
          <div>Delivery Fee</div>
          <div>{addCommasToNumberString(deliveryFee)} won</div>
        </div>
      </div>
      <div className="amountDetailsSection">
        <div className="amountText">
          <div className="totalText">Total</div>
          <div className="totalAmountText">
            {addCommasToNumberString(totalPrice)} won
          </div>
        </div>
        <div className="deliveryNotification">
          * minimum free delivery free 16,900 won
        </div>
      </div>
    </div>
  );
};

export default AmountDetails;
