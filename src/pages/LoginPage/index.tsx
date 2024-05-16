import React, { useEffect, useState } from "react";
import Header from "@components/common/header/Header";
import logoImage from "../../assets/images/AppLogo.png";
import Button from "@components/common/button/Button";
import "./LoginPage.css";
import googleLogoImage from "../../assets/images/GoogleLogoImage.png";
import FloatingLabelInput from "@components/common/input/FloatingLabelInput";
import { useLocation, useNavigate } from "react-router-dom";
import SocialLoginButton from "../../components/login/SocialLoginButton";
import apiRoutes from "../../api/apiRoutes";
import customAxios from "../../api/axios";
import { useLoginStore } from "../../store/useLoginStore";

type userDataType = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const initialUserData: userDataType = {
    email: "",
    password: "",
  };
  const [isAllFilled, setIsAllFilled] = useState<boolean>(false);
  const [userData, setUserData] = useState(initialUserData);

  // 현재 페이지의 경로를 가져옴
  const location = useLocation();
  const from = location?.state?.redirectedFrom?.pathname || "/home";

  useEffect(() => {
    // 모두 입력되어있는지 검사 후 로그인 버튼 활성화
    const isAllFieldsFilled =
      userData.email !== "" &&
      userData.password !== "" &&
      userData.password.length >= 8;

    setIsAllFilled(isAllFieldsFilled);
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

  const handleGoSignUp = () => {
    navigate("/sign");
  };

  const handleLoginButtonClick = async (
    e: React.MouseEvent<Element, MouseEvent>
  ) => {
    e.preventDefault();
    const postUserData = {
      email: userData.email,
      password: userData.password,
    };
    try {
      const response = await customAxios.post(
        apiRoutes.userLogin,
        postUserData
      );
      if (response.status === 200) {
        if (response.data.error) {
          alert("The account you have currently entered is a deleted account.");
        } else {
          const loginToken = response.data.token.access;
          const refreshToken = response.data.token.refresh;
          useLoginStore.setState({ isLogin: true, loginToken, refreshToken });

          alert("Login Success!!");
          navigate(from);
        }
      }
    } catch (error) {
      alert("Re-enter your email or password.");
    }
  };

  return (
    <>
      <Header
        hasBackIcon={true}
        title=""
        hasCartIcon={false}
        handleBackIconClick={() => navigate(-1)}
      />
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
              backgroundColor={isAllFilled ? "#FF6347" : "#767676"}
              handleClick={handleLoginButtonClick}
              buttonType="bigButton"
              disabled={isAllFilled ? false : true}
            />
          </div>
          <div className="signUpButton">
            <Button
              name="Create an account"
              backgroundColor="#FF6347"
              handleClick={handleGoSignUp}
              buttonType="bigButton"
              type="button"
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
