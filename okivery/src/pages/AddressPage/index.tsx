import React, { useState } from "react";
import "./AddressPage.css";
import Header from "@components/common/header/Header";
import selectMapIcon from "../../assets/icons/selectMapIcon.png";
import { Link, useNavigate } from "react-router-dom";
import mapSearchIcon from "../../assets/icons/searchIcon.png";
import InputItem from "@components/common/input/InputItem";
import ServiceableMapImage from "../../assets/images/mapRadius.png";
import Button from "@components/common/button/Button";

type AddressType = {
  mainAddress: string;
  subAddress: string;
};

const AddressPage: React.FC = () => {
  const navigate = useNavigate();
  const initialAddressData: AddressType = {
    mainAddress: "",
    subAddress: "",
  };
  const [addressData, setAddressData] = useState(initialAddressData);
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    event.preventDefault();

    const inputName = event.target.name;
    const inputData = event.target.value;
    setAddressData({
      ...addressData,
      [inputName]: inputData,
    });
  };

  const handleSave = (): void => {
    navigate(-1);
  };

  return (
    <>
      <Header hasBackIcon={true} title="" hasCartIcon={false} />
      <div className="addressMainContainer">
        <div className="setAddressTextSection">
          <h2>Set delivery address</h2>
        </div>
        <div>
          <div className="selectMapSection">
            <Link to="/address/select-map">
              <button>
                <img src={selectMapIcon} />
                Find your location on the map
              </button>
            </Link>
            <div className="selectAddressTextInput">
              <div className="mainAddressInput">
                <img src={mapSearchIcon} />
                <input
                  name="mainAddress"
                  type="text"
                  value={addressData.mainAddress}
                  onChange={handleInputChange}
                  placeholder="Type in your address"
                />
              </div>
            </div>
          </div>
          <div className="detailAddress">
            <InputItem
              label="Delivery detail"
              name="subAddress"
              type="text"
              value={addressData.subAddress}
              place="Please enter the details address."
              handleInputChange={handleInputChange}
            />
          </div>
          <div className="mapImageSection">
            <div>Serviceable area</div>
            <img src={ServiceableMapImage} />
          </div>
          <div className="saveAddressButton">
            <Button
              name="Save your address"
              handleClick={handleSave}
              buttonType="bigButton"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressPage;
