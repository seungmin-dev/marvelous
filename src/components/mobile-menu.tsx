import styled from "@emotion/styled";
import { SidebarContent } from "../router";
import { useRouter } from "./hooks/useRouter";

const Wrapper = styled.div`
  width: 100%;
  height: 80px;
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
const ItemLink = styled.a`
  color: ${(props: ItemProps) => (props.onActive ? "#ef151e" : "")};
`;
interface ItemProps {
  onActive: boolean;
}

export const MobileMenu = () => {
  const { currentPath } = useRouter();
  return (
    <Wrapper>
      {SidebarContent.map((sidebar, i) =>
        sidebar.id !== 6 ? (
          <Item key={i}>
            <ItemLink
              href={sidebar.path}
              onActive={currentPath === sidebar.path}
            >
              {sidebar.icon}
            </ItemLink>
          </Item>
        ) : null
      )}
    </Wrapper>
  );
};
