import { useEffect, useState } from 'react';
import './BirthdayInput.css';
import { Input } from 'src/pages/SignupPage';

interface BirthdayInputProps {
  readOnly?: boolean;
  isMust?: boolean;
  handleBirthChange: (birthDay: Input) => void;
}

const BirthdayInput: React.FC<BirthdayInputProps> = ({
  readOnly,
  isMust,
  handleBirthChange,
}) => {
  const [birthDay, setBirthDay] = useState({
    year: '',
    month: '',
    day: '',
  });
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    event.preventDefault();

    const inputName = event.target.name;
    const inputData = event.target.value;
    const value = Number(inputData);

    if (isNaN(value)) {
      return;
    }

    if (inputName === 'year' && value > 2024) {
      return;
    }

    if (inputName === 'month' && value > 12) {
      return;
    }

    if (inputName === 'day' && value > 31) {
      return;
    }

    setBirthDay((prev) => ({
      ...prev,
      [inputName]: inputData,
    }));
  };

  useEffect(() => {
    const s = birthDay.year + birthDay.month + birthDay.day;
    handleBirthChange({ value: s, error: '' });
  }, [birthDay]);

  return (
    <div className="birthInputContainer">
      <label>
        Birthday <span className={isMust ? '' : 'hideSpan'}>*</span>
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
          value={birthDay.year}
          readOnly={readOnly}
          maxLength={4}
          onChange={handleInputChange}
        ></input>
        <input
          type="text"
          name="month"
          placeholder="MONTH"
          className="birthInput"
          value={birthDay.month}
          readOnly={readOnly}
          maxLength={2}
          onChange={handleInputChange}
        ></input>
        <input
          type="text"
          name="day"
          placeholder="DAY"
          className="birthInput"
          value={birthDay.day}
          readOnly={readOnly}
          maxLength={2}
          onChange={handleInputChange}
        ></input>
      </div>
    </div>
  );
};

export default BirthdayInput;
