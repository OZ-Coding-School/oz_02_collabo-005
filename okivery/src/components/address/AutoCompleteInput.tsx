import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef } from "react";
import isWithinOneKm from "./CalculateDistance";
import centerLocation from "../../constants/location";

interface AutoCompleteInputProps {
  // 옵션은 props로 관리 필요하면 더 추가하기.
  options: google.maps.places.AutocompleteOptions;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  mainAddressData: string | undefined;
  setIsAvailableService: React.Dispatch<React.SetStateAction<boolean>>;
}

// 자동 검색 인풋을 컴포넌트로 추상화
const AutoCompleteInput = ({
  options = {
    types: ["establishment"],
    fields: ["place_id", "geometry", "name"],
  },
  setIsAvailableService,
  handleInputChange,
  mainAddressData,
}: AutoCompleteInputProps) => {
  // 구글에서 제공해주는 기능들을 input과 연결하기위해 ref사용
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // input이 ref에 담겼을 때만 콜백 실행
    if (!inputRef.current) {
      console.log("input not ready");

      return;
    }
    const loader = new Loader({
      apiKey: import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY,
      language: "en",
    });

    initLibrary();

    async function initLibrary() {
      // loader.load()는 deprecated 되어서 사용하지 말 것.
      // 대신 importLibrary를 사용하라고 안내
      const places = await loader.importLibrary("places");
      const autocomplete = new places.Autocomplete(
        inputRef.current as HTMLInputElement,
        options
      );

      // 클릭했을때 그 주소를 AddressData.mainAddress에 값 저장
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        const address = place.formatted_address || "";
        handleInputChange({
          // 타입 에러
          target: {
            name: "mainAddress",
            value: address,
          },
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
              setIsAvailableService(
                isWithinOneKm(
                  centerLocation.lat,
                  centerLocation.lng,
                  location.lat(),
                  location.lng()
                )
              );
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
      value={mainAddressData}
      onChange={handleInputChange}
      placeholder="Type in your address or Press the button above"
    />
  );
};

export default AutoCompleteInput;