import styled from "@emotion/styled";
import Sidebar from "./sidebar";
import SearchBar from "./search-bar";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 0.5fr 1fr 0.5fr;
`;
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Wrapper>
      <Sidebar />
      {children}
      <SearchBar />
    </Wrapper>
  );
}
