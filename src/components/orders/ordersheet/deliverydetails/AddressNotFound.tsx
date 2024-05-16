import React from "react";
import "./AddressNotFound.css";

const AddressNotFound: React.FC = () => {
  return (
    <div className="addressNotFoundContainer">
      <div className="notFountText1">Sorry, your address is Not found</div>
      <div className="notFountText2">Please set your delivery address!</div>
    </div>
  );
};

export default AddressNotFound;
