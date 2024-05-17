import React from "react";
import "./AddressDetails.css";

interface addressDetails {
  addressData: string;
}

const AddressDetails: React.FC<addressDetails> = ({ addressData }) => {
  return (
    <div className="addressDetailsContainer">
      <div>
        <div className="addressDetails">{addressData}</div>
      </div>
    </div>
  );
};

export default AddressDetails;
