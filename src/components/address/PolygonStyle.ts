import {
  freeDeliveryFeePolygonCoords,
  serviceablePolygonCoords,
} from "../../constants/polygonLocation";

export const freeDeliveryPolygonOptions = {
  paths: freeDeliveryFeePolygonCoords,
  strokeColor: "#FF0000", // 테두리 색상
  strokeOpacity: 0.8, // 테두리 투명도
  strokeWeight: 2, // 테두리 두께
  fillColor: "#FF0000", // 내부 색상
  fillOpacity: 0.35, // 내부 투명도
};

export const serviceablePolygonOptions = {
  paths: serviceablePolygonCoords,
  strokeColor: "#00FF00",
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: "#00FF00",
  fillOpacity: 0.35,
};
