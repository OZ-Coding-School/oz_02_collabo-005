import React from "react";
import "./OptionItem.css";
import { optionType } from "src/types/menuOptionTypes";
import { addCommasToNumberString } from "../../../utils/addCommas";

interface OptionItemProps extends Omit<optionType, "id"> {
  inputType: string;
  groupName: string;
  handleCheckChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const OptionItem: React.FC<OptionItemProps> = ({
  inputType,
  groupName,
  name,
  price,
  handleCheckChange,
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
          onChange={handleCheckChange}
        />
        <label>{name}</label>
      </div>
      <div className="optionPrice">+{addCommasToNumberString(price)} won</div>
    </div>
  );
};

export default OptionItem;
