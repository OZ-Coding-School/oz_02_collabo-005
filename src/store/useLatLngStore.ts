import { create } from "zustand";
import { persist } from "zustand/middleware";

type LatLngState = {
  lat: string | null;
  lng: string | null;
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
      lat: null,
      lng: null,
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

  if (storedData) {
    const storedLat = storedData.state.lat;
    const storedLng = storedData.state.lng;

    const lat = storedLat || null;
    const lng = storedLng || null;
    return {
      lat,
      lng,
    };
  } else {
    return {
      lat: null,
      lng: null,
    };
  }
};

export { useLatLngStore, getLatLngStore };
