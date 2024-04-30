import React from 'react';
import './Button.css';

interface ButtonProps {
  name: string;
  backgroundColor?: string;
  handleClick: (e: React.MouseEvent) => void;
  buttonType: string;
  disabled: boolean;
}

const Button: React.FC<ButtonProps> = ({
  name,
  backgroundColor,
  handleClick,
  buttonType,
  disabled,
}) => {
  return (
    <button
      style={{ backgroundColor: backgroundColor }}
      className={buttonType}
      disabled={disabled}
      onClick={handleClick}
    >
      {name}
    </button>
  );
};

export default Button;
