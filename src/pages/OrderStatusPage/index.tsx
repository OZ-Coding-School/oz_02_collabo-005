import React from "react";
import "./OrderStatus.css";
import Header from "@components/common/header/Header";
import Button from "@components/common/button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import orderSuccessIcon from "../../assets/icons/orderSuccessIcon.png";

const OrderStatusPage: React.FC = () => {
  const location = useLocation();
  const isSuccess = location.state && location.state.isSuccess;
  const errorMessage = location.state && location.state.errorMessage;
  const navigate = useNavigate();

  const handleSuccess = (): void => {
    navigate("/orders");
  };

  const handleFailed = (): void => {
    navigate("/order/status/CustomerService");
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
            {isSuccess ? (
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
                <span className="errorMessage">{errorMessage}</span>
              </>
            )}
          </div>
          <div
            className="toggleButton"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          ></div>
        </div>
        <div className="statusBottomSection">
          <Button
            name={isSuccess ? "Check your order" : "Ask for help"}
            handleClick={isSuccess ? handleSuccess : handleFailed}
            buttonType="bigButton"
            type="button"
          />
        </div>
      </div>
    </>
  );
};

export default OrderStatusPage;
