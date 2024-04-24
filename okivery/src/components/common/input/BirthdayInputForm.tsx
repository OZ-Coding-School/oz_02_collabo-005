import "./BirthdayInputForm.css";

interface BirthdayInputProps {
  isEdit?: boolean;
  isMust?: boolean;
}

const BirthdayInputForm: React.FC<BirthdayInputProps> = ({
  isEdit,
  isMust,
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
          readOnly={!isEdit}
        ></input>
        <input
          type="text"
          name="month"
          placeholder="MONTH"
          className="birthInput"
          readOnly={!isEdit}
        ></input>
        <input
          type="text"
          name="day"
          placeholder="DAY"
          className="birthInput"
          readOnly={!isEdit}
        ></input>
      </div>
    </div>
  );
};

export default BirthdayInputForm;
