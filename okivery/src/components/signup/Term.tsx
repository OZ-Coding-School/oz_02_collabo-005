import React from "react";

interface TermProps {
  isTermChecked: boolean;
  handleTermCheck: () => void;
}

const Term: React.FC<TermProps> = ({ isTermChecked, handleTermCheck }) => {
  const terms = "I agree that I have fully read Okivery’s Terms of Use and ";
  return (
    <div className="termContainer">
      <label>
        Terms <span>*</span>
      </label>
      <div className="termContent">
        <input
          type="radio"
          name="term"
          value="agree"
          id="term"
          checked={isTermChecked}
          onClick={handleTermCheck}
        />
        <div>
          {terms}
          <a href="/" target="_blank">
            Privacy Policy.
          </a>
        </div>
      </div>
    </div>
  );
};

export default Term;
