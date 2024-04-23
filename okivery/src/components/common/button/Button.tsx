import React from "react";
import "../../../styles/common/Button.css";
import { Link } from "react-router-dom";

interface ButtonProps {
  name: string;
  backgroundColor: string;
  to: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  name,
  backgroundColor,
  to,
  disabled,
}) => {
  return (
    // 로그인 버튼 비활성화 상태일 경우 다음 페이지로 넘어가지 못하도록
    <Link to={disabled ? "#" : to}>
      <button style={{ backgroundColor: disabled ? "#ccc" : backgroundColor }}>
        {name}
      </button>
    </Link>
  );
};

export default Button;
