import React, { useEffect, useState } from "react";
import Header from "@components/common/header/Header";
import logoImage from "../../assets/images/AppLogo.png";
import Button from "@components/common/button/Button";
import "./LoginPage.css";
import googleLogoImage from "../../assets/images/GoogleLogoImage.png";
import FloatingLabelInput from "@components/common/input/FloatingLabelInput";
import { useNavigate } from "react-router-dom";
import SocialLoginButton from "../../components/login/SocialLoginButton";

type userDataType = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const initialUserData: userDataType = {
    email: "",
    password: "",
  };
  const [userData, setUserData] = useState(initialUserData);

  useEffect(() => {
    const isAllFieldsFilled =
      userData.email !== "" &&
      userData.password !== "" &&
      userData.password.length > 8;

    setIsFormValid(isAllFieldsFilled);
  }, [userData]);

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

  // 이메일 유효성 검사 함수
  const isValidEmail = (email: string): boolean => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const handleGoSignUp = () => {
    navigate("/sign");
  };

  const handleLogin = () => {
    if (isFormValid && isValidEmail(userData.email)) {
      navigate("/home");
    } else {
      alert("이메일과 비밀번호를 다시 입력하세요.");
    }
  };
  // 디비로 입력한 이메일과 패스워드를 보내 일치여부 확인 후 일치 시 로그인 성공
  // const handleLogin = (): void => {
  //}

  return (
    <>
      <Header hasBackIcon={true} title="" hasCartIcon={false} />
      <div className="loginMainContainer">
        <div className="logoContainer">
          <img src={logoImage} width="128px" height="128px" />
        </div>
        <form className="loginInputForm">
          <FloatingLabelInput
            inputType="email"
            name="email"
            value={userData.email}
            placeHolder="E-mail"
            label="E-MAIL"
            handleInputChange={handleInputChange}
          />
          <FloatingLabelInput
            inputType="password"
            name="password"
            value={userData.password}
            placeHolder="password"
            label="PASSWORD"
            handleInputChange={handleInputChange}
          />
        </form>
        <div className="loginButtonSection">
          <div className="loginButton">
            <Button
              name="Login"
              backgroundColor={isFormValid ? "#FF6347" : "#767676"}
              handleClick={handleLogin}
              buttonType="bigButton"
            />
          </div>
          <div className="signUpButton">
            <Button
              name="Create an account"
              backgroundColor="#FF6347"
              handleClick={handleGoSignUp}
              buttonType="bigButton"
            />
          </div>
        </div>
        <div className="socialLoginButtonSection">
          <div className="googleButton">
            <SocialLoginButton
              name="googleLogoImage"
              text="Continue with Google"
              imageUrl={googleLogoImage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
