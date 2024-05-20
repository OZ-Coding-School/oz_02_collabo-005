import React, { useEffect, useState } from "react";
import Header from "@components/common/header/Header";
import "./AccountPage.css";
import UserInfoSection from "@components/account/UserInfoSection";
import CardManagementSection from "@components/common/payment/PaymentItemSection";
import { useNavigate } from "react-router-dom";
import Button from "@components/common/button/Button";
import ProceedModal from "@components/common/modal/ProceedModal";
import customAxios from "../../api/axios";
import apiRoutes from "../../api/apiRoutes";
import { inputType } from "../SignupPage";
import { getStoredLoginState, useLoginStore } from "../../store/useLoginStore";
import Loading from "@components/common/loading/loading";

export type UserDataType = {
  name: inputType;
  email: inputType;
  phone: inputType;
  currentPassword: inputType;
  newPassword: inputType;
  birthDay: inputType;
  [key: string]: inputType;
};

const AccountPage: React.FC = () => {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [preEmail, setPreEmail] = useState<string>("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserDataType>({
    name: { value: "", error: "" },
    email: { value: "", error: "" },
    currentPassword: { value: "", error: "" },
    newPassword: { value: "", error: "" },
    phone: { value: "", error: "" },
    birthDay: { value: "", error: "" },
  });
  const { loginToken } = getStoredLoginState();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (loginToken !== null) {
      const getUserData = async () => {
        try {
          setIsLoading(true);
          const response = await customAxios.get(apiRoutes.user);

          if (response.status !== 200)
            throw new Error(`예외 발생 ! 상태코드 : ${response.status}`);
          setPreEmail(response.data.email);
          setUserData({
            ...userData,
            name: { value: response.data.name, error: "" },
            email: { value: response.data.email, error: "" },
            phone: { value: response.data.phone_number, error: "" },
            birthDay: { value: response.data.birthday, error: "" },
          });
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };
      getUserData();
    }
  }, []);

  const isAllFieldsValidated = (): boolean => {
    for (const key in userData) {
      const error = userData[key].error;
      if (error !== "") return false;
    }
    return true;
  };

  const isEmailUnique = async (email: string) => {
    if (preEmail === email) {
      return true;
    } else {
      try {
        const response = await customAxios.get(
          `${apiRoutes.userCheck}?email=${email}`
        );
        if (response.status === 200) return !response.data.exists;
      } catch (error) {
        console.log(error);
      }
    }
  };

  // edit이나 save버튼을 눌렀을때 호출되는 함수
  const handleEditChange = async () => {
    const putUserData = {
      name: userData.name.value,
      email: userData.email.value,
      phone_number: userData.phone.value,
      current_password: userData.currentPassword.value,
      new_password: userData.newPassword.value,
      birthDay: userData.birthDay.value || null,
    };

    // edit버튼 클릭했을때
    if (isEdit === false) {
      setIsEdit(true);
    }
    // save버튼을 클릭했을 때
    else {
      if (
        isAllFieldsValidated() &&
        userData.email.value !== "" &&
        userData.name.value !== "" &&
        userData.phone.value !== ""
      ) {
        try {
          const isUnique = await isEmailUnique(putUserData.email);
          if (isUnique) {
            const response = await customAxios.put(
              apiRoutes.userUpdate,
              putUserData
            );
            if (response.status === 200) {
              alert("Update Complete!!");
              setIsEdit(false);
              setUserData({
                ...userData,
                currentPassword: { value: "", error: "" },
                newPassword: { value: "", error: "" },
              });
            }
          } else {
            alert("Your email has been duplicated.");
            setUserData((prev) => ({
              ...prev,
              email: {
                value: putUserData.email,
                error: "Your email has been duplicated.",
              },
            }));
          }
        } catch (error) {
          if (
            userData.currentPassword.value !== "" &&
            userData.newPassword.value !== ""
          ) {
            alert("Current password error");
          } else {
            alert(
              "You must enter both the current password and the new password."
            );
          }
        }
      } else {
        alert(
          "Please fill in all the fields for name, email, and phone number correctly.."
        );
      }
    }
  };

  // 로그아웃 버튼을 눌렀을 때 호출되는 함수
  const handleLogOut = async () => {
    useLoginStore.setState({
      isLogin: false,
      loginToken: null,
      refreshToken: null,
    });
    localStorage.clear();
    navigate("/");
  };

  // 계정삭제 버튼을 눌렀을 때 호출되는 함수
  const handleDeleteAccount = async () => {
    try {
      const response = await customAxios.post(apiRoutes.userDelete);
      if (response.status === 200) {
        useLoginStore.setState({
          isLogin: false,
          loginToken: null,
          refreshToken: null,
        });
        localStorage.clear();
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLeftClick = (): void => {
    isDeleteModalOpen
      ? setIsDeleteModalOpen(false)
      : setIsLogoutModalOpen(false);
  };

  const openDeleteModal = (): void => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = (): void => {
    setIsDeleteModalOpen(false);
  };

  const openLogoutModal = (): void => {
    setIsLogoutModalOpen(true);
  };

  const closeLogoutModal = (): void => {
    setIsLogoutModalOpen(false);
  };

  return (
    <>
      <Header
        hasBackIcon={true}
        title="Account"
        hasCartIcon={false}
        handleBackIconClick={() => navigate(-1)}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="accountMainContainer">
          <div className="editButtonSection">
            <Button
              name={isEdit ? "Save" : "Edit"}
              handleClick={handleEditChange}
              buttonType="smallButton"
              disabled={isAllFieldsValidated() ? false : true}
              type={isEdit ? "submit" : "button"}
            />
          </div>
          <UserInfoSection
            isEdit={isEdit}
            userData={userData}
            setUserData={setUserData}
          />
          <div className="cardManagementSection">
            <CardManagementSection />
          </div>
          <div className="signOutSection">
            <Button
              name="Log Out"
              handleClick={openLogoutModal}
              buttonType="smallButton"
            />
            {isLogoutModalOpen && (
              <ProceedModal
                onClose={closeLogoutModal}
                proceedQuestionText="Are you sure you want to proceed?"
                leftButtonText="No, cancel"
                rightButtonText="Yes, confirm"
                handleLeftClick={handleLeftClick}
                handleRightClick={handleLogOut}
              />
            )}
            <Button
              name="Delete Account"
              handleClick={openDeleteModal}
              buttonType="smallButton"
            />
            {isDeleteModalOpen && (
              <ProceedModal
                onClose={closeDeleteModal}
                proceedQuestionText="Are you sure you want to proceed?"
                leftButtonText="No, cancel"
                rightButtonText="Yes, confirm"
                handleLeftClick={handleLeftClick}
                handleRightClick={handleDeleteAccount}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AccountPage;
