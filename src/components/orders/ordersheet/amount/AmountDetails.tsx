import React from "react";
import { orderType } from "src/pages/OrderSheetPage";
import "./AmountDetails.css";

interface AmountDetailsProps {
  orders: orderType[];
}

const AmountDetails: React.FC<AmountDetailsProps> = ({ orders }) => {
  return (
    <div className="amountDetailsContainer">
      <div className="amountDetailsItemSection">
        {orders.map(({ menus }) =>
          menus.map(({ name, price, quantity }) => (
            <div className="amountDetailsItem">
              <div>
                {name} {quantity}
              </div>
              <div>{`${quantity} * ${price}`}</div>
            </div>
          ))
        )}
      </div>
      <div className="amountDetailsSection">
        <div className="amountText">
          <div className="totalText">Total</div>
          <div className="totalAmountText">총 금액</div>
        </div>
        <div className="deliveryNotification">
          * minimum free delivery free 14,900won
        </div>
      </div>
    </div>
  );
};

export default AmountDetails;
