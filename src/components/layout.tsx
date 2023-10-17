import styled from "@emotion/styled";
import Sidebar from "./sidebar";
import SearchBar from "./search-bar";
import { MobileMenu } from "./mobile-menu";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  @media (max-width: 800px) {
  }
`;
const SideWrapper = styled.div`
  width: 25%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
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
  height: 100%;
  position: relative;
`;
const SearchWrapper = styled.div`
  width: 25%;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  @media (max-width: 800px) {
    display: none;
  }
`;
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Wrapper>
      <SideWrapper>
        <Sidebar />
      </SideWrapper>
      <MainWrapper>
        <InnerWrapper>
          {children}
          <MobileMenu />
        </InnerWrapper>
      </MainWrapper>
      <SearchWrapper>
        <SearchBar />
      </SearchWrapper>
    </Wrapper>
  );
}
