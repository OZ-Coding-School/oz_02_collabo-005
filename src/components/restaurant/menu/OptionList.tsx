import React from "react";
import OptionItem from "./OptionItem";
import { optionType } from "src/pages/MenuPage";
import "./OptionList.css";

interface OptionListProps {
  option: optionType;
  key: number;
}

const OptionList: React.FC<OptionListProps> = ({ option, key }) => {
  const optionLabel = option.isRequired ? "Required" : "Optional";
  const inputType = option.isRequired ? "radio" : "checkbox";
  return (
    <div className="optionListContainer" key={key}>
      <div className="optionTitleSection">
        <div className="optionType">{option.type}</div>
        <div className={`optionLabel ${optionLabel}`}>{optionLabel}</div>
      </div>
      {option.optionList.map(({ optionName, optionPrice }) => (
        <OptionItem
          name={option.type}
          optionName={optionName}
          optionPrice={optionPrice}
          type={inputType}
        />
      ))}
    </div>
  );
};

export default OptionList;
