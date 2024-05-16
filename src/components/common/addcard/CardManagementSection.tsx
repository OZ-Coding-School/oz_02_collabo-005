import React from "react";
import AddCardItem from "./AddCardItem";
import "./CardManagementSection.css";

const CardManagementSection: React.FC = () => {
  return (
    <>
      <div className="cardSection">
        <div>Payment</div>
        <div className="addCardSection">
          <AddCardItem />
        </div>
      </div>
    </>
  );
};

export default CardManagementSection;
