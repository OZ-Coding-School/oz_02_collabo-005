import "../../styles/signup/component/BirthdayInputForm.css";

const BirthdayInputForm = () => {
  return (
    <div className="birthInput-container">
      <label>Birthday</label>
      <p className="event-explain">
        We will send you a birthday coupon an your special day!
      </p>
      <div className="birthInput-form">
        <input
          type="text"
          name="year"
          value="YEAR"
          className="birth-input"
        ></input>
        <input
          type="text"
          name="month"
          value="Month"
          className="birth-input"
        ></input>
        <input
          type="text"
          name="day"
          value="Day"
          className="birth-input"
        ></input>
      </div>
    </div>
  );
};

export default BirthdayInputForm;
