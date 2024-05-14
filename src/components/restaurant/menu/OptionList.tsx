import React, { useEffect, useState } from "react";
import OptionItem from "./OptionItem";
import "./OptionList.css";
import { optionGroupType, postOptionType } from "src/types/menuOptionTypes";

interface OptionListProps {
  optionList: optionGroupType;
  selectedOptionList: postOptionType[]; // 변경
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
  // 각 옵션 그룹의 최대 선택 가능한 개수
  const maxSelection = optionList.maximum;

  // 선택된 아이템 개수를 계산하는 함수
  const calculateCheckedItemCount = (): number => {
    return selectedOptionList.reduce(
      (total, group) =>
        group.group_id === optionList.option_group_id
          ? total + group.options.length
          : total,
      0
    );
  };

  // 체크된 아이템 개수 상태 변수
  const [checkedItemCount, setCheckedItemCount] = useState<number>(
    calculateCheckedItemCount()
  );

  useEffect(() => {
    // 선택된 아이템 개수 업데이트
    setCheckedItemCount(calculateCheckedItemCount());
  }, [selectedOptionList]);

  const handleCheckChange = (checked: boolean, item: number) => {
    if (checked) {
      if (checkedItemCount < maxSelection) {
        setSelectedOptionList((prevSelectedOptionList) => {
          const updatedList = [...prevSelectedOptionList];
          const groupIndex = updatedList.findIndex(
            (group) => group.group_id === optionList.option_group_id
          );

          if (groupIndex !== -1) {
            // 이미 해당 group_id가 존재하는 경우
            if (updatedList[groupIndex].options.length < maxSelection) {
              const existingItemIndex =
                updatedList[groupIndex].options.indexOf(item);

              if (existingItemIndex === -1) {
                // 중복된 아이템이 없는 경우에만 추가
                updatedList[groupIndex].options.push(item);
              }
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
      }
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
  };

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
          // 최대 선택 가능 개수를 초과하면 체크박스를 비활성화
          disabled={
            checkedItemCount >= maxSelection &&
            !selectedOptionList.find(
              (group) =>
                group.group_id === optionList.option_group_id &&
                group.options.includes(id)
            )
          }
        />
      ))}
    </div>
  );
};

export default OptionList;
