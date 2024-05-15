import React, { useState } from "react";
import OptionItem from "./OptionItem";
import "./OptionList.css";
import { optionGroupType } from "src/types/menuOptionTypes";

interface OptionListProps {
  optionList: optionGroupType;
}

const OptionList: React.FC<OptionListProps> = ({ optionList }) => {
  const optionLabel = optionList.mandatory ? "Required" : "Optional";
  const inputType = optionList.choice_mode === 1 ? "radio" : "checkbox";
  const selectMessage =
    optionList.mandatory && optionList.choice_mode === 1
      ? ""
      : `Select up to ${optionList.maximum}`;

  // 각 옵션 그룹의 최대 선택 가능한 개수
  const maxSelection = optionList.maximum;

  return (
    <div className="optionListContainer">
      <div className="optionTitleSection">
        <div className="optionTitle">
          <div className="optionType">{optionList.option_name}</div>
          <div className={`optionLabel ${optionLabel}`}>{optionLabel}</div>
        </div>
        <div className="choiceNoticeMessage">{selectMessage}</div>
      </div>

      {optionList.options.map(({ id, name, price }) => (
        <OptionItem
          inputType={inputType}
          groupName={optionList.option_name}
          name={name}
          price={price}
          key={id}
        />
      ))}
    </div>
  );
};

export default OptionList;
