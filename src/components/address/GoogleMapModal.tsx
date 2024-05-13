import React, { useState } from "react";
import "./GoogleMapModal.css";
import { PacmanLoader as LoadingIcon } from "react-spinners";
import SelectLocationMap from "./SelectLocationMap";

interface MapModalProps {
  onClose: () => void;
  onSelectAddress: (selectedAddress: string) => void;
  // setIsAvailableService: React.Dispatch<React.SetStateAction<boolean>>;
}

const GoogleMapModal: React.FC<MapModalProps> = ({
  onClose,
  onSelectAddress,
  // setIsAvailableService,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // 사용자 입력 주소가 배달가능한 지역인지
  // const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [userAddressData, setUserAddressData] = useState<string>("");

  const handleSelectAddress = () => {
    // setIsAvailableService(isAvailable);
    onSelectAddress(userAddressData);
  };

  return (
    <>
      <div className="mapModalOverlay" onClick={onClose}>
        <div className="mapModalContent" onClick={(e) => e.stopPropagation()}>
          <div className="closeModalSection">
            <button className="closeModalButton" onClick={onClose}>
              x
            </button>
          </div>
          <span>Drag the marker on your address</span>
          <div className="googleMap">
            {isLoading && (
              <div className="loadingSpinner">
                <LoadingIcon size="50px" color="#ff6347" />
              </div>
            )}
            <SelectLocationMap
              setIsLoading={setIsLoading}
              // setIsAvailable={setIsAvailable}
              setUserAddressData={setUserAddressData}
            />
          </div>
          <div className="saveButtonSection">
            <button
              className="selectAddressButton"
              onClick={handleSelectAddress}
            >
              Select current address
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GoogleMapModal;
