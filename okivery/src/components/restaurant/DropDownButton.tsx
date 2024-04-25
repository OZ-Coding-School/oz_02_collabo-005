import React from "react";
import { BiCaretDown } from "react-icons/bi";
import "./DropDownButton.css";

const DropDownButton: React.FC = () => {
  return (
    <div className="dropdownContainer">
      <div className="dropdownTitle">
        <div>check origin</div>
        <button className="dropbtn">
          <BiCaretDown />
        </button>
      </div>
      <div className="dropdownContent">
        <ul>
          <li>Rice</li>
          <li>Rice</li>
          <li>Rice</li>
          <li>Rice</li>
          <li>Rice</li>
        </ul>
      </div>
    </div>
  );
};

export default DropDownButton;
