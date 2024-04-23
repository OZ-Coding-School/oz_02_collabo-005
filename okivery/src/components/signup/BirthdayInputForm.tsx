import "./BirthdayInputForm.css";

const BirthdayInputForm = () => {
  return (
    <div className="birthInputContainer">
      <label>Birthday</label>
      <p className="eventExplain">
        We will send you a birthday coupon an your special day!
      </p>
      <div className="birthInputForm">
        <input
          type="number"
          name="year"
          placeholder="YEAR"
          className="birthInput"
        ></input>
        <input
          type="text"
          name="month"
          placeholder="MONTH"
          className="birthInput"
        ></input>
        <input
          type="text"
          name="day"
          placeholder="DAY"
          className="birthInput"
        ></input>
      </div>
    </div>
  );
};

export default BirthdayInputForm;
