import React, { useEffect, useState } from "react";
import Header from "@components/common/header/Header";
import CardManagementSection from "@components/common/addcard/CardManagementSection";
import "./PaymentPage.css";
import Button from "@components/common/button/Button";
import { useNavigate } from "react-router-dom";
import { addCommasToNumberString } from "./../../utils/addCommas";
import customAxios from "./../../api/axios";
import apiRoutes from "./../../api/apiRoutes";
import { PacmanLoader } from "react-spinners";

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getAmount = () => {
    const cartData = localStorage.getItem("cartData");
    if (cartData) {
      setAmount(JSON.parse(cartData).total_price);
    }
  };

  const handlePayNow = async () => {
    setIsLoading(true);
    const data = JSON.parse(localStorage.getItem("payOrderData")!);
    if (data) {
      try {
        const response = await customAxios.post(apiRoutes.orderCreate, data);
        if (response?.status !== 201) throw new Error("An error occurred.");
        setIsLoading(false);
        navigate("/order/status");
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
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
              <Button
                name="Pay now"
                handleClick={handlePayNow}
                buttonType="bigButton"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentPage;
