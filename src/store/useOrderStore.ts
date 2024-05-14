import { postMenuType } from "src/types/menuOptionTypes";
import { Order } from "src/types/orderTypes";
import { create } from "zustand";

interface MenuStore {
  postOrders: Order | null;
  setPostOrders: (postOrder: postMenuType) => void;
}

const useOrderStore = create<MenuStore>((set) => ({
  postOrders: null,
  setPostOrders: (postOrder) => set({ postOrder }),
}));

export default useOrderStore;
