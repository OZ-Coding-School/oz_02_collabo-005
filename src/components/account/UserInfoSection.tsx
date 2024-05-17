import React from "react";
import ChangePasswordSection from "./ChangePasswordSection";
import InputItem from "@components/common/input/InputItem";
import { UserDataType } from "../../pages/AccountPage";
import { emailRegex, passwordRegex, phoneRegex } from "../../utils/regex";
import BirthdayInput from "@components/common/input/BirthdayInput";

interface isEditProps {
  isEdit: boolean;
  userData: UserDataType;
  setUserData: React.Dispatch<React.SetStateAction<UserDataType>>;
}

const UserInfoSection: React.FC<isEditProps> = ({
  isEdit,
  userData,
  setUserData,
}) => {
  const handleInputChange = (field: string, value: string): void => {
    let error = "";

    if (field === "email") {
      error = !isValidateEmail(value) ? "Invalid email address." : "";
    } else if (field === "currentPassword") {
      if (value) {
        error =
          userData.newPassword.value && userData.newPassword.value === value
            ? "It has to be different from the current password."
            : "";

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
      } else {
        if (userData.newPassword.value !== "") {
          error = "Please enter your current password first";
        }
      }
    } else if (value && field === "newPassword") {
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
      if (userData.currentPassword.value) {
        if (userData.currentPassword.value === value) {
          error = "It has to be different from the current password.";
        }
      }
    } else if (field === "phone") {
      error = !isValidatePhone(value) ? "Invalid phone number." : "";
    }

    setUserData((prev) => ({
      ...prev,
      [field]: { value, error },
    }));
  };

  const isValidateEmail = (email: string): boolean => {
    return emailRegex.test(email);
  };

  const isValidatePassword = (password: string): boolean => {
    return passwordRegex.test(password);
  };

  const isValidatePhone = (phone: string): boolean => {
    return phoneRegex.test(phone);
  };

  return (
    <div className="signUpContainer">
      <form>
        <InputItem
          label="Name"
          name="name"
          type="text"
          value={userData.name.value}
          isNoStar={true}
          place="Please enter your name"
          readOnly={!isEdit ? true : false}
          handleInputChange={(e) => {
            handleInputChange("name", e.target.value);
          }}
        />
        <InputItem
          label="E-Mail"
          name="email"
          type="email"
          value={userData.email.value}
          className={userData.email.error ? "error" : ""}
          errorMessage={userData.email.error}
          isNoStar={true}
          place="ex) abcd1234@gmail.com"
          readOnly={!isEdit ? true : false}
          handleInputChange={(e) => {
            handleInputChange("email", e.target.value);
          }}
        />
        <InputItem
          label="Phone Number"
          name="phone"
          type="text"
          value={userData.phone.value}
          className={userData.phone.error ? "error" : ""}
          errorMessage={userData.phone.error}
          isNoStar={true}
          place="Please enter except for hyphen (-)"
          readOnly={!isEdit ? true : false}
          handleInputChange={(e) => {
            handleInputChange("phone", e.target.value);
          }}
        />
        <BirthdayInput
          readOnly={!isEdit ? true : false}
          handleBirthChange={(birthDay) =>
            setUserData((prev) => ({ ...prev, birthDay }))
          }
          value={userData.birthDay.value}
        />
        {!isEdit ? null : (
          <ChangePasswordSection
            handleInputChange={handleInputChange}
            userData={userData}
          />
        )}
      </form>
    </div>
  );
};

export default UserInfoSection;
