import React, { useEffect, useRef } from "react";
import isWithinOneKm from "./CalculateDistance";
import loader from "../../services/GoogleMapLoad";
import PostalCodeChange from "./PostalCodeChange";

interface selectLocationMapProps {
  setIsAvailable: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setUserAddressData: React.Dispatch<React.SetStateAction<string>>;
}

const SelectLocationMap: React.FC<selectLocationMapProps> = ({
  setIsAvailable,
  setIsLoading,
  setUserAddressData,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initLibrary();

    async function initLibrary() {
      // google maps api를 로드하면 자동으로 아래 클래스에 액세스 가능함(importLibrary 별도 작성 필요 X)
      const infoWindow = new google.maps.InfoWindow();
      const geocoder = new google.maps.Geocoder();
      const { AdvancedMarkerElement } = await loader.importLibrary("marker");
      let postalCode = "";
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
          const marker = new AdvancedMarkerElement({
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
                  // 해당 주소의 우편번호 추출
                  postalCode = PostalCodeChange(results[0].address_components);
                  console.log(postalCode);
                  const englishAddress = results[0].formatted_address;
                  setUserAddressData(englishAddress);
                  infoWindow.setContent(englishAddress);
                  infoWindow.open(map, marker);
                  setIsAvailable(isWithinOneKm(userLatLng.lat, userLatLng.lng));
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
                isWithinOneKm(Number(newPosition.lat), Number(newPosition.lng))
              );
              geocoder.geocode(
                { location: newPosition, language: "en" },
                (results, status) => {
                  if (status === "OK") {
                    if (results && results.length > 0) {
                      // 해당 주소의 우편번호 추출
                      postalCode = PostalCodeChange(
                        results[0].address_components
                      );
                      console.log(postalCode);
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
    }
  }, []);

  return <div id="map" ref={mapRef} />;
};

export default SelectLocationMap;
