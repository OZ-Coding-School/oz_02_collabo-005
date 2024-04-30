import React, { useEffect, useRef } from "react";
import "./GoogleMapModal.css";
import { Loader } from "@googlemaps/js-api-loader";

interface MapModalProps {
  onClose: () => void;
}

const GoogleMapModal: React.FC<MapModalProps> = ({ onClose }) => {
  const apiKey = import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY;
  const mapRef = useRef<HTMLDivElement>(null);
  // okivery 회사 위치
  const center = {
    lat: 37.07966,
    lng: 127.05226,
  };

  useEffect(() => {
    const loader = new Loader({
      apiKey: apiKey,
      version: "weekly",
      libraries: ["places"],
    });

    loader.load().then(async () => {
      const { AdvancedMarkerElement } =
        await google.maps.importLibrary("marker");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLatLng = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          const map = new google.maps.Map(mapRef.current!, {
            center: userLatLng,
            zoom: 15,
            mapId: "DEMO_MAP_ID",
          });
          new google.maps.marker.AdvancedMarkerElement({
            position: userLatLng,
            map,
          });
        },
        (error) => {
          console.error("Error getting user's location: ", error);
        }
      );
    });
  }, []);
  const handleSelectAddress = () => {
    onClose();
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
          <div className="googleMap">
            <div id="map" ref={mapRef} />
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
