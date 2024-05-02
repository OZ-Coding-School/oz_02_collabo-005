import { useEffect, useState } from "react";
import Button from "@components/common/button/Button";
import Header from "@components/common/header/Header";
import InputItem from "@components/common/input/InputItem";
import "./SignupPage.css";
import { useNavigate } from "react-router-dom";
import { emailRegex, passwordRegex, phoneRegex } from "../../utils/regex";
import BirthdayInput from "@components/common/input/BirthdayInput";

export type inputType = {
  value: string;
  error: string;
};

type userDataType = {
  name: inputType;
  email: inputType;
  password: inputType;
  repeatPassword: inputType;
  phone: inputType;
  birthday: inputType;
};

const SignupPage: React.FC = () => {
  const terms = "I agree that I have fully read Okivery’s Terms of Use and ";
  const userInitialData: userDataType = {
    name: { value: "", error: "" },
    email: { value: "", error: "" },
    password: { value: "", error: "" },
    repeatPassword: { value: "", error: "" },
    phone: { value: "", error: "" },
    birthday: { value: "", error: "" },
  };
  const [userData, setUserData] = useState(userInitialData);
  const [isTermChecked, setIsTermChecked] = useState(false);
  const navigate = useNavigate();

  const handleTermCheck = () => {
    setIsTermChecked((prev) => !prev);
  };

  const handleButtonClick = () => {
    navigate("/login");
  };

  const handleInputChange = (field: string, value: string): void => {
    let error = "";

    switch (field) {
      case "email":
        error = !isValidateEmail(value) ? "이메일이 유효하지 않습니다." : "";
        break;
      case "password":
        error = !isValidatePassword(value)
          ? "비밀번호는 8글자 이상 입력해주십시오"
          : "";
        break;
      case "repeatPassword":
        error = !isPasswordMatch(userData.password.value, value)
          ? "비밀번호가 일치하지 않습니다."
          : "";
        break;
      case "phone":
        error = !isValidatePhone(value)
          ? "핸드폰 번호가 유효하지 않습니다."
          : "";
        break;
      default:
        break;
    }

    setUserData((prev) => ({
      ...prev,
      [field]: { value, error },
    }));
  };

  const isValidateEmail = (email: string): boolean => {
    return emailRegex.test(email);
  };

  const isValidatePassword = (password: string): boolean => {
    return passwordRegex.test(password);
  };

  const isPasswordMatch = (
    password: string,
    repeatPassword: string
  ): boolean => {
    return password === repeatPassword;
  };

  const isValidatePhone = (phone: string): boolean => {
    return phoneRegex.test(phone);
  };

  console.log(userData);

  return (
    <>
      <Header hasBackIcon={true} title="" hasCartIcon={false} isFixed={false} />
      <div className="signupContainer">
        <h1 className="signupTitle">Sign Up</h1>
        <form>
          <InputItem
            label="Name"
            name="name"
            type="text"
            place="Please enter your name"
            handleInputChange={(e) => {
              handleInputChange("name", e.target.value);
            }}
          />
          <InputItem
            label="E-Mail"
            name="email"
            type="email"
            place="ex) abcd1234@gmail.com"
            value={userData.email.value}
            className={userData.email.error ? "error" : ""}
            errorMessage={userData.email.error}
            handleInputChange={(e) => {
              handleInputChange("email", e.target.value);
            }}
          />
          <InputItem
            label="Password"
            name="password"
            type="password"
            place="Please enter a password of at least 8 characters"
            value={userData.password.value}
            className={userData.password.error ? "error" : ""}
            errorMessage={userData.password.error}
            handleInputChange={(e) => {
              handleInputChange("password", e.target.value);
            }}
          />
          <InputItem
            label="Repeat Password"
            name="repeatPassword"
            type="password"
            place="Please re-enter your password"
            value={userData.repeatPassword.value}
            className={userData.repeatPassword.error ? "error" : ""}
            errorMessage={userData.repeatPassword.error}
            handleInputChange={(e) => {
              handleInputChange("repeatPassword", e.target.value);
            }}
          />
          <InputItem
            label="Phone Number"
            name="phone"
            type="phone"
            place="Please enter except for hyphen (-)"
            value={userData.phone.value}
            className={userData.phone.error ? "error" : ""}
            errorMessage={userData.phone.error}
            handleInputChange={(e) => {
              handleInputChange("phone", e.target.value);
            }}
          />
          <BirthdayInput />
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
            <Button
              name="Sign up"
              // backgroundColor={isFormValid ? "#FF6347" : "#767676"}
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
