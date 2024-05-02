import React, { useEffect, useState } from "react";
import "./AddressPage.css";
import Header from "@components/common/header/Header";
import selectMapIcon from "../../assets/icons/selectMapIcon.png";
import { useNavigate } from "react-router-dom";
import mapSearchIcon from "../../assets/icons/searchIcon.png";
import InputItem from "@components/common/input/InputItem";
import ServiceableMapImage from "../../assets/images/mapRadius.png";
import Button from "@components/common/button/Button";
import GoogleMapModal from "@components/address/GoogleMapModal";
import { Loader } from "@googlemaps/js-api-loader";

type AddressType = {
  mainAddress: string;
  subAddress: string;
};

const AddressPage: React.FC = () => {
  const apiKey = import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY;
  const navigate = useNavigate();

  const errorMessage: string =
    "(*)Sorry, for now our service is only available in the SED area but we are working on it to expand very soon!";
  const [isAvailableService, setIsAvailableService] = useState<boolean>(false);

  const [addressData, setAddressData] = useState<AddressType>({
    mainAddress: "",
    subAddress: "",
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    console.log(addressData);
    const loadGoogleMaps = async () => {
      const loader = new Loader({
        apiKey: apiKey,
        language: "en",
        libraries: ["places"],
      });
      await loader.load();

      const mainAddressInput = document.getElementById(
        "mainAddress"
      ) as HTMLInputElement;
      const autocomplete = new google.maps.places.Autocomplete(
        mainAddressInput,
        {
          componentRestrictions: { country: "ko" },
          fields: ["formatted_address", "geometry", "name"],
          strictBounds: true,
          types: ["geocode"],
        }
      );
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        console.log(place);
        console.log("여기 왜 안되냐");
        if (!place.geometry) {
          console.log("You selected: " + place.formatted_address);
        }
      });
    };

    loadGoogleMaps();
  }, [addressData, apiKey]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    setAddressData({
      ...addressData,
      [name]: value,
    });
  };

  const handleSave = (): void => {
    // db로 post
    isAvailableService && navigate(-1);
  };

  const openMapModal = (): void => {
    setIsModalOpen(true);
  };

  const closeMapModal = (): void => {
    setIsModalOpen(false);
  };

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
            {isModalOpen && (
              <GoogleMapModal
                onSelectAddress={handleMapModalSelect}
                onClose={closeMapModal}
                setIsAvailableService={setIsAvailableService}
              />
            )}
            <div className="selectAddressTextInput">
              <div className="mainAddressInput">
                <div className="mainAddressInput">
                  <img src={mapSearchIcon} alt="Map search" />
                  <input
                    id="mainAddress"
                    name="mainAddress"
                    type="text"
                    value={addressData.mainAddress}
                    onChange={handleInputChange}
                    placeholder="Type in your address"
                  />
                </div>
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
                addressData.mainAddress === "" || !isAvailableService
                  ? "#767676"
                  : "#FF6347"
              }
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
