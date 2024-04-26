import React from "react";
import "./Button.css";

interface ButtonProps {
  name: string;
  backgroundColor: string;
  handleClick: (e: React.MouseEvent) => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  name,
  backgroundColor,
  handleClick,
  disabled,
}) => {
  return (
    <button
      style={{ backgroundColor: backgroundColor }}
      className="commonButton"
      onClick={handleClick}
      disabled={disabled}
    >
      {name}
    </button>
  );
};

export default Button;
