import React, { useEffect, useState } from "react";
import "./OrderStatus.css";
import Header from "../../components/common/header/Header";
import Button from "../../components/common/button/Button";
import orderSuccussIcon from "../../assets/icons/orderSuccessIcon.png";
import { PacmanLoader } from "react-spinners";

const OrderStatusPage: React.FC = () => {
  const [isOrderStatus, setIsOrderStatus] = useState<boolean>(true);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 처음 렌더링 될 로딩스피너 10초동안 보여줌(아직 자세한 기능 미구현)
  useEffect(() => {
    const timer = setTimeout((): void => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleToggle = (): void => {
    setIsOrderStatus(!isOrderStatus);
  };

  return (
    <>
      <Header hasBackIcon={true} to="/home" title="" hasCartIcon={false} />

      <div>
        <div>
          {isLoading ? (
            <div className="loadingBar">
              <PacmanLoader color="#ff6347" size="50px" speedMultiplier={0.8} />
              <h2>
                "Your order is in
                <br /> progress..."
              </h2>
            </div>
          ) : (
            <>
              <div className="statusContentContainer">
                <div className="statusText">
                  {isOrderStatus ? (
                    <>
                      <img src={orderSuccussIcon} />
                      <h1>
                        "Order successfully
                        <br />
                        completed."
                      </h1>
                    </>
                  ) : (
                    <>
                      <div className="sorryText">
                        <h1>"Sorry,</h1>
                      </div>
                      <h1>
                        we encountered an issue
                        <br /> processing your order."
                      </h1>
                      <span className="errorMessage">error message</span>
                    </>
                  )}
                </div>
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
              <div className="bottomSection">
                <Button
                  name={isOrderStatus ? "Check your order" : "Ask for help"}
                  backgroundColor="#FF6347"
                  to={isOrderStatus ? "/orders" : "/home"}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderStatusPage;
