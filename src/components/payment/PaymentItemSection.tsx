import React from "react";
import PaymentItem from "./PaymentItem";
import { OrderDataType } from "src/types/ordersType";

interface PaymentItemSectionProps {
  payOrderData: OrderDataType;
  setPayOrderData: React.Dispatch<React.SetStateAction<OrderDataType>>;
}

const PaymentItemSection: React.FC<PaymentItemSectionProps> = ({
  payOrderData,
  setPayOrderData,
}) => {
  return (
    <div className="paymentItemsContainer">
      <PaymentItem
        payOrderData={payOrderData}
        setPayOrderData={setPayOrderData}
      />
    </div>
  );
};

export default PaymentItemSection;
