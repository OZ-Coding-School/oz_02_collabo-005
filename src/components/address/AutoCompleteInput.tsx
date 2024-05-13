import loader from "../../services/GoogleMapLoad";
import { useEffect, useRef } from "react";
import isWithinOneKm from "./CalculateDistance";
import { AddressType } from "../../pages/AddressPage";
// import PostalCodeChange from "./PostalCodeChange";

interface AutoCompleteInputProps {
  // 옵션은 props로 관리 필요하면 더 추가하기.
  addressData: AddressType;
  setAddressData: React.Dispatch<React.SetStateAction<AddressType>>;
  options: google.maps.places.AutocompleteOptions;
  setIsAvailableService: React.Dispatch<React.SetStateAction<boolean>>;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// 자동 검색 인풋을 컴포넌트로 추상화
const AutoCompleteInput = ({
  setAddressData,
  addressData,
  options = {
    types: ["establishment"],
    fields: ["place_id", "geometry", "name"],
  },
  setIsAvailableService,
  handleInputChange,
}: AutoCompleteInputProps) => {
  // 구글에서 제공해주는 기능들을 input과 연결하기위해 ref사용
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    // input이 ref에 담겼을 때만 콜백 실행
    if (!inputRef.current) {
      console.log("input not ready");

      return;
    }

    initLibrary();

    async function initLibrary() {
      // loader.load()는 deprecated 되어서 사용하지 말 것.
      // 대신 importLibrary를 사용하라고 안내
      const places = await loader.importLibrary("places");
      const autocomplete = new places.Autocomplete(
        inputRef.current as HTMLInputElement,
        options
      );

      // 자동완성된 주소를 AddressData.mainAddress에 값 저장
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        const address = place.formatted_address || "";

        setAddressData({
          ...addressData,
          mainAddress: address,
        });

        // 선택한 주소 위도 경도로 변환
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode(
          { address: place.formatted_address },
          (results: google.maps.GeocoderResult[] | null) => {
            if (results === null) {
              console.log("Geocoding failed");
            } else {
              const location = results[0].geometry.location;
              // 서비스 가능 지역인지 검사
              setIsAvailableService(
                isWithinOneKm(location.lat(), location.lng())
              );
              // 우편번호 확인
              // const postalCode = PostalCodeChange(
              //   results[0].address_components
              // );
            }
          }
        );
      });
    }
  }, []);

  return (
    <input
      ref={inputRef}
      id="mainAddress"
      name="mainAddress"
      type="text"
      value={addressData.mainAddress}
      onChange={handleInputChange}
      placeholder="Type in your address in English or Press the button above"
    />
  );
};

export default AutoCompleteInput;
