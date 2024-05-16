import React from "react";
import "./AddressDetails.css";
import { AddressType } from "../../../../types/addressType";

const AddressDetails: React.FC<AddressType> = ({ mainAddress, subAddress }) => {
  return (
    <div className="addressDetailsContainer">
      <div>
        <div className="addressDetails">{`${mainAddress} ${subAddress}`}</div>
      </div>
    </div>
  );
};

export default AddressDetails;
