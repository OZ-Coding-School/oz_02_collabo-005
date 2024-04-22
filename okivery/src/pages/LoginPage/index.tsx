import React, { useState } from "react";
import Header from "../../components/common/header/Header";
import logoImage from "../../assets/images/AppLogo.png";
import LoginInput from "../../components/login/LoginInput";
import Button from "../../components/common/button/Button";
import "../../styles/login/page/LoginPage.css";
import facebookLogoImage from "../../assets/images/FacebookLogoImage.png";
import googleLogoImage from "../../assets/images/GoogleLogoImage.png";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // 이메일 입력값 변경 시 호출되는 함수
  const handleEmailChange = (value: string): void => {
    setEmail(value);
  };

  // 패스워드 입력값 변경 시 호출되는 함수
  const handlePasswordChange = (value: string): void => {
    setPassword(value);
  };

  // 이메일 유효성 검사 함수
  const isValidEmail = (email: string): boolean => {
    return /\S+@\S+\.\S+/.test(email);
  };

  // 로그인 버튼 활성화 여부 계산 함수
  // 이메일과 패스워드가 입력되지 않았거나 이메일이 형식에 맞지 않고 패스워드길이가 8글자 미만이면 true = 비활성화
  const isLoginButtonDisabled: boolean =
    !email || !password || !isValidEmail(email) || password.length < 8;

  // 소셜 로그인 (페이스북)

  return (
    <>
      <Header hasBackicon={true} title="" hasCartIcon={false} />
      <div className="loginMainContainer">
        <div className="loginSubContainer">
          <div className="logoContainer">
            <img src={logoImage} width="128px" height="128px" />
          </div>
          <section className="loginInputForm">
            <LoginInput
              inputType="email"
              placeHolder="E-mail"
              text="E-MAIL"
              onInputChange={handleEmailChange}
            />
            <LoginInput
              inputType="password"
              placeHolder="password"
              text="PASSWORD"
              onInputChange={handlePasswordChange}
            />
          </section>
          <div className="loginButtonSection">
            <div className="loginButton">
              <Button
                name="Login"
                backgroundColor="#FF6347"
                to="/home"
                disabled={isLoginButtonDisabled}
              />
            </div>
            <div className="signUpButton">
              <Button
                name="Create an account"
                backgroundColor="#FF6347"
                to="/sign"
              />
            </div>
          </div>
          <div className="socialLoginButtonSection">
            <div className="googleButton">
              <button>
                <img className="googleLogoImage" src={googleLogoImage} />
                Continue with Google
              </button>
            </div>
            <div className="facebookButton">
              <button>
                <img className="facebookLogoImage" src={facebookLogoImage} />
                Continue with Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
