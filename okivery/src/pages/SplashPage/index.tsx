import React from "react";
import logoImage from "../../assets/images/AppLogo.png";
import "../../styles/splashpage/page/SplashPage.css";
import Button from "../../components/common/button/Button";

const index: React.FC = () => {
  return (
    <>
      <div className="splashMainContainer">
        <div className="splashSubContainer">
          <div className="logoContainer">
            <img src={logoImage} width="128px" height="128px" />
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
          <div className="loginButton">
            <Button name="Login" backgroundColor="#414f42" to="/login" />
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
