import { inputType } from "src/pages/SignupPage";
import "./BirthdayInput.css";
import { useEffect, useState } from "react";
import { dayRegex, monthRegex, yearRegex } from "../../../utils/regex";

interface BirthdayInputProps {
  readOnly?: boolean;
  isMust?: boolean;
  value?: string;
  handleBirthChange: (birthDay: inputType) => void;
}

const BirthdayInput: React.FC<BirthdayInputProps> = ({
  readOnly,
  isMust,
  value,
  handleBirthChange,
}) => {
  type birthType = {
    year: string;
    month: string;
    day: string;
  };

  const birthDayInitialData: birthType = {
    year: "",
    month: "",
    day: "",
  };

  const [birthDay, setBirthDay] = useState(birthDayInitialData);
  const [isError, setIsError] = useState(false);
  const [isErrorMessage, setIsErrorMeassage] = useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    event.preventDefault();

    const inputName = event.target.name;
    const inputData = event.target.value;

    if (inputName === "year") {
      const error = !yearRegex.test(inputData);
      if (error) {
        setIsError(true);
      } else {
        setIsError(false);
      }

      setBirthDay((prev) => ({
        ...prev,
        [inputName]: inputData,
      }));
    }

    if (inputName === "month") {
      const error = !monthRegex.test(inputData);
      if (error) {
        setIsError(true);
      } else {
        setIsError(false);
      }

      setBirthDay((prev) => ({
        ...prev,
        [inputName]: inputData,
      }));
    }

    if (inputName === "day") {
      const error = !dayRegex.test(inputData);
      if (error) {
        setIsError(true);
      } else {
        setIsError(false);
      }

      setBirthDay((prev) => ({
        ...prev,
        [inputName]: inputData,
      }));
    }
  };

  const isValidBirthDay = (isError: boolean, birth: string) => {
    if (birth.length === 0) {
      return "";
    }

    if (isError || birth.length < 8) {
      return "생년월일이 올바르지 않습니다.";
    }

    return "";
  };

  useEffect(() => {
    const birth = birthDay.year + birthDay.month + birthDay.day;
    const error = isValidBirthDay(isError, birth);

    if (error) setIsErrorMeassage(true);
    else setIsErrorMeassage(false);

    handleBirthChange({ value: birth, error });
  }, [birthDay]);

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
          value={value}
          readOnly={readOnly}
          maxLength={4}
          onChange={handleInputChange}
          autoComplete="off"
        ></input>
        <input
          type="text"
          name="month"
          placeholder="MONTH"
          className="birthInput"
          value={value}
          readOnly={readOnly}
          maxLength={2}
          onChange={handleInputChange}
          autoComplete="off"
        ></input>
        <input
          type="text"
          name="day"
          placeholder="DAY"
          className="birthInput"
          value={value}
          readOnly={readOnly}
          maxLength={2}
          onChange={handleInputChange}
          autoComplete="off"
        ></input>
      </div>
      {isErrorMessage && (
        <div className="birthErrorMessage">
          Please enter your date of birth in the format "2024 01 02"
        </div>
      )}
    </div>
  );
};

export default BirthdayInput;
