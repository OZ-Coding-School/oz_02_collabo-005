import React from "react";
import "./SmallButton.css";

interface SmallButtonProps {
  name: string;
  handleEditChange: () => void;
}

const SmallButton: React.FC<SmallButtonProps> = ({
  name,
  handleEditChange,
}) => {
  return (
    <>
      <button onClick={handleEditChange} className="smallButton">
        {name}
      </button>
    </>
  );
};

export default SmallButton;
