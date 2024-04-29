import React from "react";
import "./Button.css";

interface ButtonProps {
  name: string;
  backgroundColor?: string;
  handleClick: (e: React.MouseEvent) => void;
  buttonType: string;
}

const Button: React.FC<ButtonProps> = ({
  name,
  backgroundColor,
  handleClick,
  buttonType,
}) => {
  return (
    <button
      style={{ backgroundColor: backgroundColor }}
      className={buttonType}
      onClick={handleClick}
    >
      {name}
    </button>
  );
};

export default Button;
