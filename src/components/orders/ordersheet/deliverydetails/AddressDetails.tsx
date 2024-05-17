import React from "react";
import "./AddressDetails.css";
import { AddressType } from "../../../../types/addressType";

interface AddressDetailsType {
  addressData: AddressType;
}

const AddressDetails: React.FC<AddressDetailsType> = ({ addressData }) => {
  return (
    <div className="addressDetailsContainer">
      <div>
        <div className="addressDetails">{`${addressData.mainAddress} ${addressData.subAddress}`}</div>
      </div>
    </div>
  );
};

export default AddressDetails;
