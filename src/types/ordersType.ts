import { selectMenuType } from "./menuOptionTypes";

export type OrderHistoryDataType = {
  id: number;
  date: string;
  order_status: number;
  details: {
    [resId: string]: {
      menu_name: string;
      quantity: number;
      total_price: number;
      logo: string;
      restaurant_name: string;
    };
  };
};

export type ViewOrderType = {
  address: string;
  orders: [
    {
      restaurant: {
        id: number;
        name: string;
      };

      menus: [
        {
          id: number;
          name: string;
          price: number;
          options: [
            {
              id: number;
              name: string;
              price: number;
            },
          ];
          quantity: number;
          menu_total_price: number;
        },
      ];
    },
  ];
  order_price: number;
  delivery_fee: number;
  total_price: number;
  store_request: string;
  rider_request: string;
  payment_method: number;
};

export type CartDataType = {
  coordinate: boolean;
  delivery_fee: number;
  order_price: number;
  orders: { restaurant: Restaurant; menus: Menu[] }[];
  total_price: number;
};

export type Restaurant = {
  id: number;
  name: string;
  status?: number;
};

export type Menu = {
  id: number;
  menu_total_price: number;
  name: string;
  options: MenuOption[];
  price: number;
  quantity: number;
  status?: number;
};

export type MenuOption = {
  id: number;
  name: string;
  price: number;
};

export type Order = {
  orders: {
    restaurant_id: number;
    menus: selectMenuType[];
  }[];
};

export type cartType = {
  orders: {
    restaurant_id: number;
    menus: selectMenuType[];
  }[];
  coordinate: number[];
};

export type OrderDataType = {
  orders: {
    restaurant_id: number;
    menus: {
      id: number;
      options: number[];
      quantity: number;
    }[];
  }[];
  delivery_address: string;
  coordinate: number[];
  store_request: string;
  rider_request: string;
  payment_method: number;
};
