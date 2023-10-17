import styled from "@emotion/styled";
import { SearchInput } from "./ui/searchInput";
import ReactPlayer from "react-player";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const SearchWrapper = styled.div`
  padding: 20px;
`;
const TrailerWrapper = styled.div`
  height: 30%;
  padding: 20px;
  border-top: 1px solid #bdbdbd;
`;

export default function SearchBar() {
  return (
    <Wrapper>
      <SearchWrapper>
        <SearchInput type="text" placeholder="Search for..." />
      </SearchWrapper>
      <TrailerWrapper>
        <ReactPlayer
          url={"https://youtu.be/dug56u8NN7g?si=50No8BlqnVBydXua"}
          playing
          loop
          width="100%"
          height="100%"
        />
      </TrailerWrapper>
    </Wrapper>
  );
}
