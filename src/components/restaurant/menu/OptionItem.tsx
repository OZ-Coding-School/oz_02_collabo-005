import React from "react";
import "./OptionItem.css";

interface OptionItemProps {
  name: string;
  optionName: string;
  optionPrice: string;
  type: string;
}

const OptionItem: React.FC<OptionItemProps> = ({
  name,
  optionName,
  optionPrice,
  type,
}) => {
  return (
    <div className="optionItemContainer">
      <div className="optionSelectSection">
        <input
          type={type}
          name={name.toLowerCase()}
          id={optionName}
          className="optionItem"
        />
        <label htmlFor={optionName}>{optionName}</label>
      </div>
      <div className="optionPrice">{optionPrice}won</div>
    </div>
  );
};

export default OptionItem;
