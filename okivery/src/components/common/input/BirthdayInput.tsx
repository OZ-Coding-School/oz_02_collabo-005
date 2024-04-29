import "./BirthdayInput.css";

interface BirthdayInputProps {
  readOnly?: boolean;
  isMust?: boolean;
  value?: string;
}

const BirthdayInput: React.FC<BirthdayInputProps> = ({
  readOnly,
  isMust,
  value,
}) => {
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
          type="number"
          name="year"
          placeholder="YEAR"
          className="birthInput"
          value={value}
          readOnly={readOnly}
          maxLength={4}
        ></input>
        <input
          type="text"
          name="month"
          placeholder="MONTH"
          className="birthInput"
          value={value}
          readOnly={readOnly}
          maxLength={2}
        ></input>
        <input
          type="text"
          name="day"
          placeholder="DAY"
          className="birthInput"
          value={value}
          readOnly={readOnly}
          maxLength={2}
        ></input>
      </div>
    </div>
  );
};

export default BirthdayInput;
