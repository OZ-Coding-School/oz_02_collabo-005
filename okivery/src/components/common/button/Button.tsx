import React from "react";
import "../../../styles/common/Button.css";

interface ButtonProps {
  name: string;
  backgroundColor: string;
}

const Button: React.FC<ButtonProps> = ({ name, backgroundColor }) => {
  return <button style={{ backgroundColor: backgroundColor }}>{name}</button>;
};

export default Button;
