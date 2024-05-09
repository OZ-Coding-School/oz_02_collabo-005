import React, { useState } from "react";
import Header from "@components/common/header/Header";
import "./AccountPage.css";
import UserInfoSection from "@components/account/UserInfoSection";
import CardManagementSection from "@components/common/addcard/CardManagementSection";
import { useNavigate } from "react-router-dom";
import Button from "@components/common/button/Button";
import ProceedModal from "@components/common/modal/ProceedModal";
import useLoginStore from "../../store/useStore";

const AccountPage: React.FC = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);

  // edit이나 save버튼을 눌렀을때 호출되는 함수
  const handleEditChange = (): void => {
    setIsEdit(!isEdit);
  };
  const navigate = useNavigate();

  // 로그아웃 버튼을 눌렀을 때 호출되는 함수
  const handleLogOut = async () => {
    useLoginStore.getState().setLoginState(false, null);
    navigate("/");
  };

  // 계정삭제 버튼을 눌렀을 때 호출되는 함수
  const handleDeleteAccount = (): void => {
    // 계정삭제 로직 미구현
    navigate("/");
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
      <Header hasBackIcon={true} title="Account" hasCartIcon={false} />
      <div className="accountMainContainer">
        <div className="editButtonSection">
          <Button
            name={isEdit ? "Save" : "Edit"}
            handleClick={handleEditChange}
            buttonType="smallButton"
            type={isEdit ? "submit" : "button"}
          />
        </div>
        <UserInfoSection isEdit={isEdit} />
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
    </>
  );
};

export default AccountPage;
