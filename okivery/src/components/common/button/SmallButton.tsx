import React from "react";
import "./SmallButton.css";

interface SmallButtonProps {
  name: string;
  handleClick: () => void;
}

const SmallButton: React.FC<SmallButtonProps> = ({ name, handleClick }) => {
  return (
    <>
      <button onClick={handleClick} className="smallButton">
        {name}
      </button>
    </>
  );
};

export default SmallButton;
