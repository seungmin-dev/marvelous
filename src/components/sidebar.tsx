import * as S from "../styles/sidebar.style";
import { HashtagContent, SidebarContent } from "../router";
import { signOut } from "firebase/auth";
import { useRouter } from "../commons/hooks/useRouter";
import { auth } from "../../firebase";
import { Link, useLocation } from "react-router-dom";
import { ModalUI } from "./ui/modal-ui";
import { useModal } from "../commons/hooks/useModal";
import { Modal } from "antd";
import { useTheme } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
  const user = auth.currentUser;
  const { routeTo, currentPath } = useRouter();
  const location = useLocation();
  const { modalOpen, onClickOpenModal } = useModal();
  const theme = useTheme();

  const onClickLogout = () => {
    signOut(auth)
      .then(() => {
        routeTo("/login");
      })
      .catch((error) => {
        if (error instanceof Error)
          Modal.error({ content: "로그아웃에 실패했어요 🫥" });
      });
  };
  return (
    <S.Wrapper>
      <S.Logo src="/assets/logo.png" />
      <S.MenuWrapper>
        <S.TabWrapper>
          <S.Tab>
            {SidebarContent.map((sidebar, i) =>
              sidebar.id < 4 ? (
                <S.Item key={i}>
                  <Link to={sidebar.path}>
                    <S.ItemLink
                      isActive={currentPath === sidebar.path}
                      theme={theme}
                    >
                      <S.MenuIcon>{sidebar.icon}</S.MenuIcon>
                      <S.MenuTitle>{sidebar.label}</S.MenuTitle>
                    </S.ItemLink>
                  </Link>
                </S.Item>
              ) : null
            )}
          </S.Tab>
          <S.Tab>
            {HashtagContent.map((hashtag, i) => (
              <S.Item key={i}>
                <Link to={hashtag.path}>
                  <S.ItemLink
                    isActive={
                      hashtag.path === location.pathname + location.search
                    }
                    theme={theme}
                  >
                    {hashtag.label}
                  </S.ItemLink>
                </Link>
              </S.Item>
            ))}
          </S.Tab>
          <S.Tab>
            {SidebarContent.map((sidebar, i) =>
              sidebar.id > 3 && sidebar.id < 7 ? (
                <S.Item key={i}>
                  <Link to={sidebar.path}>
                    <S.ItemLink
                      isActive={currentPath === sidebar.path}
                      theme={theme}
                    >
                      <S.MenuIcon>{sidebar.icon}</S.MenuIcon>
                      <S.MenuTitle>{sidebar.label}</S.MenuTitle>
                    </S.ItemLink>
                  </Link>
                </S.Item>
              ) : null
            )}
          </S.Tab>
        </S.TabWrapper>
        <S.ProfileWrapper>
          <S.ProfileImg src={user?.photoURL as string} />
          <S.ProfileName>
            <Link to="/profile">{user?.displayName}</Link>
          </S.ProfileName>
          <S.Icon onClick={onClickOpenModal}>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </S.Icon>
          <ModalUI
            modalOpen={modalOpen}
            title="로그아웃 할까요? 🫨"
            onOkFn={onClickLogout}
            onCancelFn={onClickOpenModal}
          />
        </S.ProfileWrapper>
      </S.MenuWrapper>
    </S.Wrapper>
  );
}
