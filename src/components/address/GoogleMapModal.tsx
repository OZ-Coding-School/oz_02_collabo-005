import React, { useState } from "react";
import "./GoogleMapModal.css";
import { PacmanLoader as LoadingIcon } from "react-spinners";
import SelectLocationMap from "./SelectLocationMap";

interface MapModalProps {
  onClose: () => void;
  onSelectAddress: (selectedAddress: string) => void;
}

const GoogleMapModal: React.FC<MapModalProps> = ({
  onClose,
  onSelectAddress,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userAddressData, setUserAddressData] = useState<string>("");

  const handleSelectAddress = () => {
    onSelectAddress(userAddressData);
  };

  return (
    <>
      <div className="mapModalOverlay" onClick={onClose}>
        <div className="mapModalContent" onClick={(e) => e.stopPropagation()}>
          <div className="closeModalSection">
            <button
              className="closeModalButton"
              onClick={onClose}
              aria-label="closeButton"
            >
              x
            </button>
          </div>
          <div className="boundsDescriptionSection">
            Drag the marker on your address
            <div className="boundsDescription">
              <i className="greenArea">green area</i> : delivery area
              <br />
              <i className="redArea">red area</i> : free delivery area
            </div>
          </div>
          <div className="googleMap">
            {isLoading && (
              <div className="loadingSpinner">
                <LoadingIcon size="50px" color="#ff6347" />
              </div>
            )}
            <SelectLocationMap
              setIsLoading={setIsLoading}
              setUserAddressData={setUserAddressData}
            />
          </div>
          <div>
            <button
              className="selectAddressButton"
              onClick={handleSelectAddress}
              aria-label="selectButton"
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
