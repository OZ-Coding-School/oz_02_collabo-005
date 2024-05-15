import { useState } from "react";
import Button from "@components/common/button/Button";
import Header from "@components/common/header/Header";
import InputItem from "@components/common/input/InputItem";
import { useNavigate } from "react-router-dom";
import { emailRegex, passwordRegex, phoneRegex } from "../../utils/regex";
import BirthdayInput from "@components/common/input/BirthdayInput";
import Term from "@components/signup/Term";
import "./SignupPage.css";
import customAxios from "./../../api/axios";
import apiRoutes from "./../../api/apiRoutes";

export type inputType = {
  value: string;
  error: string;
};

type userDataType = {
  name: inputType;
  email: inputType;
  password: inputType;
  repeatPassword: inputType;
  phone: inputType;
  birthDay: inputType;
  [key: string]: inputType;
};

const SignupPage: React.FC = () => {
  const userInitialData: userDataType = {
    name: { value: "", error: "" },
    email: { value: "", error: "" },
    password: { value: "", error: "" },
    repeatPassword: { value: "", error: "" },
    phone: { value: "", error: "" },
    birthDay: { value: "", error: "" },
  };
  const [userData, setUserData] = useState(userInitialData);
  const [isTermChecked, setIsTermChecked] = useState(false);
  const navigate = useNavigate();

  const isAllFieldsFilled = (): boolean => {
    for (const key in userData) {
      const value = userData[key].value;
      if (key !== "birthDay" && value === "") return false;
    }
    return true;
  };

  const isAllFieldsValidated = (): boolean => {
    for (const key in userData) {
      const error = userData[key].error;
      if (error !== "") return false;
    }
    return true;
  };

  const handleTermCheck = (): void => {
    setIsTermChecked((prev) => !prev);
  };

  const isButtonActive =
    isAllFieldsFilled() && isAllFieldsValidated() && isTermChecked;

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const userPostData = {
      name: userData.name.value,
      password: userData.password.value,
      email: userData.email.value,
      phone_number: userData.phone.value,
      birthday: userData.birthDay.value || null,
    };

    console.log(userPostData);

    try {
      const isUnique = await isEmailUnique(userPostData.email);
      console.log(isUnique);
      if (isUnique) {
        const response = await customAxios.post(
          apiRoutes.userCreate,
          userPostData
        );
        console.log(response);
        if (response.status === 200) {
          alert("Membership registration is complete.");
          navigate("/login");
        }
      } else {
        alert("Your email has been duplicated.");
        setUserData((prev) => ({
          ...prev,
          email: {
            value: userPostData.email,
            error: "Your email has been duplicated.",
          },
        }));
      }
    } catch (error) {
      alert(
        "Please check again whether the password contains English characters, numbers, and special characters"
      );
    }
  };

  const handleInputChange = (field: string, value: string): void => {
    let error = "";

    if (field === "email") {
      error = value && !isValidateEmail(value) ? "Invalid email address." : "";
    } else if (field === "password") {
      if (userData.repeatPassword.value !== "") {
        userData.repeatPassword.error = !isPasswordMatch(
          value,
          userData.repeatPassword.value
        )
          ? "Passwords do not match."
          : "";
      }
      if (value) {
        if (isValidatePassword(value)) {
          if (value.length > 16) {
            error = "The password is 8 to 16 characters.";
          }
          error = "";
        } else {
          error =
            "English letters, numbers, and special symbols(ex. !@#$%^&?_) must be included.";
          if (value.length > 16) {
            error = "The password is 8 to 16 characters.";
          }
        }
      }
    } else if (field === "repeatPassword") {
      error =
        value && !isPasswordMatch(userData.password.value, value)
          ? "Passwords do not match."
          : "";
    } else if (field === "phone") {
      error = value && !isValidatePhone(value) ? "Invalid phone number." : "";
    }

    setUserData((prev) => ({
      ...prev,
      [field]: { value, error },
    }));
  };

  const isValidateEmail = (email: string): boolean => {
    return emailRegex.test(email);
  };

  const isEmailUnique = async (email: string) => {
    try {
      const response = await customAxios.get(
        `${apiRoutes.userCheck}?email=${email}`
      );
      if (response.status === 200) return !response.data.exists;
    } catch (error) {
      console.log(error);
    }
  };

  const isValidatePassword = (password: string): boolean => {
    return passwordRegex.test(password);
  };

  const isPasswordMatch = (
    password: string,
    repeatPassword: string
  ): boolean => {
    return password === repeatPassword;
  };

  const isValidatePhone = (phone: string): boolean => {
    return phoneRegex.test(phone);
  };

  return (
    <>
      <Header
        hasBackIcon={true}
        title=""
        hasCartIcon={false}
        isFixed={false}
        handleBackIconClick={() => navigate(-1)}
      />
      <div className="signupContainer">
        <h1 className="signupTitle">Sign Up</h1>
        <form>
          <InputItem
            label="Name"
            name="name"
            type="text"
            place="Please enter your name"
            value={userData.name.value}
            handleInputChange={(e) => {
              handleInputChange("name", e.target.value);
            }}
          />
          <InputItem
            label="E-Mail"
            name="email"
            type="email"
            place="ex) abcd1234@gmail.com"
            value={userData.email.value}
            className={userData.email.error ? "error" : ""}
            errorMessage={userData.email.error}
            handleInputChange={(e) => {
              handleInputChange("email", e.target.value);
            }}
          />
          <InputItem
            label="Password"
            name="password"
            type="password"
            place="Password must be at least 8 characters long"
            value={userData.password.value}
            className={userData.password.error ? "error" : ""}
            errorMessage={userData.password.error}
            handleInputChange={(e) => {
              handleInputChange("password", e.target.value);
            }}
          />
          <InputItem
            label="Repeat Password"
            name="repeatPassword"
            type="password"
            place="Please re-enter your password"
            value={userData.repeatPassword.value}
            className={userData.repeatPassword.error ? "error" : ""}
            errorMessage={userData.repeatPassword.error}
            handleInputChange={(e) => {
              handleInputChange("repeatPassword", e.target.value);
            }}
          />
          <InputItem
            label="Phone Number"
            name="phone"
            type="text"
            place="Please enter except for hyphen (-)"
            value={userData.phone.value}
            className={userData.phone.error ? "error" : ""}
            errorMessage={userData.phone.error}
            handleInputChange={(e) => {
              handleInputChange("phone", e.target.value);
            }}
          />
          <BirthdayInput
            handleBirthChange={(birthDay) =>
              setUserData((prev) => ({ ...prev, birthDay }))
            }
          />
          <Term
            isTermChecked={isTermChecked}
            handleTermCheck={handleTermCheck}
          />
          <div className="signupBtn">
            <Button
              name="Sign up"
              backgroundColor={isButtonActive ? "#FF6347" : "#767676"}
              buttonType="bigButton"
              handleClick={handleSubmit}
              disabled={!isButtonActive}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default SignupPage;
