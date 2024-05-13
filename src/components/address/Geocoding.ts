import useLatLngStore from "../../store/useLatLngStore";
import { userLatLngType } from "../../types/addressType";

// 역지오코딩 : 위도 경도를 이용해 주소로 변환
export const ReverseGeocoding = (
  userLatLng: userLatLngType
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      { location: userLatLng, language: "en" },
      (results, status) => {
        if (status === "OK") {
          if (results && results.length > 0) {
            const englishAddress = results[0].formatted_address;
            resolve(englishAddress);
          } else {
            reject(new Error("No results found"));
          }
        } else {
          reject(new Error("Geocoder failed due to: " + status));
        }
      }
    );
  });
};

// 지오코딩 : 주소를 이용해 위도 경도로 변환
export const Geocoding = (
  address: string
): Promise<{ lat: string; lng: string }> => {
  return new Promise((resolve, reject) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      { address: address },
      (results: google.maps.GeocoderResult[] | null) => {
        if (results !== null) {
          const location = results[0].geometry.location;
          const lat = String(location.lat());
          const lng = String(location.lng());
          // geocoding을 쓰지 않는 다른 컴포넌트에서 위도 경도 값을 사용할 수 있도록 전역
          useLatLngStore.getState().setLatLngState(lat, lng);
          resolve({ lat, lng });
        } else {
          reject("Geocoding failed");
        }
      }
    );
  });
};
