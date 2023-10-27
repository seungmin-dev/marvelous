import styled from "@emotion/styled";
import { SidebarContent } from "../router";
import { useRouter } from "../commons/hooks/useRouter";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";

const Wrapper = styled.div`
  width: 100%;
  height: 80px;
  background-color: ${({ theme }) => theme.backgroundColor};
  position: fixed;
  bottom: 0;
  left: 0;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  display: none;
  @media (max-width: 800px) {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    align-items: center;
  }
`;
const Item = styled.div`
  font-size: 26px;
  text-align: center;
`;
const ItemLink = styled.span`
  display: block;
  width: 100%;
  height: 100%;
  color: ${({ isActive, theme }: { isActive: boolean }) =>
    isActive ? theme.activeColor : theme.textColor};
`;
const Img = styled.img`
  width: 60px;
  aspect-ratio: 1/1;
  border-radius: 100%;
  box-sizing: border-box;
  border: ${({ theme }) => `1px solid ${theme.textColor}`};
`;

export const MobileMenu = () => {
  const user = auth.currentUser;
  const { currentPath } = useRouter();
  return (
    <Wrapper>
      {SidebarContent.map((sidebar, i) =>
        sidebar.id < 5 || sidebar.id === 8 ? (
          <Item key={i}>
            <Link to={sidebar.path}>
              <ItemLink isActive={currentPath === sidebar.path}>
                {sidebar.id !== 8 ? (
                  sidebar.icon
                ) : (
                  <Img src={user?.photoURL as string} />
                )}
              </ItemLink>
            </Link>
          </Item>
        ) : null
      )}
    </Wrapper>
  );
};
