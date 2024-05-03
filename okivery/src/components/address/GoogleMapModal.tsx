import React, { useEffect, useRef, useState } from "react";
import "./GoogleMapModal.css";
import { Loader } from "@googlemaps/js-api-loader";
import { PacmanLoader } from "react-spinners";
import isWithinOneKm from "./CalculateDistance";
import centerLocation from "../../constants/location";

interface MapModalProps {
  onClose: () => void;
  onSelectAddress: (selectedAddress: string) => void;
  setIsAvailableService: React.Dispatch<React.SetStateAction<boolean>>;
}

declare global {
  interface Window {
    google: typeof google;
  }
}

const GoogleMapModal: React.FC<MapModalProps> = ({
  onClose,
  onSelectAddress,
  setIsAvailableService,
}) => {
  const apiKey = import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const mapRef = useRef<HTMLDivElement>(null);
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [userAddressData, setUserAddressData] = useState<string>("");

  useEffect(() => {
    const loader = new Loader({
      apiKey: apiKey,
      language: "en",
      libraries: ["places"],
    });

    loader.load().then(async () => {
      // 주소정보 창
      const infoWindow = new google.maps.InfoWindow();
      const geocoder = new google.maps.Geocoder();
      // 고급 마커
      const { AdvancedMarkerElement } =
        await google.maps.importLibrary("marker");

      // 처음에 사용자 현재 위치로 지정
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLatLng = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          // 지도 그리기
          const map = new google.maps.Map(mapRef.current!, {
            center: userLatLng,
            zoom: 15,
            mapId: "DEMO_MAP_ID",
          });
          // 마커 그리기
          const marker = new google.maps.marker.AdvancedMarkerElement({
            position: userLatLng,
            map,
            gmpDraggable: true,
          });

          // 사용자 현재 위치 주소정보 주소창으로 표시
          geocoder.geocode(
            { location: userLatLng, language: "en" },
            (results, status) => {
              if (status === "OK") {
                if (results && results.length > 0) {
                  const englishAddress = results[0].formatted_address;
                  setUserAddressData(englishAddress);
                  infoWindow.setContent(englishAddress);
                  infoWindow.open(map, marker);
                  setIsAvailable(
                    isWithinOneKm(
                      centerLocation.lat,
                      centerLocation.lng,
                      userLatLng.lat,
                      userLatLng.lng
                    )
                  );
                } else {
                  console.log("No results found");
                }
              } else {
                console.error("Geocoder failed due to: " + status);
              }
            }
          );
          setIsLoading(false);

          // 마커를 드래그하다 놓은 위치의 위도 경도를 변환해 영문 주소로 바꾸고 주소정보창을 띄움
          marker.addListener("dragend", () => {
            const newPosition = marker.position;
            if (newPosition) {
              setIsAvailable(
                isWithinOneKm(
                  centerLocation.lat,
                  centerLocation.lng,
                  Number(newPosition.lat),
                  Number(newPosition.lng)
                )
              );
              geocoder.geocode(
                { location: newPosition, language: "en" },
                (results, status) => {
                  if (status === "OK") {
                    if (results && results.length > 0) {
                      const englishAddress = results[0].formatted_address;
                      setUserAddressData(englishAddress);
                      infoWindow.setContent(englishAddress);
                      infoWindow.open(map, marker);
                    } else {
                      console.log("No results found");
                    }
                  } else {
                    console.error("Geocoder failed due to: " + status);
                  }
                }
              );
            }
          });
        },
        (error) => {
          console.error("Error getting user's location: ", error);
          setIsLoading(false);
        }
      );
    });
  }, []);

  const handleSelectAddress = () => {
    setIsAvailableService(isAvailable);
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
                <PacmanLoader size="50px" color="#ff6347" />
              </div>
            )}
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
