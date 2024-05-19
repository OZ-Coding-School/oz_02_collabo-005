import React, { useEffect, useState } from "react";
import Header from "@components/common/header/Header";
import CardManagementSection from "@components/common/addcard/CardManagementSection";
import "./PaymentPage.css";
import { useNavigate } from "react-router-dom";
import { addCommasToNumberString } from "./../../utils/addCommas";
import customAxios from "./../../api/axios";
import apiRoutes from "./../../api/apiRoutes";
import { PacmanLoader } from "react-spinners";
import PayButtons from "@components/payment/PayButtons";
import getPayStatus from "@components/payment/payStatus";

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
  const payButtons: PayButtonType[] = [
    { name: "Online payment (credit card)" },
    { name: "On-site payment (credit card)" },
    { name: "On-site payment (cash)" },
  ];
  const navigate = useNavigate();
  const [amount, setAmount] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getAmount = () => {
    const cartData = localStorage.getItem("cartData");
    if (cartData) {
      setAmount(JSON.parse(cartData).total_price);
    }
  };

  const handlePayNow = async (buttonName: string) => {
    setIsLoading(true);
    let errorMessage = "";

    const data = JSON.parse(localStorage.getItem("payOrderData")!);
    if (data) {
      if (buttonName === "On-site payment (credit card)") {
        data.payment_method = 310201;
      } else if (buttonName === "On-site payment (cash)") {
        data.payment_method = 310202;
      }
      try {
        const response = await customAxios.post(apiRoutes.orderCreate, data);
        console.log(response.data.data);
        if (response.status === 201) {
          if (response.data.data.code === (300000 || 310001)) {
            localStorage.removeItem("orderData");
            localStorage.setItem("cartCount", "0");
            localStorage.removeItem("cartData");
            navigate("/order/status", { state: { isSuccess: true } });
          } else {
            const { message } = getPayStatus(response.data.data.fail);
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
        <>
          <div className="loadingBar">
            <PacmanLoader color="#ff6347" size="50px" speedMultiplier={0.8} />
            <h2>
              "Your order is in
              <br /> progress..."
            </h2>
          </div>
        </>
      ) : (
        <div className="paymentMainContainer">
          <div className="cardContainer">
            <CardManagementSection />
          </div>
          <div className="bottomSection">
            <div className="totalAccount">
              <span className="totalText">Your Total:</span>
              <span className="totalValue">
                {amount && addCommasToNumberString(amount)} won
              </span>
            </div>
            <div className="payNowButtonSection">
              <PayButtons payButtons={payButtons} handlePayNow={handlePayNow} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentPage;
