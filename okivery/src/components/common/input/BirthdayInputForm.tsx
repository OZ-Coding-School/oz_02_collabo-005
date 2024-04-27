import "./BirthdayInputForm.css";

interface BirthdayInputProps {
  isEdit?: boolean;
  isMust?: boolean;
}

const BirthdayInputForm: React.FC<BirthdayInputProps> = ({
  isEdit,
  isMust,
}) => {
  // 각 birthday의 입력 값이 최대 길이보다 긴 경우 자르기(type=number일때만)
  // const handleOnInput = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  //   maxLength: number
  // ): void => {
  //   const inputValue: string = event.target.value;
  //   if (inputValue.length > maxLength) {
  //     event.target.value = inputValue.slice(0, maxLength);
  //   }
  // };

  return (
    <div className="birthInputContainer">
      <label>
        Birthday <span className={isMust ? "" : "hideSpan"}>*</span>
      </label>
      <p className="eventExplain">
        We will send you a birthday coupon an your special day!
      </p>
      <div className="birthInputForm">
        <input
          type="text"
          name="year"
          placeholder="YEAR"
          className="birthInput"
          readOnly={!isEdit}
          maxLength={4}
        ></input>
        <input
          type="text"
          name="month"
          placeholder="MONTH"
          className="birthInput"
          readOnly={!isEdit}
          maxLength={2}
        ></input>
        <input
          type="text"
          name="day"
          placeholder="DAY"
          className="birthInput"
          readOnly={!isEdit}
          maxLength={2}
        ></input>
      </div>
    </div>
  );
};

export default BirthdayInputForm;