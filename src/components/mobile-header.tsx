import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faGear,
  faMagnifyingGlass,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import SearchBar from "./search-bar";
import { useMobile } from "../commons/hooks/useMobile";
import { useNavigate } from "react-router-dom";
import Settings from "../pages/settings";
import { ModalUI } from "./ui/modal-ui";
import { auth } from "../../firebase";
import { useModal } from "../commons/hooks/useModal";
import { signOut } from "firebase/auth";
import { Modal } from "antd";

const Wrapper = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 80px;
  background-color: ${({ theme }) => theme.backgroundColor};
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  @media (max-width: 800px) {
    display: flex;
  }
`;
const Logo = styled.img`
  height: 80%;
  width: auto;
`;
const IconWrapper = styled.div`
  display: flex;
  gap: 20px;
`;
const Icon = styled.span`
  cursor: pointer;
  color: #ccc;
  font-size: 24px;
`;
const ComponentWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 90;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

export const MobileHeader = () => {
  const [clickSearch, setClickSearch] = useState(false);
  const [clickSettings, setClickSettings] = useState(false);
  const { isMobile } = useMobile();
  const navigate = useNavigate();
  const { modalOpen, onClickOpenModal } = useModal();

  const onClickSearch = () => {
    setClickSettings(false);
    setClickSearch((prev) => !prev);
  };
  const onClickSettings = () => {
    setClickSearch(false);
    setClickSettings((prev) => !prev);
  };
  const onClickLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        if (error instanceof Error)
          Modal.error({ content: "로그아웃에 실패했어요 🫥" });
      });
  };

  useEffect(() => {
    setClickSearch(false);
    setClickSettings(false);
  }, [navigate]);

  return (
    <>
      <Wrapper>
        <Logo src="/assets/logo.png" />
        <IconWrapper>
          <Icon onClick={onClickSearch}>
            {clickSearch ? (
              <FontAwesomeIcon icon={faCircleXmark} />
            ) : (
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            )}
          </Icon>
          <Icon onClick={onClickSettings}>
            <FontAwesomeIcon icon={faGear} />
          </Icon>
          <Icon onClick={onClickOpenModal}>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </Icon>
          <ModalUI
            modalOpen={modalOpen}
            title="로그아웃 할까요? 🫨"
            onOkFn={onClickLogout}
            onCancelFn={onClickOpenModal}
          />
        </IconWrapper>
      </Wrapper>
      {isMobile && (clickSearch || clickSettings) ? (
        <ComponentWrapper>
          {clickSearch ? <SearchBar /> : null}
          {clickSettings ? <Settings /> : null}
        </ComponentWrapper>
      ) : null}
    </>
  );
};
