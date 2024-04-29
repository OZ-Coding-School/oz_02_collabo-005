import React, { useState } from "react";
import Header from "@components/common/header/Header";
import logoImage from "../../assets/images/AppLogo.png";
import Button from "@components/common/button/Button";
import "./LoginPage.css";
import facebookLogoImage from "../../assets/images/FacebookLogoImage.png";
import googleLogoImage from "../../assets/images/GoogleLogoImage.png";
import FloatingLabelInput from "@components/common/input/FloatingLabelInput";
// import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  // const navigate = useNavigate();
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

  // 디비로 입력한 이메일과 패스워드를 보내 일치여부 확인 후 일치 시 로그인 성공
  // const handleLogin = (): void => {
  //   fetch("http://api주소.com/api/login", {
  //     method: "Post",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ email, password }),
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       }
  //       throw new Error("Network response was not ok");
  //     })
  //     .then((data) => {
  //       // 서버로 응답 받음
  //       if (data.success) {
  //         navigate("/home");
  //       } else {
  //         // 로그인 실패
  //         alert("login failed: It's not correct email or password");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("There was an error logging in: ", error);
  //     });
  // };

  return (
    <>
      <Header hasBackIcon={true} to="/" title="" hasCartIcon={false} />
      <div className="loginMainContainer">
        <div className="loginSubContainer">
          <div className="logoContainer">
            <img src={logoImage} width="128px" height="128px" />
          </div>
          <section className="loginInputForm">
            <FloatingLabelInput
              inputType="email"
              placeHolder="E-mail"
              label="E-MAIL"
              onInputChange={handleEmailChange}
            />
            <FloatingLabelInput
              inputType="password"
              placeHolder="password"
              label="PASSWORD"
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
                // handleClick={handleLogin}
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
