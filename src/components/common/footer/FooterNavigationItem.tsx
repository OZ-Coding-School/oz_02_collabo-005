import React from "react";
import { CgHomeAlt, CgNotes, CgUser } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import "./FooterNavigationItem.css";

interface FooterProps {
  title: string;
  page: string;
  moveTo: string;
}

const FooterNavigationItem: React.FC<FooterProps> = ({
  title,
  page,
  moveTo,
}) => {
  const navigate = useNavigate();
  const handleNavigationItemClick = () => {
    navigate(moveTo); //이동할 도메인
  };
  const isActive = page === title;
  let IconComponent;

  switch (title) {
    case "Home":
      IconComponent = CgHomeAlt;
      break;
    case "Orders":
      IconComponent = CgNotes;
      break;
    case "Account":
      IconComponent = CgUser;
      break;
    default:
      IconComponent = null;
  }

  return (
    <div
      className={`footerNavigation ${isActive ? "activeTitle" : ""}`}
      onClick={handleNavigationItemClick}
    >
      {IconComponent && <IconComponent />}
      <div className={`footerNavTitle ${isActive ? "activeTitle" : ""}`}>
        {title}
      </div>
    </div>
  );
};

export default FooterNavigationItem;
