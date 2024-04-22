import React from "react";
import "../../../styles/common/Button.css";
import { Link } from "react-router-dom";

interface ButtonProps {
  name: string;
  backgroundColor: string;
  to: string;
}

const Button: React.FC<ButtonProps> = ({ name, backgroundColor, to }) => {
  return (
    <Link to={to}>
      <button style={{ backgroundColor: backgroundColor }}>{name}</button>
    </Link>
  );
};

export default Button;
