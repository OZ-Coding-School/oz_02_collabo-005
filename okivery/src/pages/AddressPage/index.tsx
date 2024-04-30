import React, { useState } from "react";
import "./AddressPage.css";
import Header from "@components/common/header/Header";
import selectMapIcon from "../../assets/icons/selectMapIcon.png";
import { useNavigate } from "react-router-dom";
import mapSearchIcon from "../../assets/icons/searchIcon.png";
import InputItem from "@components/common/input/InputItem";
import ServiceableMapImage from "../../assets/images/mapRadius.png";
import Button from "@components/common/button/Button";
import GoogleMapModal from "@components/address/GoogleMapModal";

type AddressType = {
  mainAddress: string;
  subAddress: string;
};

const AddressPage: React.FC = () => {
  const navigate = useNavigate();

  const errorMessage: string =
    "(*)Sorry, for now our service is only available in the SED area but we are working on it to expand very soon!";
  const [isAvailableService, setIsAvailableService] = useState<boolean>(true);
  const initialAddressData: AddressType = {
    mainAddress: "",
    subAddress: "",
  };
  const [addressData, setAddressData] = useState(initialAddressData);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  const openMapModal = (): void => {
    setIsModalOpen(true);
  };

  const closeMapModal = (): void => {
    setIsModalOpen(false);
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
            <button onClick={openMapModal}>
              <img src={selectMapIcon} />
              Find your location on the map
            </button>
            {isModalOpen && <GoogleMapModal onClose={closeMapModal} />}
            <div className="selectAddressTextInput">
              <div className="mainAddressInput">
                <img src={mapSearchIcon} />
                <InputItem
                  label=""
                  isNoStar={true}
                  name="mainAddress"
                  type="text"
                  value={addressData.mainAddress}
                  handleInputChange={handleInputChange}
                  place="Type in your address"
                />
              </div>
            </div>
          </div>
          <div className="detailAddress">
            {isAvailableService ? (
              <>
                <InputItem
                  label="Delivery detail"
                  name="subAddress"
                  type="text"
                  value={addressData.subAddress}
                  place="Please enter the details address."
                  handleInputChange={handleInputChange}
                />
              </>
            ) : (
              <>
                <span className="addressErrorMessage">{errorMessage}</span>
              </>
            )}
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
