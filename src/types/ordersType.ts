export type OrderHistoryDataType = {
  id: number;
  date: string;
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
  orders: [
    restaurant: {
      id: number;
      name: string;
    },
    menus: [
      {
        id: number;
        name: string;
        status: number;
        price: number;
        quantity: number;
        options: [
          {
            id: number;
            name: string;
            price: number;
          },
        ];
        menu_total_price: number;
      },
    ],
  ];
  coordinate: boolean;
  order_price: number;
  delivery_fee: number;
  total_price: number;
};
