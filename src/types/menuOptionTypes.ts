export type menuOptionType = {
  id: number;
  name: string;
  image: string;
  description: string;
  option_group_list: optionGroupType[];
};

export type optionGroupType = {
  option_group_id: number;
  option_name: string;
  mandatory: boolean;
  choice_mode: number;
  options: optionType[];
  maximum: number;
  minimum: number;
};

export type optionType = {
  id: number;
  name: string;
  price: number;
};

export type postMenuType = {
  menu_id: number;
  quantity: number;
  option_list: postOptionType[];
};

export type postOptionType = {
  group_id: number;
  options: number[];
};
