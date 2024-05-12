import centerLocation from "../../constants/location";

const calculateDistance = (
  destinationLat: number,
  destinationLng: number
): number => {
  // 지구 반지름(km)
  const R: number = 6371;
  // 위도와 경도 차이를 라디안 단위로 변환
  const dLat = deg2rad(destinationLat - centerLocation.lat);
  const dLon = deg2rad(destinationLng - centerLocation.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(centerLocation.lat)) *
      Math.cos(deg2rad(destinationLat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // 거리 (km)
  return distance;
};

const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180); // 각도를 라디안으로 변환합니다
};

// 두 지점 사이의 거리를 계산
const isWithinOneKm = (
  destinationLat: number,
  destinationLng: number
): boolean => {
  const distance = calculateDistance(destinationLat, destinationLng);
  return distance <= 1;
};

export default isWithinOneKm;
