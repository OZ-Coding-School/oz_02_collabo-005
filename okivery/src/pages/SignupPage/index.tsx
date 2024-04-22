import Button from "../../components/common/button/Button";
import Header from "../../components/common/header/Header";
import BirthdayInputForm from "../../components/signup/BirthdayInputForm";
import InputFormItem from "../../components/signup/InputFormItem";
import "../../styles/signup/page/SignupPage.css";

const SignupPage: React.FC = () => {
  const terms = "I agree that I have fully read Okivery’s Terms of Use and ";

  return (
    <>
      <Header hasBackIcon={true} title="" hasCartIcon={false} />
      <div className="signupContainer">
        <h1 className="signupTitle">Sign Up</h1>
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
          <div className="termContainer">
            <label>
              Terms <span>*</span>
            </label>
            <div className="termContent">
              <input type="radio" name="term" value="agree" id="term" />
              <div>
                {terms}
                <a href="/" target="_blank">
                  Privacy Policy.
                </a>
              </div>
            </div>
          </div>
          <div className="signupBtn">
            <Button name="Sign up" backgroundColor="#FF6347" to="/login" />
          </div>
        </form>
      </div>
    </>
  );
};

export default SignupPage;
