import React from "react";
import MappinIcon from "../../assets/icons/mappin-icon.png";
import ArrowDownIcon from "../../assets/icons/arrow-down.png";
import "./AddressBar.css";
import { useNavigate } from "react-router-dom";

interface addressProps {
  address: string;
}

const AddressBar: React.FC<addressProps> = ({ address }) => {
  const navigate = useNavigate();

  const handleAddressClick = () => {
    navigate("/address");
  };
  return (
    <div className="homeAddressContainer">
      <div className="homeAddressContent" onClick={handleAddressClick}>
        <img src={MappinIcon} className="mappinIcon" />
        <div className={address && "homeAddressDetail"}>{address}</div>
      </div>
      <img src={ArrowDownIcon} className="arrowDownIcon" />
    </div>
  );
};

export default AddressBar;
