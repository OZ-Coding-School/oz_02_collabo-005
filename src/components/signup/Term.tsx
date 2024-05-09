import React from "react";
import "./Term.css";
import { TermsOfUse } from "./../../constants/terms";

interface TermProps {
  isTermChecked: boolean;
  handleTermCheck: () => void;
}

const Term: React.FC<TermProps> = ({ isTermChecked, handleTermCheck }) => {
  const termsMessage =
    "I agree that I have fully read Okivery’s Terms of Use and Privacy Policy.";

  return (
    <div className="termContainer">
      <label>
        Terms <span>*</span>
      </label>
      <div className="termContentContainer">
        <input
          type="radio"
          name="term"
          value="agree"
          id="term"
          checked={isTermChecked}
          onClick={handleTermCheck}
        />
        <div className="termContent">{termsMessage}</div>
      </div>
      <textarea readOnly={true}>{TermsOfUse}</textarea>
    </div>
  );
};

export default Term;
