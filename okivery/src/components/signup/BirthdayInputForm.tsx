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
          placeholder="YEAR"
          className="birth-input"
        ></input>
        <input
          type="text"
          name="month"
          placeholder="Month"
          className="birth-input"
        ></input>
        <input
          type="text"
          name="day"
          placeholder="Day"
          className="birth-input"
        ></input>
      </div>
    </div>
  );
};

export default BirthdayInputForm;
