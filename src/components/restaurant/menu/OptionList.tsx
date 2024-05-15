import React, { useEffect, useRef } from "react";
import OptionItem from "./OptionItem";
import "./OptionList.css";
import { optionGroupType } from "src/types/menuOptionTypes";

interface OptionListProps {
  optionList: optionGroupType;
  selectedOptions: number[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<number[]>>;
  setIsValidated: React.Dispatch<React.SetStateAction<boolean>>;
}

const OptionList: React.FC<OptionListProps> = ({
  optionList,
  selectedOptions,
  setSelectedOptions,
  setIsValidated,
}) => {
  const optionLabel = optionList.mandatory ? "Required" : "Optional";
  const inputType = optionList.mandatory ? "radio" : "checkbox";
  const prevSelectedOption = useRef<number>();

  console.log(selectedOptions);

  const handleCheckBoxChange = (isChecked: boolean, optionId: number) => {
    if (isChecked) {
      setSelectedOptions([...selectedOptions, optionId]);
    } else {
      setSelectedOptions(
        selectedOptions.filter((option) => option !== optionId)
      );
    }
  };

  const handleRadioChange = (optionId: number) => {
    let updateData;
    if (prevSelectedOption.current) {
      updateData = selectedOptions.filter(
        (option) => option !== prevSelectedOption.current
      );
      setSelectedOptions([...updateData, optionId]);
      prevSelectedOption.current = optionId;
    } else {
      prevSelectedOption.current = optionId;
      setSelectedOptions([...selectedOptions, optionId]);
    }
    setIsValidated(true);
  };

  useEffect(() => {
    if (optionList.mandatory && prevSelectedOption.current === undefined) {
      setIsValidated(false);
    }
  }, [selectedOptions]);

  return (
    <div className="optionListContainer">
      <div className="optionTitleSection">
        <div className="optionTitle">
          <div className="optionType">{optionList.option_name}</div>
          <div className={`optionLabel ${optionLabel}`}>{optionLabel}</div>
        </div>
        <div className="choiceNoticeMessage"></div>
      </div>

      {optionList.options.map(({ id, name, price }) => (
        <OptionItem
          inputType={inputType}
          groupName={optionList.option_name}
          name={name}
          price={price}
          key={id}
          handleCheckChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            optionList.mandatory
              ? handleRadioChange(id)
              : handleCheckBoxChange(e.target.checked, id);
          }}
        />
      ))}
    </div>
  );
};

export default OptionList;
