import { create } from "zustand";
import { persist } from "zustand/middleware";

type LatLngState = {
  lat: string;
  lng: string;
  setLatLngState: (lat: string, lng: string) => void;
};

// const useLatLngStore = create<LatLngState>((set) => {
//   const storedLat = localStorage.getItem("addressLat");
//   const storedLng = localStorage.getItem("addressLng");

//   const initialLat = storedLat || "";
//   const initialLng = storedLng || "";

//   return {
//     lat: initialLat,
//     lng: initialLng,
//     setLatLngState: (lat, lng) => {
//       set({ lat, lng });
//       localStorage.setItem("addressLat", lat);
//       localStorage.setItem("addressLng", lng);
//     },
//   };
// });

const useLatLngStore = create<LatLngState>(
  persist(
    (set) => ({
      // 초기 값
      lat: "",
      lng: "",
      setLatLngState: (lat, lng) =>
        set({
          lat,
          lng,
        }),
    }),
    {
      name: "latlng-storage",
    }
  ) as (set: (fn: (state: LatLngState) => LatLngState) => void) => LatLngState
);

const getLatLngStore = () => {
  const storedDataString = localStorage.getItem("latlng-storage");
  const storedData = storedDataString && JSON.parse(storedDataString);

  const storedLat = storedData.state.lat;
  const storedLng = storedData.state.lng;

  const lat = storedLat;
  const lng = storedLng;
  return {
    lat,
    lng,
  };
};

export { useLatLngStore, getLatLngStore };
