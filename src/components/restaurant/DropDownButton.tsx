import React, { useState } from "react";
import { BiCaretDown, BiCaretUp } from "react-icons/bi";
import "./DropDownButton.css";

interface DropDownButtonProps {
  origin: string | undefined;
}

const DropDownButton: React.FC<DropDownButtonProps> = ({ origin }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked((prev) => !prev);
  };

  return (
    <div className="dropdownContainer">
      <div className="dropdownTitle">
        <div>check origin</div>
        <button className="dropBtn" onClick={handleClick}>
          {isClicked ? (
            <BiCaretUp className="dropIcon" />
          ) : (
            <BiCaretDown className="dropIcon" />
          )}
        </button>
      </div>
      <div className={`dropdownContent ${isClicked ? "open" : " "}`}>
        {origin}
      </div>
    </div>
  );
};

export default DropDownButton;
