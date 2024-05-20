import React, { useEffect, useState } from "react";
import Header from "@components/common/header/Header";
import PaymentItemSection from "@components/payment/PaymentItemSection";
import "./PaymentPage.css";
import { useNavigate } from "react-router-dom";
import { addCommasToNumberString } from "./../../utils/addCommas";
import customAxios from "./../../api/axios";
import apiRoutes from "./../../api/apiRoutes";
import { PacmanLoader } from "react-spinners";
import getPayStatus from "@components/payment/payStatus";
import { OrderDataType } from "src/types/ordersType";
import Button from "@components/common/button/Button";

interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export type PayButtonType = {
  name: string;
};

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [payOrderData, setPayOrderData] = useState<OrderDataType>(
    JSON.parse(localStorage.getItem("payOrderData")!)
  );

  const getAmount = () => {
    const cartData = localStorage.getItem("cartData");
    if (cartData) {
      setAmount(JSON.parse(cartData).total_price);
    }
  };

  const handlePayNow = async () => {
    let errorMessage = "";

    if (payOrderData) {
      try {
        setIsLoading(true);
        const response = await customAxios.post(
          apiRoutes.orderCreate,
          payOrderData
        );

        if (response.status === 201) {
          if (response.data.data.code === (300000 || 310001)) {
            localStorage.removeItem("orderData");
            localStorage.setItem("cartCount", "0");
            localStorage.removeItem("cartData");
            navigate("/order/status", { state: { isSuccess: true } });
          } else {
            const { message } = getPayStatus(
              response.data.data.fail,
              response.data.message
            );
            const payError = message;
            errorMessage = `error code: ${response.data.data.fail} - ${payError}`;
            navigate("/order/status", {
              state: { isSuccess: false, errorMessage },
            });
          }
        }
      } catch (error) {
        errorMessage =
          (error as ErrorResponse).response?.data?.message || "Server error";
        navigate("/order/status", {
          state: { isSuccess: false, errorMessage },
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    getAmount();
  }, []);

  return (
    <>
      <Header
        hasBackIcon={true}
        title="Payment"
        hasCartIcon={false}
        handleBackIconClick={() => navigate(-1)}
      />
      {isLoading ? (
        <div className="loadingBar">
          <PacmanLoader color="#ff6347" size="50px" speedMultiplier={0.8} />
          <h2>
            "Your order is in
            <br /> progress..."
          </h2>
        </div>
      ) : (
        <div className="paymentMainContainer">
          <div className="cardContainer">
            <PaymentItemSection
              payOrderData={payOrderData}
              setPayOrderData={setPayOrderData}
            />
          </div>
          <div className="bottomSection">
            <div className="totalAccount">
              <span className="totalText">Your Total:</span>
              <span className="totalValue">
                {amount && addCommasToNumberString(amount)} won
              </span>
            </div>
            <div className="payNowButtonSection">
              <Button
                name="Pay Now"
                handleClick={handlePayNow}
                buttonType="bigButton"
                backgroundColor={
                  payOrderData.payment_method !== 0 ? "#FF6347" : "#767676"
                }
                disabled={payOrderData.payment_method === 0}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentPage;
