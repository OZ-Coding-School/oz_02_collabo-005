import React from "react";
import "./Button.css";

interface ButtonProps {
  name: string;
  backgroundColor?: string;
  handleClick: (e: React.MouseEvent) => void;
  buttonType: string;
  disabled?: boolean;
  type?: Type;
}

type Type = "submit" | "reset" | "button" | undefined;

const Button: React.FC<ButtonProps> = ({
  name,
  backgroundColor,
  handleClick,
  buttonType,
  disabled,
  type,
}) => {
  return (
    <button
      style={{ backgroundColor: backgroundColor }}
      className={buttonType}
      onClick={handleClick}
      disabled={disabled}
      type={type}
    >
      {name}
    </button>
  );
};

export default Button;
