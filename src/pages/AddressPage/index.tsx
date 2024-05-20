import React, { ChangeEventHandler, useEffect, useState } from "react";
import "./AddressPage.css";
import Header from "@components/common/header/Header";
import selectMapIcon from "../../assets/icons/selectMapIcon.webp";
import { useNavigate } from "react-router-dom";
import InputItem from "@components/common/input/InputItem";
import ServiceableMapImage from "../../assets/images/deliveryAvailable.webp";
import Button from "@components/common/button/Button";
import GoogleMapModal from "@components/address/GoogleMapModal";
import AutoCompleteInput from "@components/address/AutoCompleteInput";
import customAxios from "../../api/axios";
import apiRoutes from "../../api/apiRoutes";
import { AddressType } from "../../types/addressType";
import { Geocoding } from "@components/address/Geocoding";

const AddressPage: React.FC = () => {
  const navigate = useNavigate();

  const errorMessage: string = "Please enter your delivery address";
  const [isAllFilled, setIsAllFilled] = useState<boolean>(false);
  const [addressData, setAddressData] = useState<AddressType>({
    mainAddress: "",
    subAddress: "",
  });
  const [isMapModalOpen, setIsMapModalOpen] = useState<boolean>(false);
  const [isAddressExist, setIsAddressExist] = useState<boolean>(false);
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
    const getRes = async () => {
      const response = await customAxios.get(apiRoutes.address);
      if (response.status === 200) {
        // 저장된 주소가 있으면
        if (!response.data.error) {
          setAddressData({
            mainAddress: response.data.base,
            subAddress: response.data.detail,
          });
          setIsAllFilled(true);
          setIsAddressExist(true);
        }
      }
    };
    getRes();
  }, []);

  useEffect(() => {
    if (addressData.mainAddress !== "" && addressData.subAddress !== "") {
      setIsAllFilled(true);
    } else {
      setIsAllFilled(false);
    }
  }, [addressData.mainAddress, addressData.subAddress]);

  const handleSave = async () => {
    // db로 post할 데이터
    const postAddressData = {
      base: addressData.mainAddress,
      detail: addressData.subAddress,
    };
    try {
      // 주소를 이용해 위도 경도로 변환
      const { userLat, userLng } = await Geocoding(addressData.mainAddress);

      // 배달 가능 지역인지 검사하는 api에 보낼 데이터(위도 경도)
      const userAddressLatLng = {
        userLat,
        userLng,
      };

      const isAvailableDelivery = await customAxios.get(
        `/user/address/check-coordinate/?lat=${userAddressLatLng.userLat}&lng=${userAddressLatLng.userLng}`
      );
      // 배달 불가능 지역일때 에러 메시지 알림창으로 띄움
      if (!isAvailableDelivery.data.data.result) {
        alert(
          "The address you have currently selected is a non-delivery area. Please choose again."
        );
      } else {
        // 배달 가능 지역이고 이미 저장된 주소가 있을때는 update
        if (isAddressExist) {
          const postRes = await customAxios.post(
            apiRoutes.addressUpdate,
            postAddressData
          );
          if (postRes.status === 200) {
            navigate(-1);
          } else {
            alert("Address update failed");
          }
        } else {
          // 현재 등록된 주소 없을 때
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
      }
    } catch (error) {
      console.log(error);
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
      subAddress: "",
    }));
    // 주소를 이용해 위도 경도로 변환
    Geocoding(addressData.mainAddress);
    closeMapModal();
  };

  return (
    <>
      <Header
        hasBackIcon={true}
        title=""
        hasCartIcon={false}
        handleBackIconClick={() => navigate(-1)}
      />
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
              />
            )}
            <div className="selectAddressTextInput">
              <div className="mainAddressInput">
                <AutoCompleteInput
                  addressData={addressData}
                  setAddressData={setAddressData}
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
            {addressData.mainAddress !== "" ? (
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
              backgroundColor={isAllFilled ? "#FF6347" : "#767676"}
              handleClick={handleSave}
              buttonType="bigButton"
              type="submit"
              disabled={isAllFilled ? false : true}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressPage;
