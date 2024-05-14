import { postMenuType } from "src/types/menuOptionTypes";
import { create } from "zustand";

interface MenuStore {
  postOrders: postMenuType[];
  setPostOrders: (postOrders: postMenuType[]) => void;
}

const postOrdersInit: postMenuType[] = [];

const useOrderStore = create<MenuStore>((set) => ({
  postOrders: postOrdersInit,
  setPostOrders: (postOrders) => set({ postOrders }),
}));

export default useOrderStore;
