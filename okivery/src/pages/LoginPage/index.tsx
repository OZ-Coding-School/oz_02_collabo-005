import React, { useEffect, useState } from "react";
import Header from "../../components/common/header/Header";
import logoImage from "../../assets/images/AppLogo.png";
import Button from "../../components/common/button/Button";
import "./LoginPage.css";
import facebookLogoImage from "../../assets/images/FacebookLogoImage.png";
import googleLogoImage from "../../assets/images/GoogleLogoImage.png";
import FloatingLabelInput from "../../components/common/input/FloatingLabelInput";
import { useNavigate } from "react-router-dom";

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
            />
          </div>
          <div className="signUpButton">
            <Button
              name="Create an account"
              backgroundColor="#FF6347"
              handleClick={handleGoSignUp}
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
    </>
  );
};

export default LoginPage;
