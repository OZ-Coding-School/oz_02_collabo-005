import { useEffect, useState } from "react";
import Button from "../../components/common/button/Button";
import Header from "../../components/common/header/Header";
import InputFormItem from "../../components/common/input/InputFormItem";
import "./SignupPage.css";
import BirthdayInputForm from "../../components/common/input/BirthdayInput";

type userDataType = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  phone: string;
};

const SignupPage: React.FC = () => {
  const terms = "I agree that I have fully read Okivery’s Terms of Use and ";
  const userInitialData: userDataType = {
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    phone: "",
  };
  const [userData, setUserData] = useState(userInitialData);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isTermChecked, setIsTermChecked] = useState(false);

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
    setIsTermChecked((prevChecked) => !prevChecked);
  };

  // const validateEmail = (email: string): boolean => {
  //   const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //   return !regex.test(email);
  // };

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

  useEffect(() => {
    // 모든 입력란에 값이 있을 때만 isFormValid 상태를 true로 업데이트
    const isAllFieldsFilled =
      userData.name !== "" &&
      userData.email !== "" &&
      userData.password !== "" &&
      userData.phone !== "" &&
      isTermChecked;

    setIsFormValid(isAllFieldsFilled);
  }, [userData, isTermChecked]);

  return (
    <>
      <Header hasBackIcon={true} title="" hasCartIcon={false} isFixed={false} />
      <div className="signupContainer">
        <h1 className="signupTitle">Sign Up</h1>
        <form>
          <InputFormItem
            label="Name"
            name="name"
            type="text"
            value={userData.name}
            place="Please enter your name"
            isMust={true}
            handleInputChange={handleInputChange}
          />
          <InputFormItem
            label="E-Mail"
            name="email"
            type="email"
            value={userData.email}
            place="ex) abcd1234@gmail.com"
            isMust={true}
            handleInputChange={handleInputChange}
          />
          <InputFormItem
            label="Password"
            name="password"
            type="password"
            value={userData.password}
            place="Please enter a password of at least 8 characters"
            isMust={true}
            handleInputChange={handleInputChange}
          />
          <InputFormItem
            label="Repeat Password"
            name="repeatPassword"
            type="password"
            value={userData.repeatPassword}
            place="Please re-enter your password"
            isMust={true}
            handleInputChange={handleInputChange}
          />
          <div className="passwordNotMatch hide">Your password dismatches</div>
          <InputFormItem
            label="Phone Number"
            name=""
            type="phone"
            value={userData.phone}
            place="Please enter except for hyphen (-)"
            isMust={true}
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
                onChange={handleTermCheck}
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
              name="Sign up"
              backgroundColor={isFormValid ? "#FF6347" : "#767676"}
              to="/login"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default SignupPage;
