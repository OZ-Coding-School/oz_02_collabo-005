import React from "react";
import "./SocialLoginButton.css";

interface SocialLoginProps {
  name: string;
  text: string;
  imageUrl: string;
}

const SocialLoginButton: React.FC<SocialLoginProps> = ({
  name,
  text,
  imageUrl,
}) => {
  return (
    <>
      <button>
        <img className={name} src={imageUrl} />
        {text}
      </button>
    </>
  );
};

export default SocialLoginButton;
