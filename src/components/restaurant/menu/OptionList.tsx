import React, { useEffect, useState } from "react";
import OptionItem from "./OptionItem";
import "./OptionList.css";
import { optionGroupType, postOptionType } from "src/types/menuOptionTypes";

interface OptionListProps {
  optionList: optionGroupType;
  setSelectedOptionList: React.Dispatch<React.SetStateAction<postOptionType[]>>;
}

const OptionList: React.FC<OptionListProps> = ({
  optionList,
  selectedOptionList,
  setSelectedOptionList,
}) => {
  const optionLabel = optionList.mandatory ? "Required" : "Optional";
  const inputType = optionList.choice_mode === 1 ? "radio" : "checkbox";
  const maxSelectMessage = `Select up to ${optionList.maximum}`;
  const selectMessage =
    optionList.mandatory && optionList.choice_mode === 1
      ? ""
      : maxSelectMessage;

  const handleCheckChange = (checked: boolean, item: number) => {
    if (checked) {
      setSelectedOptionList((prevSelectedOptionList) => {
        const updatedList = [...prevSelectedOptionList];
        const groupIndex = updatedList.findIndex(
          (group) => group.group_id === optionList.option_group_id
        );

        if (groupIndex !== -1) {
          // 이미 해당 group_id가 존재하는 경우
          const existingItemIndex =
            updatedList[groupIndex].options.indexOf(item);

          if (existingItemIndex === -1) {
            // 중복된 아이템이 없는 경우에만 추가
            updatedList[groupIndex].options.push(item);
          }
        } else {
          // 해당 group_id가 존재하지 않는 경우
          updatedList.push({
            group_id: optionList.option_group_id,
            options: [item],
          });
        }

        return updatedList;
      });
    } else {
      setSelectedOptionList((prevSelectedOptionList) => {
        // 해당 아이템이 속한 그룹의 options 배열에서 현재 아이템을 제거
        const updatedList = prevSelectedOptionList.map((group) => ({
          ...group,
          options: group.options.filter((option) => option !== item),
        }));

        return updatedList.filter((group) => group.options.length > 0);
      });
    }

    console.log();
  };

  useEffect(() => {
    const checkValidate = () => {
      const groupIndex = selectedOptionList.findIndex(
        (group) => group.group_id === optionList.option_group_id
      );

      if (groupIndex === -1) {
        // 해당 그룹이 존재하지 않는 경우
        return !optionList.mandatory; // 필수 옵션이 아니라면 유효성 검사 통과
      }

      if (optionList.mandatory) {
        // 필수 옵션인 경우
        if (selectedOptionList[groupIndex].options.length === 0) {
          // 선택한 옵션이 없는 경우 유효하지 않음
          return false;
        }

        if (
          selectedOptionList[groupIndex].options.length > optionList.maximum
        ) {
          // 선택한 옵션이 최대 개수를 초과하는 경우 유효하지 않음
          return false;
        }
      }

      return true; // 그 외의 경우 유효성 검사 통과
    };
  }, [selectedOptionList]);

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
          handleCheckChange={(checked: boolean) =>
            handleCheckChange(checked, id)
          }
        />
      ))}
    </div>
  );
};

export default OptionList;
