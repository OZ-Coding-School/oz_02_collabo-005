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
