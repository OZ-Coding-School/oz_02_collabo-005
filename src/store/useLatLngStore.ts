import { create } from "zustand";

type LatLngState = {
  lat: string;
  lng: string;
  setLatLngState: (lat: string, lng: string) => void;
};

const useLatLngStore = create<LatLngState>((set) => {
  const storedLat = localStorage.getItem("addressLat") || "";
  const storedLng = localStorage.getItem("addressLng") || "";

  const initialLat = storedLat;
  const initialLng = storedLng;

  return {
    lat: initialLat,
    lng: initialLng,
    setLatLngState: (lat, lng) => {
      set({ lat, lng });
      localStorage.setItem("addressLat", lat);
      localStorage.setItem("addressLng", lng);
    },
  };
});

export default useLatLngStore;
