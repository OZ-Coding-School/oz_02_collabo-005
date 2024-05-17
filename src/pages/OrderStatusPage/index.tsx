import React, { useState } from "react";
import "./OrderStatus.css";
import Header from "@components/common/header/Header";
import Button from "@components/common/button/Button";
import { useNavigate } from "react-router-dom";
import orderSuccessIcon from "../../assets/icons/orderSuccessIcon.png";

const OrderStatusPage: React.FC = () => {
  const [isOrderStatus, setIsOrderStatus] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleToggle = (): void => {
    setIsOrderStatus(!isOrderStatus);
  };

  const handleSuccess = (): void => {
    navigate("/orders");
  };

  const handleFailed = (): void => {
    alert("고객센터로 이동합니다");
  };

  return (
    <>
      <Header
        hasBackIcon={true}
        title=""
        hasCartIcon={false}
        handleBackIconClick={() => navigate("/home")}
      />
      <div>
        <div className="statusContentContainer">
          <div className="statusText">
            {isOrderStatus ? (
              <>
                <img src={orderSuccessIcon} />
                <h1>
                  "Order successfully
                  <br />
                  completed."
                </h1>
              </>
            ) : (
              <>
                <h1>"Sorry,</h1>
                <h1>
                  we encountered an issue
                  <br /> processing your order."
                </h1>
                <span className="errorMessage">error message</span>
              </>
            )}
          </div>
          <div
            className="toggleButton"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
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
          </div>
        </div>
        <div className="bottomSection">
          <Button
            name={isOrderStatus ? "Check your order" : "Ask for help"}
            handleClick={isOrderStatus ? handleSuccess : handleFailed}
            buttonType="bigButton"
            type="button"
          />
        </div>
      </div>
    </>
  );
};

export default OrderStatusPage;
