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
};

export type optionType = {
  id: number;
  name: string;
  price: number;
};

export type selectMenuType = {
  id: number;
  options: number[];
  quantity: number;
};
