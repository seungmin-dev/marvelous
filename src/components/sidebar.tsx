import * as S from "../styles/sidebar.style";
import { HashtagContent, SidebarContent } from "../router";
import { signOut } from "firebase/auth";
import { useRouter } from "./hooks/useRouter";
import { auth } from "../../firebase";

export default function Sidebar() {
  const user = auth.currentUser;
  const { routeTo, currentPath } = useRouter();

  const onClickLogout = () => {
    signOut(auth)
      .then(() => {
        routeTo("/login");
      })
      .catch((error) => {
        if (error instanceof Error) console.log(error);
      });
  };
  return (
    <S.Wrapper>
      <S.Logo src="/src/assets/logo.png" />
      <S.MenuWrapper>
        <S.TabWrapper>
          <S.Tab>
            {SidebarContent.map((sidebar, i) =>
              sidebar.id < 4 ? (
                <S.Item key={i}>
                  <S.ItemLink
                    href={sidebar.path}
                    isActive={currentPath === sidebar.path}
                  >
                    <S.MenuIcon>{sidebar.icon}</S.MenuIcon>
                    <S.MenuTitle>{sidebar.label}</S.MenuTitle>
                  </S.ItemLink>
                </S.Item>
              ) : null
            )}
          </S.Tab>
          <S.Tab>
            {HashtagContent.map((hashtag, i) => (
              <S.Item key={i}>
                <S.ItemLink
                  href={hashtag.path}
                  isActive={currentPath === hashtag.path}
                >
                  {hashtag.label}
                </S.ItemLink>
              </S.Item>
            ))}
          </S.Tab>
          <S.Tab>
            {SidebarContent.map((sidebar, i) =>
              sidebar.id > 3 ? (
                <S.Item key={i}>
                  <S.ItemLink
                    href={sidebar.path}
                    isActive={currentPath === sidebar.path}
                  >
                    <S.MenuIcon>{sidebar.icon}</S.MenuIcon>
                    <S.MenuTitle>{sidebar.label}</S.MenuTitle>
                  </S.ItemLink>
                </S.Item>
              ) : null
            )}
          </S.Tab>
        </S.TabWrapper>
        <S.ProfileWrapper>
          <S.ProfileImg src={user?.photoURL as string} />
          <S.ProfileName>{user?.displayName}</S.ProfileName>
          <S.Icon onClick={onClickLogout}>
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
          </S.Icon>
        </S.ProfileWrapper>
      </S.MenuWrapper>
    </S.Wrapper>
  );
}
