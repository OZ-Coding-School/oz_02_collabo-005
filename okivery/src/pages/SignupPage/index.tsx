import { useEffect, useState } from 'react';
import Button from '@components/common/button/Button';
import Header from '@components/common/header/Header';
import InputItem from '@components/common/input/InputItem';
import BirthdayInputForm from '@components/common/input/BirthdayInput';
import './SignupPage.css';
import { useNavigate } from 'react-router-dom';

export type Input = {
  value: string;
  error: string;
};

type userDataType = {
  email: Input;
  password: Input;
  repeatPassword: Input;
  birthDay: Input;
};

const SignupPage: React.FC = () => {
  const terms = 'I agree that I have fully read Okivery’s Terms of Use and ';
  const userInitialData: userDataType = {
    email: { value: '', error: '' },
    password: { value: '', error: '' },
    repeatPassword: { value: '', error: '' },
    birthDay: { value: '', error: '' },
  };
  const [userData, setUserData] = useState(userInitialData);
  const [isTermChecked, setIsTermChecked] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/login');
  };
  const handleChangeEmail = (_, value: string) => {
    const error = !isValidateEmail(value) ? '에러' : '';

    setUserData((prev) => ({
      ...prev,
      email: { value, error },
    }));
  };

  const handleChangePassword = (_, value: string) => {
    const error = !isValidatePassword(value) ? '에러' : '';

    setUserData((prev) => ({
      ...prev,
      password: { value, error },
    }));
  };
  const handleChangePasswordConfirm = (_, value: string) => {
    const error = !isValidatePasswordMatch(value, userData.password.value)
      ? '에러'
      : '';

    setUserData((prev) => ({
      ...prev,
      repeatPassword: { value, error },
    }));
  };

  const buttonDisabled = !Object.values(userData).every(
    (d) => d.value.length > 0 && d.error.length === 0
  );

  return (
    <>
      <Header hasBackIcon={true} title="" hasCartIcon={false} isFixed={false} />
      <div className="signupContainer">
        <h1 className="signupTitle">Sign Up</h1>
        <form>
          <InputItem
            label="E-Mail"
            name="email"
            type="email"
            place="ex) abcd1234@gmail.com"
            value={userData.email.value}
            className={userData.email.error ? 'error' : ''}
            handleInputChange={handleChangeEmail}
          />
          <InputItem
            label="Password"
            name="password"
            type="password"
            place="Please enter a password of at least 8 characters"
            handleInputChange={handleChangePassword}
            value={userData.password.value}
            className={userData.password.error ? 'error' : ''}
          />
          <InputItem
            label="Repeat Password"
            name="repeatPassword"
            type="password"
            place="Please re-enter your password"
            handleInputChange={handleChangePasswordConfirm}
            value={userData.repeatPassword.value}
            className={userData.repeatPassword.error ? 'error' : ''}
          />
          <div className="passwordNotMatch hide">Your password dismatches</div>
          <BirthdayInputForm
            handleBirthChange={(birthDay) =>
              setUserData((prev) => ({ ...prev, birthDay }))
            }
          />
          <div className="termContainer">
            <label>
              Terms <span>*</span>
            </label>
            <div className="termContent">
              <input
                type="radio"
                name="term"
                value="agree"
                id="term"
                checked={isTermChecked}
              />
              <div>
                {terms}
                <a href="/" target="_blank">
                  Privacy Policy.
                </a>
              </div>
            </div>
          </div>
          <div className="signupBtn">
            <Button
              disabled={buttonDisabled}
              name="Sign up"
              buttonType="bigButton"
              handleClick={handleButtonClick}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default SignupPage;

const isValidateEmail = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

const isValidatePassword = (password: string): boolean => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

const isValidatePasswordMatch = (
  password: string,
  confirmPassword: string
): boolean => {
  return password === confirmPassword;
};

// const validatePhoneNumber = (phoneNumber: string): boolean => {
//   const hasHyphen = phoneNumber.includes("-");
//   return (
//     !hasHyphen && (phoneNumber.length === 10 || phoneNumber.length === 11)
//   );
// };
