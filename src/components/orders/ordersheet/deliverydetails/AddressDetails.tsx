import React from "react";
import "./AddressDetails.css";
import { AddressType } from "../../../../types/addressType";

const AddressDetails: React.FC<AddressType> = ({ mainAddress, subAddress }) => {
  return (
    <div className="addressDetailsContainer">
      <div>
        <div className="addressDetailsTitle">Address</div>
        <div>{mainAddress}</div>
      </div>
      <div>
        <div className="addressDetailsTitle">Detailed address</div>
        <div>{subAddress}</div>
      </div>
    </div>
  );
};

export default AddressDetails;
