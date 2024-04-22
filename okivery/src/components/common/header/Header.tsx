import BackIcon from "../../../assets/icons/back-icon.png";
import "../../../styles/common/header/Header.css";

const Header = () => {
  return (
    <div className="header-container">
      <img src={BackIcon} className="back-icon"></img>
    </div>
  );
};

export default Header;
