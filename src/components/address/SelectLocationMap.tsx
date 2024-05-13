import React, { useEffect, useRef } from "react";
import loader from "../../services/GoogleMapLoad";
import { userLatLngType } from "../../types/addressType";
import {
  freeDeliveryPolygonOptions,
  serviceablePolygonOptions,
} from "./PolygonStyle";
import { ReverseGeocoding } from "./Geocoding";

interface selectLocationMapProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setUserAddressData: React.Dispatch<React.SetStateAction<string>>;
}

const SelectLocationMap: React.FC<selectLocationMapProps> = ({
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
      // 폴리곤 스타일 지정
      const freeDeliveryPolygon = new google.maps.Polygon(
        freeDeliveryPolygonOptions
      );
      const serviceablePolygon = new google.maps.Polygon(
        serviceablePolygonOptions
      );

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLatLng: userLatLngType = {
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
          // polygon 그리기
          freeDeliveryPolygon.setMap(map);
          serviceablePolygon.setMap(map);
          // 사용자 현재 위치 위도경도를 이용해 주소 추출 후 주소정보 주소창으로 표시
          ReverseGeocoding(userLatLng)
            .then((englishAddress) => {
              // 성공적으로 주소를 가져온 경우 처리
              setUserAddressData(englishAddress);
              infoWindow.setContent(englishAddress);
              infoWindow.open(map, marker);
            })
            .catch((error) => {
              console.error(error);
            });
          setIsLoading(false);

          // 마커를 드래그하다 놓은 위치의 위도 경도를 변환해 영문 주소로 바꾸고 주소정보창을 띄움
          marker.addListener("dragend", () => {
            const newPosition = marker.position;
            if (newPosition) {
              // 역 지오코딩 : 위도 경도를 이용해 주소 추출
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
    }
  }, []);

  return <div id="map" ref={mapRef} />;
};

export default SelectLocationMap;
