import React, { ChangeEventHandler, useEffect, useState } from "react";
import "./AddressPage.css";
import Header from "@components/common/header/Header";
import selectMapIcon from "../../assets/icons/selectMapIcon.png";
import { useNavigate } from "react-router-dom";
import InputItem from "@components/common/input/InputItem";
import ServiceableMapImage from "../../assets/images/mapRadius.png";
import Button from "@components/common/button/Button";
import GoogleMapModal from "@components/address/GoogleMapModal";
import AutoCompleteInput from "@components/address/AutoCompleteInput";
import customAxios from "../../api/axios";
import apiRoutes from "../../api/apiRoutes";

export type AddressType = {
  mainAddress: string;
  subAddress: string;
};

const AddressPage: React.FC = () => {
  const navigate = useNavigate();

  const errorMessage: string =
    "(*)Sorry, for now our service is only available in the SED area but we are working on it to expand very soon!";
  const [isAvailableService, setIsAvailableService] = useState<boolean>(false);
  const [isAllFilled, setIsAllFilled] = useState<boolean>(false);
  const [addressData, setAddressData] = useState<AddressType>({
    mainAddress: "",
    subAddress: "",
  });
  const [isMapModalOpen, setIsMapModalOpen] = useState<boolean>(false);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    setAddressData({
      ...addressData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (addressData.mainAddress !== "" && addressData.subAddress !== "") {
      setIsAllFilled(true);
    } else {
      setIsAllFilled(false);
    }
  }, [addressData.mainAddress, addressData.subAddress]);

  const handleSave = async () => {
    // db로 post
    const postAddressData = {
      base: addressData.mainAddress,
      detail: addressData.subAddress,
    };
    try {
      const getRes = await customAxios.get(apiRoutes.address);
      // 등록된 주소가 있을 때
      if (getRes.status === 200) {
        const postRes = await customAxios.post(
          apiRoutes.addressUpdate,
          postAddressData
        );
        if (postRes.status === 200) {
          navigate(-1);
        } else {
          alert("Address update failed");
        }
      }
    } catch (error) {
      // 현재 등록된 주소 없음
      const postRes = await customAxios.post(
        apiRoutes.address,
        postAddressData
      );
      if (postRes.status === 200) {
        navigate(-1);
      } else {
        alert("Address registration failed");
      }
    }
  };

  const openMapModal = (): void => {
    setIsMapModalOpen(true);
  };

  const closeMapModal = (): void => {
    setIsMapModalOpen(false);
  };

  // 모달에서 select버튼을 눌렀을 때 addressData.mainAddress에 값을 저장하고 모달 창 닫기기능
  const handleMapModalSelect = (selectedAddress: string): void => {
    setAddressData((prevAddressData) => ({
      ...prevAddressData,
      mainAddress: selectedAddress,
    }));
    closeMapModal();
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
              <img src={selectMapIcon} alt="Select map icon" />
              Find your location on the map
            </button>
            {isMapModalOpen && (
              <GoogleMapModal
                onSelectAddress={handleMapModalSelect}
                onClose={closeMapModal}
                setIsAvailableService={setIsAvailableService}
              />
            )}
            <div className="selectAddressTextInput">
              <div className="mainAddressInput">
                <AutoCompleteInput
                  addressData={addressData}
                  setAddressData={setAddressData}
                  setIsAvailableService={setIsAvailableService}
                  options={{
                    strictBounds: true,
                    componentRestrictions: { country: "KR" },
                  }}
                  handleInputChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="detailAddress">
            {addressData.mainAddress === "" || isAvailableService ? (
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
            <img src={ServiceableMapImage} alt="Serviceable map" />
          </div>
          <div className="saveAddressButton">
            <Button
              name="Save your address"
              backgroundColor={
                isAvailableService && isAllFilled ? "#FF6347" : "#767676"
              }
              handleClick={handleSave}
              buttonType="bigButton"
              type="submit"
              disabled={isAvailableService && isAllFilled ? false : true}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressPage;
