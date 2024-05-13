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
            localStorage.setItem("userAddressLat", String(userLatLng.lat));
            localStorage.setItem("userAddressLng", String(userLatLng.lng));
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
export const Geocoding = (address: string) => {
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode(
    { address: address },
    (results: google.maps.GeocoderResult[] | null) => {
      if (results !== null) {
        const location = results[0].geometry.location;
        localStorage.setItem("userAddressLat", String(location.lat()));
        localStorage.setItem("userAddressLng", String(location.lng()));
        // 서비스 가능 지역인지 검사
        // setIsAvailableService(
        //   isWithinOneKm(location.lat(), location.lng())
        // );
      } else {
        console.log("Geocoding failed");
      }
    }
  );
};
