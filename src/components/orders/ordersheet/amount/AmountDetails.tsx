import React from "react";
import "./AmountDetails.css";
import { addCommasToNumberString } from "./../../../../utils/addCommas";

interface AmountDetailsProps {
  orderPrice?: number | undefined;
  deliveryFee?: number | undefined;
  totalPrice?: number | undefined;
}

const AmountDetails: React.FC<AmountDetailsProps> = ({
  orderPrice,
  deliveryFee,
  totalPrice,
}) => {
  const stringOrderPrice = addCommasToNumberString(orderPrice || 0);
  const stringDeliveryFee = addCommasToNumberString(deliveryFee || 0);
  const stringTotalPrice = addCommasToNumberString(totalPrice || 0);

  return (
    <div className="amountDetailsContainer">
      <div className="amountDetailsItemSection">
        <div className="amountDetailsItem">
          <div>Order Price</div>
          <div>{stringOrderPrice} won</div>
        </div>
        <div className="amountDetailsItem">
          <div>Delivery Fee</div>
          <div>{stringDeliveryFee} won</div>
        </div>
      </div>
      <div className="amountDetailsSection">
        <div className="amountText">
          <div className="totalText">Total</div>
          <div className="totalAmountText">{stringTotalPrice} won</div>
        </div>
        <div className="deliveryNotification">
          * minimum free delivery free 16,900 won
        </div>
      </div>
    </div>
  );
};

export default AmountDetails;
