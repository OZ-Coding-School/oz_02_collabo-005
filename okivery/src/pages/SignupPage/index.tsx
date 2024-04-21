import Header from "../../components/common/header/Header";
import BirthdayInputForm from "../../components/signup/BirthdayInputForm";
import InputFormItem from "../../components/signup/InputFormItem";
import Layout from "../../layout/Layout";
import "../../styles/signup/page/SignupPage.css";

const SignupPage = () => {
  return (
    <>
      <Layout>
        <Header />
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
              <button className="term-btn">terms of service</button>
            </div>
            <button>Sign up</button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default SignupPage;
