import styled from "@emotion/styled";
import Sidebar from "./sidebar";
import SearchBar from "./search-bar";
import { MobileMenu } from "./mobile-menu";
import { MobileHeader } from "./mobile-header";
import { FloatButton } from "./buttons/float-button";
import { useMobile } from "../commons/hooks/useMobile";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.textColor};
`;
const SideWrapper = styled.div`
  width: 25%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  z-index: 30;
  @media (max-width: 800px) {
    display: none;
  }
`;
const MainWrapper = styled.div`
  width: 50%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 25%;
  @media (max-width: 800px) {
    width: 100%;
    left: 0;
  }
`;
const InnerWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`;
const SearchWrapper = styled.div`
  width: 25%;
  height: 100%;
  position: absolute;
  z-index: 30;
  right: 0;
  top: 0;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  @media (max-width: 800px) {
    display: none;
  }
`;

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isMobile } = useMobile();

  return (
    <Wrapper>
      <SideWrapper>
        <Sidebar />
      </SideWrapper>
      <MainWrapper>
        <MobileHeader />
        <InnerWrapper>{children}</InnerWrapper>
        {isMobile ? <FloatButton /> : null}
        <MobileMenu />
      </MainWrapper>
      <SearchWrapper>
        <SearchBar />
      </SearchWrapper>
    </Wrapper>
  );
}
