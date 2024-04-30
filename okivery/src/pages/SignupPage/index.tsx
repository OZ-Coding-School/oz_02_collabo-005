import { useEffect, useState } from 'react';
import Button from '@components/common/button/Button';
import Header from '@components/common/header/Header';
import InputItem from '@components/common/input/InputItem';
import BirthdayInputForm from '@components/common/input/BirthdayInput';
import './SignupPage.css';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

type userDataType = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  phone: string;
};

const SignupPage: React.FC = () => {
  const terms = 'I agree that I have fully read Okivery’s Terms of Use and ';
  const userInitialData: userDataType = {
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
    phone: '',
  };
  const [userData, setUserData] = useState(userInitialData);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isTermChecked, setIsTermChecked] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm<userDataType>();

  // input에 입력된 값들을 userData에 저장하는 함수
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    event.preventDefault();

    const inputName = event.target.name;
    const inputData = event.target.value;
    setUserData({
      ...userData,
      [inputName]: inputData,
    });
  };

  // trem의 토글 상태를 체크하는 함수
  const handleTermCheck = () => {
    setIsTermChecked((prev) => !prev);
  };

  const handleButtonClick = () => {
    navigate('/login');
  };

  useEffect(() => {
    // 모든 입력란에 값이 있을 때만 isFormValid 상태를 true로 업데이트
    const isAllFieldsFilled =
      userData.name !== '' &&
      userData.email !== '' &&
      userData.password !== '' &&
      userData.phone !== '' &&
      isTermChecked;

    setIsFormValid(isAllFieldsFilled);
  }, [userData, isTermChecked]);

  const onSubmit = handleSubmit(
    () => {
      console.log('test');
    },
    (error) => {
      console.log(error);
    }
  );

  return (
    <>
      <Header hasBackIcon={true} title="" hasCartIcon={false} isFixed={false} />
      <div className="signupContainer">
        <h1 className="signupTitle">Sign Up</h1>
        <form onSubmit={onSubmit}>
          <InputItem
            label="Name"
            type="text"
            place="Please enter your name"
            {...register('name', {
              required: true,
              validate: (d) => {
                return isValidateEmail(d) ? '' : '이메일이 유효하지 않습니다.';
              },
            })}
          />
          {formState.errors['name']?.message}
          <InputItem
            label="E-Mail"
            type="email"
            place="ex) abcd1234@gmail.com"
            {...register('email')}
          />
          <InputItem
            label="Password"
            name="password"
            type="password"
            place="Please enter a password of at least 8 characters"
            handleInputChange={handleInputChange}
          />
          <InputItem
            label="Repeat Password"
            name="repeatPassword"
            type="password"
            place="Please re-enter your password"
            handleInputChange={handleInputChange}
          />
          <div className="passwordNotMatch hide">Your password dismatches</div>
          <InputItem
            label="Phone Number"
            name="phone"
            type="phone"
            place="Please enter except for hyphen (-)"
            handleInputChange={handleInputChange}
          />
          <BirthdayInputForm />
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
                onClick={handleTermCheck}
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
            <button type="submit">SUBMIT</button>
            <Button
              name="Sign up"
              backgroundColor={isFormValid ? '#FF6347' : '#767676'}
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

// const validatePassword = (password: string): boolean => {
//   const regex =
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//   return !regex.test(password);
// };

// const validatePasswordMatch = (
//   password: string,
//   confirmPassword: string
// ): boolean => {
//   return password === confirmPassword;
// };

// const validatePhoneNumber = (phoneNumber: string): boolean => {
//   const hasHyphen = phoneNumber.includes("-");
//   return (
//     !hasHyphen && (phoneNumber.length === 10 || phoneNumber.length === 11)
//   );
// };
