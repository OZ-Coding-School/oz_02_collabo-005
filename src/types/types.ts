export type RestaurantType = {
  id: number;
  name: string;
  image: string;
  category: string[];
  hashtag: string[];
};

export type RestaurantInfoType = {
  id: number;
  name: string;
  notice: string;
  image: string;
  description: string;
  minimum_order_amount: number;
  menu_group_list: MenuGroupType[];
};

export type MenuGroupType = {
  name: string;
  menus: MenuType[];
};

export type MenuType = {
  id: number;
  picture: string;
  name: string;
  price: number;
  description: string;
  represent: string;
  status: number;
};
