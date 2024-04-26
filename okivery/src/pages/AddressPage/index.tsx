import React, { useState } from "react";
import "./AddressPage.css";
import Header from "../../components/common/header/Header";
import selectMapIcon from "../../assets/icons/selectMapIcon.png";
import { Link } from "react-router-dom";
import mapSearchIcon from "../../assets/icons/searchIcon.png";

const AddressPage: React.FC = () => {
  const [addressData, setAddressData] = useState<string>("");
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const inputValue: string = event.target.value;
    setAddressData(inputValue);
  };

  return (
    <>
      <Header hasBackIcon={true} to="/home" title="" hasCartIcon={false} />
      <div className="addressMainContainer">
        <div className="setAddressTextSection">
          <h2>Set delivery address</h2>
        </div>
        <div className="setAddressContentSection">
          <div className="selectMapSection">
            <Link to="/address/select-map">
              <button>
                <img
                  src={selectMapIcon}
                  style={{ width: "16px", height: "16px" }}
                />
                Find your location on the map
              </button>
            </Link>
            <div className="selectAddressTextInput">
              <img src={mapSearchIcon} />
              <input
                type="text"
                name="selectAddress"
                id="selectAddress"
                value={addressData}
                onChange={handleInputChange}
                placeholder="Type in your address"
              ></input>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressPage;
