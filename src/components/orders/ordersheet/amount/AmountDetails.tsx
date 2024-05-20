import React, { useEffect, useState } from "react";
import "./AmountDetails.css";
import { addCommasToNumberString } from "./../../../../utils/addCommas";

interface AmountDetailsProps {
  orderPrice?: number | undefined;
  deliveryFee?: number | undefined;
  totalPrice?: number | undefined;
  paymentMethod?: number | undefined;
  isViewOrderDetail?: boolean;
}

const AmountDetails: React.FC<AmountDetailsProps> = ({
  orderPrice,
  deliveryFee,
  totalPrice,
  paymentMethod,
  isViewOrderDetail,
}) => {
  const stringOrderPrice = addCommasToNumberString(orderPrice || 0);
  const stringDeliveryFee = addCommasToNumberString(deliveryFee || 0);
  const stringTotalPrice = addCommasToNumberString(totalPrice || 0);
  const [isDeliveryFree, setIsDeliveryFree] = useState<boolean>(false);
  const [payment, setPayment] = useState<string>("");

  useEffect(() => {
    const getPayment = () => {
      if (paymentMethod === 310201) {
        setPayment("offline card payment");
      } else if (paymentMethod === 310202) {
        setPayment("offline cash payment");
      } else if (paymentMethod === 310101) {
        setPayment("online card payment");
      } else if (paymentMethod === 310102) {
        setPayment("online cash payment");
      }
    };
    getPayment();
  }, []);

  useEffect(() => {
    const isFree = (orderPrice || 0) >= 16900;
    setIsDeliveryFree(isFree);
  }, [totalPrice]);

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
        {isViewOrderDetail && (
          <div className="paymentMethodContainer">
            <div className="paymentMethodText">Payment method</div>
            <div>{payment}</div>
          </div>
        )}
        {!isDeliveryFree && (
          <div className="deliveryNotification">
            * minimum free delivery free 16,900 won
          </div>
        )}
      </div>
    </div>
  );
};

export default AmountDetails;
