import React from "react";
import "./OptionItem.css";
import { optionType } from "src/types/menuOptionTypes";

interface OptionItemProps extends Omit<optionType, "id"> {
  inputType: string;
  groupName: string;
}

const OptionItem: React.FC<OptionItemProps> = ({
  inputType,
  groupName,
  name,
  price,
}) => {
  return (
    <div className="optionItemContainer">
      <div className="optionSelectSection">
        <input
          type={inputType}
          name={groupName}
          value={name}
          id={name}
          className="optionItem"
        />
        <label htmlFor={name}>{name}</label>
      </div>
      <div className="optionPrice">{price}won</div>
    </div>
  );
};

export default OptionItem;
