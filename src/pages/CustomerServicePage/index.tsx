import Header from "@components/common/header/Header";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerServicePage.css";

const CustomerServicePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header
        hasBackIcon={true}
        title=""
        hasCartIcon={false}
        handleBackIconClick={() => navigate("/home")}
      />
      <div className="CScontainer">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSccQRUNJWp41IlopstJiL28sfcpAPebBNImuhAtQmU1H6HTuQ/viewform"
          className="CSiframe"
        />
      </div>
    </>
  );
};

export default CustomerServicePage;
