import "../../styles/signup/component/BirthdayInputForm.css";

const BirthdayInputForm = () => {
  return (
    <div className="birthInputContainer">
      <label>Birthday</label>
      <p className="eventExplain">
        We will send you a birthday coupon an your special day!
      </p>
      <div className="birthInputForm">
        <input
          type="text"
          name="year"
          placeholder="YEAR"
          className="birthInput"
        ></input>
        <input
          type="text"
          name="month"
          placeholder="Month"
          className="birthInput"
        ></input>
        <input
          type="text"
          name="day"
          placeholder="Day"
          className="birthInput"
        ></input>
      </div>
    </div>
  );
};

export default BirthdayInputForm;
