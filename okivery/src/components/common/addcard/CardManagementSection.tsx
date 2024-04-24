import React from "react";
import AddCardItem from "./AddCardItem";
import "./CardManagementSection.css";

const CardManagementSection: React.FC = () => {
  return (
    <>
      <div>Payment</div>
      <div className="addCardSection">
        <AddCardItem />
      </div>
    </>
  );
};

export default CardManagementSection;
