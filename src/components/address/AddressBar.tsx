import React from "react";
import MappinIcon from "../../assets/icons/mappin-icon.png";
import ArrowDownIcon from "../../assets/icons/arrow-down.png";
import "./AddressBar.css";
import { useNavigate } from "react-router-dom";

const AddressBar: React.FC = () => {
  const address = "300 Seo Seon-ro, Songpa-gu, Seoul";
  const navigate = useNavigate();

  const handleAddressClick = () => {
    navigate("/address");
  };
  return (
    <div className="homeAddressContainer">
      <div className="homeAddressContent" onClick={handleAddressClick}>
        <img src={MappinIcon} className="mappinIcon"></img>
        <div className="homeAddressDetail">{address}</div>
      </div>
      <img src={ArrowDownIcon} className="arrowDownIcon"></img>
    </div>
  );
};

export default AddressBar;
