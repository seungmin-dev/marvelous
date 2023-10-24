import styled from "@emotion/styled";
import { SearchInput } from "./ui/searchInput";
import ReactPlayer from "react-player";
import { useFetchPost } from "../commons/hooks/useFetchPost";
import _ from "lodash";
import { useState } from "react";
import { Post } from "../types/type";
import { v4 as uuidv4 } from "uuid";
import { PostUI } from "./ui/post-ui";

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
const SearchResultWrapper = styled.div`
  padding: 0 20px 20px;
  width: 100%;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  overflow-y: scroll;
`;
const HelpText = styled.p`
  font-size: 14px;
  padding: 0;
  margin: 0;
  text-align: center;
  color: ${({ theme }) => theme.grayColor};
`;
const TrailerWrapper = styled.div`
  height: 30%;
  padding: 20px;
  border-top: ${({ theme }) => `1px solid ${theme.grayColor}`};
`;

export default function SearchBar() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { fetchPostsByKeyword } = useFetchPost();

  const getDebounce = _.debounce((value) => {
    fetchPostsByKeyword(value).then((result) => setPosts(result));
  }, 500);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    getDebounce(e.currentTarget.value);
  };

  return (
    <Wrapper>
      <SearchWrapper>
        <SearchInput
          type="text"
          placeholder="Search for..."
          onChange={onChangeSearch}
        />
      </SearchWrapper>
      <SearchResultWrapper>
        {posts.length > 0 ? (
          posts.map((post) => <PostUI key={uuidv4()} post={post} />)
        ) : (
          <HelpText>현재 검색 기능은 한 단어로만 가능합니다.</HelpText>
        )}
      </SearchResultWrapper>
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
