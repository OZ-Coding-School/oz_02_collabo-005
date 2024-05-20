import React from "react";
import logoImage from "../../assets/images/AppLogo.webp";
import "./SplashPage.css";
import Button from "@components/common/button/Button";
import { useNavigate } from "react-router-dom";

const SplashPage: React.FC = () => {
  const navigate = useNavigate();
  const handleGoLogin = (): void => {
    navigate("/login");
  };
  return (
    <>
      <div className="splashMainContainer">
        <div className="splashSubContainer">
          <div className="logoContainer">
            <img
              src={logoImage}
              alt="okiveryLogo"
              width="128px"
              height="128px"
            />
          </div>
          <div className="appNameTextContainer">
            <div className="appNameDescription">
              <h1>
                Okay + Free
                <br />
                Delivery =
              </h1>
            </div>
            <div className="appName">
              <h1>okivery</h1>
            </div>
          </div>
          <div className="splashLoginButton">
            <Button
              name="Login"
              backgroundColor="#414f42"
              handleClick={handleGoLogin}
              buttonType="bigButton"
              type="button"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SplashPage;
