import Button from "../../components/common/button/Button";
import Header from "../../components/common/header/Header";
import BirthdayInputForm from "../../components/signup/BirthdayInputForm";
import InputFormItem from "../../components/signup/InputFormItem";
import "../../styles/signup/page/SignupPage.css";

const SignupPage: React.FC = () => {
  const terms = "I agree that I have fully read Okivery’s Terms of Use and ";

  return (
    <>
      <Header hasBackicon={true} title="" hasCartIcon={false} />
      <div className="signup-container">
        <h1 className="signup-title">Sign Up</h1>
        <form>
          <InputFormItem label="Name" name="name" type="text" />
          <InputFormItem label="E-Mail" name="email" type="email" />
          <InputFormItem label="Password" name="password" type="password" />
          <InputFormItem
            label="Repeat Password"
            name="repeat-password"
            type="password"
          />
          <InputFormItem label="Phone number" name="phone" type="number" />
          <BirthdayInputForm />
          <div className="term-container">
            <label>
              Terms <span>*</span>
            </label>
            <div className="term-content">
              <input type="radio" name="term" value="agree" id="term" />
              <div>
                {terms}
                <a href="/" target="_blank">
                  Privacy Policy.
                </a>
              </div>
            </div>
          </div>
          <div className="signup-btn">
            <Button name="Sign up" backgroundColor="#FF6347" to="/login" />
          </div>
        </form>
      </div>
    </>
  );
};

export default SignupPage;
