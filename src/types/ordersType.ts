export type OrderHistoryDataType = {
  id: number;
  order_time: string;
  order_status: number;
  menus: [
    {
      restaurant_id: number;
      restaurant_name: string;
      image: string;
      menu_name: {
        name: string;
        quantity: number;
        total_price: number;
      };
    },
  ];
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
