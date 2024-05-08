import React from "react";
import "./AddressDetails.css";

const AddressDetails: React.FC = () => {
  return (
    <div className="addressDetailsContainer">
      <div>
        <div className="addressDetailsTitle">Address</div>
        <div>Bay Area, San Francisco, California, USA</div>
      </div>
      <div>
        <div className="addressDetailsTitle">Detailed address</div>
        <div>Building 103, Room 1203</div>
      </div>
    </div>
  );
};

export default AddressDetails;
