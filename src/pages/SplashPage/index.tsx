import React from "react";
import OkiveryLogin from "../../assets/images/okiveryLogin.webp";
import "./SplashPage.css";
import { useNavigate } from "react-router-dom";

const SplashPage: React.FC = () => {
  const navigate = useNavigate();
  const handleGoLogin = (): void => {
    navigate("/login");
  };
  return (
    <>
      <div className="splashMainContainer">
        <img src={OkiveryLogin} alt="okiveryLogin" className="loginImage" />
        <button
          aria-label="loginButton"
          className="loginButton"
          onClick={handleGoLogin}
        >
          Login
        </button>
      </div>
    </>
  );
};

export default SplashPage;
