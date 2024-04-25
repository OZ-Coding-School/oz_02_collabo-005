import React, { useState } from "react";
import "./OrderStatus.css";
import Header from "../../components/common/header/Header";
import Button from "../../components/common/button/Button";

const OrderStatusPage: React.FC = () => {
  const [isOrderStatus, setIsOrderStatus] = useState<boolean>(true);

  const handleToggle = () => {
    setIsOrderStatus(!isOrderStatus);
  };

  return (
    <>
      <Header hasBackIcon={true} to="/home" title="" hasCartIcon={false} />
      <div className="statusMainContainer">
        <div className="statusSubContainer">
          <div className="statusText">
            <button
              style={{
                width: "100px",
                height: "30px",
                fontSize: "20px",
              }}
              onClick={handleToggle}
            >
              toggle
            </button>
            {isOrderStatus ? (
              <>
                <h2>
                  "Order successfully
                  <br />
                  completed."
                </h2>
              </>
            ) : (
              <>
                <h2 className="sorryText">"Sorry,</h2>
                <h2>
                  we encountered an issue
                  <br /> processing your order."
                </h2>
                <span style={{ textDecoration: "underline" }}>
                  error message
                </span>
              </>
            )}
          </div>
          <Button
            name={isOrderStatus ? "Check your order" : "Ask for help"}
            backgroundColor="#FF6347"
            to={isOrderStatus ? "/orders" : "/home"}
          />
        </div>
      </div>
    </>
  );
};

export default OrderStatusPage;
