import React, { useState } from "react";
import { BiCaretDown, BiCaretUp } from "react-icons/bi";
import "./DropDownButton.css";

const DropDownButton: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked((prev) => !prev);
  };

  return (
    <div className="dropdownContainer">
      <div className="dropdownTitle">
        <div>check origin</div>
        <button className="dropbtn" onClick={handleClick}>
          {isClicked ? <BiCaretUp /> : <BiCaretDown />}
        </button>
      </div>
      <div className={`dropdownContent ${isClicked ? "open" : " "}`}>
        <ul className="dropdownList">
          <li>Rice (Domestic)</li>
          <li>Kimchi (Chinese)</li>
          <li>Garlic (Domestic)</li>
          <li>Egg (Domestic)</li>
          <li>Red Pepper Powder (Domestic/Chinese)</li>
        </ul>
      </div>
    </div>
  );
};

export default DropDownButton;
