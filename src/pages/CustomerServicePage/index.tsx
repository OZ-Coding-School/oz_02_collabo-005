import Header from "@components/common/header/Header";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerServicePage.css";
import Loading from "@components/common/loading/loading";

const CustomerServicePage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // `onLoad` 이벤트 핸들러 함수
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      <Header
        hasBackIcon={true}
        title=""
        hasCartIcon={false}
        handleBackIconClick={() => navigate("/home")}
      />
      {isLoading && <Loading />}
      <div className={`CScontainer ${isLoading ? "loading" : ""}`}>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSccQRUNJWp41IlopstJiL28sfcpAPebBNImuhAtQmU1H6HTuQ/viewform"
          className="CSiframe"
          onLoad={handleIframeLoad}
        />
      </div>
    </>
  );
};

export default CustomerServicePage;
